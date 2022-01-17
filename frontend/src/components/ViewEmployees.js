import './css/ViewEmployees.css';
import React from 'react';

function AddNewEmployee() {
    //Get text from user
    const text = document.getElementsByClassName('newEmployeeTextEntry')[0].value
    
    //Error handling
    if(text === ""){ return; }

    //Make a JSON Object
    const firstName = text.substring(0, text.indexOf(" "));
    const lastName = text.substring(text.indexOf(" ") + 1);

    const rawJSON = {
        "id": firstName + "_" + lastName + "_" + firstName + lastName + "@gmail.com",
        "firstName": firstName,
        "lastName": lastName,
        "email": firstName + lastName + "@gmail.com",
        "age": 20,
        "enrolled": true
    }

    //Make a post request
    fetch('http://localhost:3000/api/name', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(rawJSON)
    }).then(() => {
        console.log("new name added")
    })
}

function RemoveEmployee(){
    //Get text from user
    const text = document.getElementsByClassName('removeEmployeeTextEntry')[0].value

    //Error handling
    if(text === ""){ 
        return; 
    }

    //Make a JSON Object
    const firstName = text.substring(0, text.indexOf(" "));
    const lastName = text.substring(text.indexOf(" ") + 1);
    const id = firstName + "_" + lastName + "_" + firstName + lastName + "@gmail.com";

    //Make a delete request
    fetch(`http://localhost:3000/api/name/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json"}
    }).then(() => {
        console.log("Deleted entry");
    })
}

async function RetrieveEmployees(){
    //Get the response
    console.log("Retrieving Data...")
    const resp = await fetch('http://localhost:3000/api/name');
    const body = await resp.json();

    //Error handling 
    if(resp.status !== 200){
        throw Error(body.message);
    }

    //Return data
    return body;
}

class ViewEmployee extends React.Component {

    state = {response: '', showNewEmployeePage: false }

    componentDidMount(){
        RetrieveEmployees().then(res => {
            this.setState({ response: res , showNewEmployeePage: false });
        })
    }
    
    render() {
        const { response } = (this.state);
        var employeeNames = []

        //Add emplooyees to a an array
        for(var index in response){
            employeeNames.push(response[index]["first_name"] + " " +  response[index]["last_name"])
        }
        
        return (<div className="container">
            <div className='child'>
                <header className='header'> Current Employees </header>
            </div>

            <div className='editEmployeeContainer'>
                <input className='newEmployeeTextEntry' placeholder='Enter name:'></input>

                <button className='createButton' onClick={AddNewEmployee}>
                    Add New Employee
                </button>

                <input className='removeEmployeeTextEntry' placeholder='Enter name:'></input>

                <button className='removeButton' onClick={RemoveEmployee}>
                    Remove Employee
                </button>
            </div>


            <p style={{ color: 'black', fontSize: 25, paddingLeft: 20 }}> Names: </p>
            <p style={{ paddingLeft: 20 }}> {employeeNames.toString()} </p>

        </div>);
    }
}

export default ViewEmployee;
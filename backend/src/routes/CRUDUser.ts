import express from 'express';
import { Users } from '../entities/Users';

const router = express.Router();

/* 
    Writing to the API (POST/CREATE) 
*/
router.post('/api/name/', async (req, res) => {
    //Get the request and break it up
    const {
        firstName,
        lastName,
        email,
        age,
        enrolled 
    } = req.body;

    //Error handling
    if(!firstName || !lastName || !email || !age || !enrolled){
        res.status(400).send({
            "Error": "Please include all attributes!"
        })
        return;
    }

    //Create an object of Users for the database
    const users = Users.create({
        id: firstName + "_" + lastName + "_" + email,
        first_name: firstName,
        last_name: lastName,
        email: email,
        age: age,
        isEnrolled: enrolled
    })

    //Save to database
    await users.save();

    //Send a response back to the user for status and message
    res.status(200).send("Successfully Added New Entry!")
})

/*
    Deleting from the API (DELETE/DELETE)
*/
router.delete('/api/name/:clientId', async (req, res) => {
    //Get the client id to delete
    const { clientId } = req.params;

    //Error handling
    if(!clientId){
        res.status(400).send({
            "Error": "Please include a ID"
        })

        return;
    }

    //Delete the entry from the database table
    const response = await Users.delete(clientId);

    res.status(200).send(response);
})

/* 
    Fetching data from the API (GET/READ)
*/
router.get('/api/name/', async (req, res) => {
    const userData = await Users.find();

    res.status(200).send(userData)
})


export { router as CRUDUserRoute }
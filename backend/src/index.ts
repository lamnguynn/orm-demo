import { createConnection, getConnection, getConnectionManager } from 'typeorm'
import express from 'express'
import bodyParser from 'body-parser'
import { CRUDUserRoute } from './routes/CRUDUser';

const app = express()
const PORT = 3000;

const main = async() => {
    //Attempt to connect to the database
    //Listen on port 3000
    app.listen(3000, () => {
        console.log(`Listening on Port ${PORT}`)
    })

    //Add retry logic 
    let retries = 5;
    while(retries){
        try{
            await createConnection();

            //If successful, display message
            console.log("Connected To Postgres")

            app.use(function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                next();
            });

            /* Import HTTP Method for this Route s*/
            app.use(express.json());
            app.use(CRUDUserRoute);
            break;

        }
        catch(error){
            //If not successful, display the error and throw an error
            console.log(error);
            
            //Decrement retries
            retries -= 1;
            console.log(`Retries Left: ${retries}`);

            //Wait for next retry
            await new Promise(res => setTimeout(res, 2500))
        }
    }
}



main();
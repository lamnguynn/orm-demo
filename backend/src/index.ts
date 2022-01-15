import { createConnection } from 'typeorm'
import { Users } from './entities/Users'
import express from 'express'
import { CRUDUserRoute } from './routes/CRUDUser';

const app = express()
const PORT = 3000;


const main = async() => {
    //Attempt to connect to the database
    try{
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: 'lamnguyen',
            password: undefined,
            database: 'lamnguyen',
            entities: [Users],
            logging: true,
            synchronize: true
        })

        //If successful, display message
        console.log("Connected To Postgres")

        //Listen on port 3000
        app.listen(3000, () => {
            console.log(`Listening on Port ${PORT}`)
        })

        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });

        /* Import HTTP Method for this Route s*/
        app.use(express.json());
        app.use(CRUDUserRoute);

    }
    catch(error){
        //If not successful, display the error and throw an error
        console.log(error);
        throw new Error("Unable to connect to postgres")
    }
}



main();
const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const app = express();
const port = 3000;

const createUser = require('./API/createUser');
const getUsers = require ('./API/getUsers.js');
const getUserById = require('./API/getUserById');

//mongoClient config
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";

//middleware config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(url, (err, database) => {
    if (err) throw err;
    console.log("db created");
    const db = database.db('mydb2');

    //Routes wrapped inside mongo client to allow connection to persist
    app.get('/users', (req, res) => getUsers(req, res, db));
    app.get('/user', (req, res) => getUserById(req, res, db));
    app.post('/user', (req, res) => createUser(req, res, db));

    app.listen(port, () => {
        console.log("Application running on " + port);
    });

    //Closes the db connection once the node is terminated
    //this is a way of keeping a db connection open until the application has finished  
    //sigTerm is the event that nodejs sends before shutting down node process 
     process.on('SIGTERM', () => {
         //tries to close app
          app.close( () =>{
              db.close();
          });

        //shuts down db connection forcefully after a period of time if not done in previous statement
          setTimeout(()=>{
              console.log("Couldn't close connections in time, forcefully shutting down db connection")
              process.exit(1);
          }, 30*1000);

      });
});




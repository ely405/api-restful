'use strict';

const mongoose = require('mongoose');
const app = require('./app-express');
const mongodb = require('mongodb');
const config = require('./config');

mongoose.Promise = global.Promise;

mongoose.connect(config.dataBase, {
        useMongoClient: true})
    .then(()=>{
        console.log(`Established connection to data base`);
        app.listen(config.port, ()=>{
            console.log(`API RESTful en localhost:${config.port}`);
        })
    }).catch(
        (error)=>{return `Error al conectar a la base de datos: ${error}`}
    )


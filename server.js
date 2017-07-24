'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/clients/:name', (req, res)=>{
    res.send({message: `Hola ${req.params.name}`});
})

app.listen(port, ()=>{
    console.log(`API RESTful en localhost:${port}`);
});
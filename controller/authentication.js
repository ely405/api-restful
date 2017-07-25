'use strict';

const mongoose = require(mongoose);
const user = require('../models/user');
const service = require('../services/createToken-service');

const signUp = (request, response)=>{
    let newUser = new user({
        email: req.body.email,
        displayName: req.body.displayName,
        lastLogin: req.body.lastLogin
    });

    newUser.save((error)=>{
        if(error) response.status(500).send({message: `Error al crear el usuario: ${error}`});

        return response.status(200).send({message: `Se creo el usuario`, token: service.createToken(newUser)});
    });
}

const signIn = ()=>{}

module.exports = {
    signUp, 
    signIn
}
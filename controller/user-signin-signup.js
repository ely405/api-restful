'use strict';

const mongoose = require('mongoose');
const user = require('../models/user');
const service = require('../service/token-service');

const signUp = (request, response)=>{
    let newUser = new user({
        userEmail: request.body.userEmail,
        displayName: request.body.displayName,
        //password: request.body.password
        // lastLogin: request.body.lastLogin
    });

    newUser.save((error)=>{
        if(error) return response.status(500).send({message: `Error al crear el usuario: ${error}`});

        return response.status(200).send({
            message: `Se creo el usuario`, 
            token: service.createToken(newUser)});
    });
}

const signIn = (request, response)=>{
    user.find({email: request.body.email}, (error, user)=>{
        if(error) return response.status(404).send({message: `Hubo un error: ${error}`});
        if(!user) return response.status(404).send({message: `Usuario no existe`});

        request.user = user;
        request.status(200).send({
            message: `Te has logeado correctamente`, 
            token: service.createToken(user)});
    });
}

module.exports = {
    signUp, 
    signIn
}
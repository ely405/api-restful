'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

const isAuthorized = (request, response, next)=>{
    if(!request.headers.authorization){
        return response.status(403).send({message: `No tienes autorización`});
    }

    const tokenClientHeader = request.headers.authorization.split(' ')[1];
    const payloadDecoded = jwt.decode(tokenClientHeader, config.SECRET_TOKEN);

    if(payloadDecoded.exp < moment.unix()){
        return response.status(401).send({message: `El token ha expirado`});
    }

    request.user = payloadDecoded.sub;
    next();
}

module.exports = isAuthorized;
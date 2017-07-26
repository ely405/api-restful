'use strict';

const service = require('../service/token-service');

const isAuthorized = (request, response, next)=>{
    if(!request.headers.authorization){
        return response.status(403).send({message: `No tienes autorización`});
    }

    const tokenClientHeader = request.headers.authorization.split(' ')[1];
   
    service.decodeToken(tokenClientHeader)
        .then(resp=>{
            request.user = resp;
            next();
        })
        .catch(resp=>{
            response.status(resp.status);
        });
}

module.exports = isAuthorized;
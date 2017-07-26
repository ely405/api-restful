'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

const createToken = (userToCreate)=>{
    let payload = {
        sub: user._id,
        iat: moment.unix(),
        exp: moment.add(7, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN);
}

const decodeToken = (tokenToDecode)=>{
    const decoded = new Promise((resolve, reject)=>{
        try{
            let payloadDecoded = jwt.decode(tokenToDecode, config.SECRET_TOKEN);

            if(payloadDecoded.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: `El token ha expirado`
                });
            }

            resolve(payloadDecoded.sub);
        } catch(error){
            reject({
                status: 500,
                message: `Token inválido`
            });
        }
    });
    
    return decoded;
}

module.exports = {
    createToken,
    decodeToken
};
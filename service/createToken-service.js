//sub tiene que ser diferente al id de MONGODB para que la db sea mas segura

'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

const createToken = (userToCreate)=>{
    //datos entre cliente-servidor
    let payload = {
        sub: user._id, //tiene que ser diferente a de mongodb,
        iat: moment.unix(),//inicia token
        exp: moment.add(7, 'days').unix()//expira token
    }

    return jwt.encode(payload, config.SECRET_TOKEN);
}

module.exports = createToken;
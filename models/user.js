'use  strict';
const mongoose = require('mongoose');
const schema = mongoose.Schema;
//codificar la contraseña
const bcrypt = require('bcrypt-nodejs');
//gravatar
const crypto = require('crypto');

const userSchema = new schema({
    email: {type: String, unique: true, lowercase: true}, //que sea el único
    displayName : String,
    avatarURL: String,
    password: {type: String,
                 select: false //al hacer GET de user no se envíe la contraseña
                },
    signupDate: {type: Date,
                default: Date.now() //fecha del momento de inscribirse
    },
    //actualiza cada vez que el usuario ingresa
    lastLogin: Date
});

//Middleware (también llamado pre y post ganchos ) 
//son funciones que se pasan el control durante la ejecución de funciones asíncronas.

userSchema.pre('save', next=>{
    let user = this;
    if(!user.isModified('password')) return next();

    //genSalt(rounds, cb(err, result))
    bcrypt.genSalt(10, (error, salt)=>{
        if(error) return next(error);

        //hash(data, salt, progress, cb(err, hash))
        bcrypt.hash(user.password, salt, null, (error, hash)=>{
            if(error) return next(error);
            user.password = hash;
            next()
        });
    });
});

//avatar
userSchema.methods.gravatar = ()=>{
    let user = this;
    if(!user.email) return `https://gravatar.com/avatar/?s=200&d=retro`;

    const md5 = crypto.createHash(`md5`).update(user.email).digest(`hex`);
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
}

module.exports = mongoose.model(`user`, userSchema);
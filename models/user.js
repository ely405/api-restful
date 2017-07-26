'use  strict';
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const userSchema = new schema({
    userEmail: {type: String, unique: true, lowercase: true},
    displayName : String,
    avatarURL: String,
    password: {type: String,
                 select: false
                },
    signupDate: {type: Date,
                default: Date.now()
    },
    lastLogin: Date
});

userSchema.pre('save', function(next){
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

userSchema.methods.gravatar = ()=>{
    let user = this;
    if(!user.email) return `https://gravatar.com/avatar/?s=200&d=retro`;

    const md5 = crypto.createHash(`md5`).update(user.email).digest(`hex`);
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
}

module.exports = mongoose.model(`user`, userSchema);
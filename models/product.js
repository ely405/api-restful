'use strict';

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = schema({
    name: String,
    image: String,
    price: {type: Number, default: 0},
    category: {type: String, enum: ['computer', 'phones', 'accesories']},
    description: String
});

module.exports = mongoose.model('product', productSchema);
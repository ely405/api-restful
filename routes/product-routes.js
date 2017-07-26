'use strict';

const express = require('express');
const productController = require('../controller/products');
const userController = require('../controller/user-signin-signup')
const auth = require('../middleware/authentication-middleware');

const api = express.Router();

api.get('/product',auth, productController.getAllProducts);
api.get('/product/:productId', productController.getProduct);
api.post('/product', productController.saveProduct);
api.put('/product/:productId', auth, productController.updateProduct);
api.delete('/product/:productId', auth, productController.deleteProduct);
api.post('/signUp', userController.signUp);
api.post('/signIn', userController.signIn);
api.get('/private', auth, (request, response)=>{
    response.status(200).send({message: `Tienes acceso`});
});

module.exports = api;
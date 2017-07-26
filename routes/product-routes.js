'use strict';

const express = require('express');
const productController = require('../controller/products');
const auth = require('../middleware/authentication-middleware');

const api = express.Router();

api.get('/product', productController.getAllProducts);
api.get('/product/:productId', productController.getProduct);
api.post('/product', productController.saveProduct);
api.put('/product/:productId', productController.updateProduct);
api.delete('/product/:productId', productController.deleteProduct);
api.get('./private', auth.isAuthorized, (request, response)=>{
    response.status(200).send({message: `Tienes acceso`});
});

module.exports = api;
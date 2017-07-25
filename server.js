'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/product', (request, response)=>{
    response.send(200, {products: []});
});

app.get('/api/product/:productId', (request, response)=>{
    let productId = request.params.productId;
    if(error) return response.status(500).send({message: `Error al realizar la petición`});
    response.status(200).send({productId});
});

app.post('/api/product', (request, response)=>{
    console.log(request.body);
    response.status(200).send({message: 'El producto se ha guardado'})
});

app.put('/api/product/:productId', (request, response)=>{
    let productId = request.params.productId;
    let update = request.body;
    if(error) return response.status(500).send({message: `Error al actualizar producto: ${error}`});
    response.status(200).send({message: `El producto ha sido actualizado`});    
});

app.delete('/api/product/:productId', (request, response)=>{
    let productId = request.params.productId;
    if(error) return response.status(500).send({message: `Error al borrar producto: ${error}`});
    response.status(200).send({message: `El producto ha sido eliminado`});
});

app.listen(port, ()=>{
    console.log(`API RESTful en localhost:${port}`);
});
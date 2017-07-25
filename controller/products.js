'use strict';

const Product = require('../models/product');

const getAllProducts = (request, response)=>{
    Product.find({}, (error, allProducts)=>{
        if(error) return response.status(500).send({message: `Error al realizar la petición: ${error}`});
        if(!allProducts) return response.status(404).send({message: `Los productos no existen`});

        response.status(200).send({allProducts});
    });
}

const getProduct = (request, response)=>{
    let productId = request.params.productId;
    
    Product.findById(productId, (error, product)=>{
        if(error) return response.status(500).send({message: `Error al realizar la petición: ${error}`});
        if(!product) return response.status(404).send({message: `El producto no existe`});
        response.status(200).send({product});
    });
}

const saveProduct = (request, response)=>{
    console.log('POST /api/product');
    console.log(request.body);
    let productNew = new Product();
    productNew.name = request.body.name;
    productNew.image = request.body.image;
    productNew.price = request.body.price;
    productNew.category = request.body.category;
    productNew.description = request.body.description;

    productNew.save((error, productStored)=>{
        if(error) response.status(500).send({message: `Error al salvar en la base de datos: ${error}`});
        response.status(200).send({productNew: productStored});
    });
}

const updateProduct = (request, response)=>{
    let productId = request.params.productId;
    let update = request.body;

    Product.findByIdAndUpdate(productId, update, (error, productUpdated)=>{
        if(error) return response.status(500).send({message: `Error al actualizar producto: ${error}`});
        response.status(200).send({product: productUpdated});
    });
}

const deleteProduct = (request, response)=>{
    let productId = request.params.productId;
    Product.findById(productId, (error, product)=>{
        if(error) return response.status(500).send({message: `Error al borrar producto: ${error}`});
        product.remove(error =>{
            if(error) return response.status(500).send({message: `Error al borrar producto: ${error}`});
            response.status(200).send({message: `El producto ha sido eliminado`});
        });
    });
}

module.exports = {getAllProducts,
            getProduct,
            saveProduct,
            updateProduct,
            deleteProduct}
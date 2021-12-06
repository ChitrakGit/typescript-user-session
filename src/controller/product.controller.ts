import express,{Request,Response} from 'express';
import { createProductInput, findProductInput, updateProductInput,deleteProductInput } from '../schema/product.schema';

const {createProduct,findProduct,findAndUpdateProduct,deleteProduct} = require(<string>'../services/product.service');


module.exports.createProductHandler = async(req:Request<{},{},createProductInput["body"]>,res:Response)=>{
    // const userId = res.locals.user.id;
    const user = res.locals.user._id;

    const body = req.body;
    let product = await createProduct({...body,user});
    res.status(200).json({product,text:"Product created successfully"});
}

module.exports.findProductHandler = async(req:Request<findProductInput["params"]>,res:Response)=>{
    const productId = req.params.productId;
    const user = res.locals.user._id;
    const product:any = await findProduct({productId});
    if(!product){
        res.status(404).json({message:"Product not found"});
        return;
    }
    console.log("let see",user,product.user);
    if(String(product.user) != String(user)){
        res.status(403).json({message:"You are not authorized to delete this product"});
        return;
    }
    res.status(200).json({product,text:"Product found successfully"});
}

module.exports.updateProductHandler = async(req:Request<updateProductInput["params"]>,res:Response)=>{
    const user = res.locals.user._id;
    const update = req.body;

    const productId = req.params.productId;

    const product:any = await findProduct({productId});
    if(!product){
        res.status(404).json({message:"Product not found"});
        return;
    }

    if(String(product.user) != String(user)){
        res.status(403).json({message:"You are not authorized to update this product"});
        return;
    }
    let itemUpdate = await findAndUpdateProduct({productId},update, {new:true});
    res.status(200).json({product,text:"Product updated successfully"});

}

module.exports.deleteProductHandler = async(req:Request<deleteProductInput["params"]>,res:Response)=>{
    const user = res.locals.user._id;
    const productId = req.params.productId;

    const product:any = await findProduct({productId});
    if(!product){
        res.status(404).json({message:"Product not found"});
        return;
    }

    if(String(product.user) != String(user)){
        res.status(403).json({message:"You are not authorized to delete this product"});
        return;
    }
    let itemDelete = await deleteProduct({productId});
    res.status(200).json({product,text:"Product deleted successfully"});
}
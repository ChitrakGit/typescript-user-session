import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { ProductDocument } from '../models/product.model';
const {Product} =require(<string>'../models/product.model') ;



module.exports.createProduct = async(input: DocumentDefinition<Omit<ProductDocument , "createdAt" | "updatedAt">>) => {
    return await Product.create(input);
}

module.exports.findProduct = async(query:FilterQuery<ProductDocument>, options:QueryOptions={lean:true}) =>{
    console.log("cret pro",query);
    return await Product.findOne(query,{},options);
}

module.exports.findAndUpdateProduct = async(query:FilterQuery<ProductDocument>,update:UpdateQuery<ProductDocument>,options:QueryOptions={lean:true}) =>{
    return await Product.findOneAndUpdate(query,update,options);
}

module.exports.deleteProduct = async(query:FilterQuery<ProductDocument>)=>{
    return await Product.deleteOne(query);
}
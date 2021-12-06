import mongoose,{ MongooseOptions,Document, Model, model, Types, Schema, Query } from "mongoose";
import { customAlphabet, nanoid  } from 'nanoid';
import { UserDocument } from "./user.models";

const customAlphabetProduct:any = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);


export interface ProductDocument extends Document {
    user: UserDocument['_id'];
    productId:string;
    title: string;
    description: string;
    price: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}


const productSchema = new Schema<ProductDocument>({
    productId: {type: String, required: [true,"title must be required"], unique: true, default: ()=>`product_${nanoid()}`},
    user: { type: mongoose.Schema.Types.ObjectId, required: [true,"name must be required"],ref: 'User' },
    title: { type: String, required: [true,"title must be required"], trim: true },
    description: { type: String, required: [true,"description must be required"], trim: true },
    price: { type: String, required: [true,"price must be required"], trim: true },
    image: { type: String, required: [true,"image must be required"], trim: true },
}, {timestamps:true} as MongooseOptions);

// pre save hook
// productSchema.pre<ProductDocument>('save', async function (next) {
//     // console.log("in save doc",this);
//     return next();
// });





const Product = mongoose.model('Product', productSchema,"Products");

module.exports.Product = Product;
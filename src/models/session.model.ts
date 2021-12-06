import mongoose,{ MongooseOptions,Document, Model, model, Types, Schema, Query } from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';
import { UserDocument } from "./user.models";

export interface SessionDocument extends Document {
    user: UserDocument['_id'];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
    // comparePasswords(givenPassword: string, next: (err: Error | null, same: boolean | null) => void ): Promise<Boolean>;
}


const sessionSchema = new Schema<SessionDocument>({
    user: { type: mongoose.Schema.Types.ObjectId, required: [true,"name must be required"],ref: 'User' },
    valid: { type: Boolean, default:true },
    userAgent:{type:String, default:"" }
}, {timestamps:true} as MongooseOptions);

// pre save hook
sessionSchema.pre<SessionDocument>('save', async function (next) {
    // console.log("in save doc",this);
    return next();
});





const Session = mongoose.model('Session', sessionSchema,"Sessions");

module.exports.Session = Session;
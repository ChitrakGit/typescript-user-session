import mongoose,{ MongooseOptions,Document, Model, model, Types, Schema, Query } from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(givenPassword: string): Promise<Boolean>;
    // comparePassword(givenPassword: string) : Promise<Boolean>;
}


const userSchema = new Schema<UserDocument>({
    name: { type: String, required: [true,"name must be required"],trim: true },
    email: { type: String, required: [true,"name must be required"], unique: true, trim: true },
    password: { type: String, required: true }
}, {timestamps:true} as MongooseOptions);

// pre save hook
userSchema.pre<UserDocument>('save', async function (next) {
    // console.log("in save doc",this);
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, config.get<number>('GenSaltRounds'));
    return next();
});

// post save hook
userSchema.post<UserDocument>('save', async  (err:any,doc:object,next:any):Promise<any> =>{
    if (err.name === 'MongoError' && err.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next(err);
    }
});

userSchema.method('comparePassword',async function(givenPassword: string  ):Promise<boolean>{
    return await bcrypt.compare(givenPassword, this.password).catch((e)=>false);
});


const User = mongoose.model<UserDocument>('User', userSchema,"Users");

module.exports.User = User;
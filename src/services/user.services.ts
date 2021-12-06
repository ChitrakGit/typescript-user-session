import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import { UserDocument } from "../models/user.models";
const {User, UserDocument } = require(<string>'../models/user.models');

export async function createUser(input: DocumentDefinition< Omit< UserDocument,"createdAt" | "updatedAt" | 'passwordConfirmation' >>) {
    try {
        console.log("user input", input);
        let item : any = new User(input);
        item = await item.save();
        return omit(item.toJSON(),'password')
    } catch (error:any) {
        throw new Error(error);   
    }
}


exports.validateUserPassword = async({email, password}:{email:string ,password:string}) => {
    try {
        let user:UserDocument = await User.findOne({email});
        if(!user) return false;
        const isValid:Boolean = await user.comparePassword(password) ;
        if(!isValid) return false;
        return omit(user.toJSON(),'password')
    } catch (error:any) {
        throw new Error(error);  
    }
}

exports.findUser = async(query:FilterQuery<UserDocument>) => {
    try {
        let user:UserDocument = await User.findOne(query);
        if(!user) return false;
        return omit(user.toJSON(),'password')
        
    } catch (error:any) {
        throw new Error(error);  
    }
}


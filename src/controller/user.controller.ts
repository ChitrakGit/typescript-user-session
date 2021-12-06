import express,{Request,Response} from 'express';
import { CreateUserInput } from '../schema/user.schema';
import logger from '../utils/logger';
import {omit} from 'lodash';
const {User} = require(<string>'../models/user.models');
const {createUser} = require(<string>'../services/user.services');

exports.createUserHandler = async(req: express.Request<{},{},CreateUserInput['body']>, res: express.Response) => {
    try { 
        // console.log(`user.req.body`, req.body)
        let user = await createUser(req.body);
        if(user) return res.send({text: 'User created successfully', result:omit(user?.toJSON(),'password')});
        return res.status(400).send({text: "Server Problem"});
    } catch (error:any) {
        return res.status(409).send(error.toString());
    }
} 








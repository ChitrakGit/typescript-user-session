import express,{Request,Response} from 'express';
import logger from '../utils/logger';
import {omit} from 'lodash';
import  config  from 'config';
import { createSession,findSession, deleteSession, updateSession } from '../services/session.service';
const {validateUserPassword} = require(<string>'../services/user.services');
const {signJwt,verifyJwt} = require(<string>'../utils/jwt.utils');

// connected to services
exports.createSessionHandler = async(req: express.Request, res: express.Response) => {
    try { 
        // Validate the user's password
        let {email,password} = req.body;
        let user = await validateUserPassword({email,password});
        if(!user) return res.status(401).json({message: 'Invalid credentials'});
        // create a session
        let session = await createSession(user._id,req.get('user-agent') || '');
        // create an access token
        let accessToken = signJwt({...user,sessionId:session._id,expiresIn:config.get<string>('accessTokenTtl')});
        console.log("sl",email,password);

        // create a refresh token
        let refreshToken = signJwt({...user,sessionId:session._id,expiresIn:config.get<string>('refreshTokenTtl')});
        // return access & refresh tokens
        return res.status(200).json({accessToken,refreshToken});
    } catch (error:any) {
        console.log(new Error(error));
        return res.status(409).send(error.toString());
    }
} 


exports.getSessionHandler = async(req:Request, res: Response) => {
    const userId = res.locals.user._id;
    try {
        const session = await findSession({user:userId, valid:true});
        res.status(200).json(session);
    } catch (error:any) {
        console.log(new Error(error));
        return res.status(409).send(error.toString());
    }
}

exports.updateSessionHandler = async(req:Request, res: Response) => {
    const info = res.locals.user;
    console.log("infoSession",info.sessionId);
    try {
        const session = await updateSession({_id:info.sessionId},{valid:false});
        res.status(200).json({
            message: 'Session Updated successfully',
            accessToken:null,
            refreshToken:null
        });
    } catch (error:any) {
        console.log(new Error(error));
        return res.status(409).send(error.toString());
    }
}

exports.deleteSessionHandler = async(req:Request, res: Response) => {
    const info = res.locals.user;
    console.log("infoSession",info.sessionId);
    try {
        const session = await deleteSession({_id:info.sessionId});
        res.status(200).json({
            message: 'Session deleted successfully',
            accessToken:null,
            refreshToken:null
        });
    } catch (error:any) {
        console.log(new Error(error));
        return res.status(409).send(error.toString());
    }
}
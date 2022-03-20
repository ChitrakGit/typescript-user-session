import { FilterQuery, UpdateQuery } from "mongoose";
import {get} from "lodash";
import config from "config";
const {Session, SessionDocument} = require(<string>'../models/session.model');
const {signJwt,verifyJwt} = require(<string>'../utils/jwt.utils');

const {findUser} = require(<string>'../services/user.services');

// create session
export const createSession = async(userId:string, useragent:string) => {
    try {
        let item:any = {user:userId, useragent:useragent};
        item = new Session(item);
        return await item.save();
    } catch (error:any) {
        throw new Error(error);  
    }
}
// find session
export const findSession = async(query:FilterQuery<typeof SessionDocument>) => {
    try {
        let item = await Session.find(query);
        return item  ;
    } catch (error:any) {
        throw new Error(error);  
    }
}
// update session
export const updateSession = async(query:FilterQuery<typeof SessionDocument>,update:UpdateQuery<typeof SessionDocument>) => {
    try {
        let item = await Session.updateOne(query,update);
        return item  ;
    } catch (error:any) {
        throw new Error(error);  
    }
}
// delete session
export const deleteSession = async(query:FilterQuery<typeof SessionDocument>) => {
    try {
        let item = await Session.deleteOne(query);
        return item  ;
    } catch (error:any) {
        throw new Error(error);  
    }
}


// refresh token
export async function reIssueAccessToken({refreshToken}: {refreshToken: string}) {
    
    const { decoded } = verifyJwt(refreshToken);
  
    if (!decoded || !get(decoded, "session")) return false;
  
    const session = await Session.findById(get(decoded, "session"));
  
    if (!session || !session.valid) return false;
  
    const user = await findUser({ _id: session.user });
  
    if (!user) return false;
  
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );
  
    return accessToken;
  }
  
import {get} from 'lodash';
import {Request, Response, NextFunction} from 'express';

import {reIssueAccessToken} from '../services/session.service';
const {verifyJwt} = require(<string>'../utils/jwt.utils');

const deserialize =async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, 'headers.authorization',"").replace(/^Bearer\s/, '');
    if(!accessToken) {
        return next();
    }
    const  decoded = await verifyJwt(accessToken);
    /* decoded return value is
    {
        valid: true,
        expired: false,
        decoded: {
            _id: '61ac824552e7463f0857d258',
            name: 'Jane Doe',
            email: 'test@example.com',
            createdAt: '2021-12-05T09:11:33.164Z',
            updatedAt: '2021-12-05T09:11:33.164Z',
            __v: 0,
            sessionId: '61ad0b53c72e23ffb879b1d0',
            expiresIn: '15m',
            iat: 1638730579
        }
        }
    */
    // first time login
    // console.log(decoded);
    if(decoded){
        res.locals.user = decoded.decoded;
        return next();
    }
    // after token over time
    // refresh token from session service and update token in session
    const refreshToken = get(req, "headers.x-refresh");
    if (decoded.expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({ refreshToken });
    
        if (newAccessToken) {
          res.setHeader("x-access-token", newAccessToken);
        }
    
        const result = verifyJwt(newAccessToken as string);
    
        res.locals.user = result.decoded;
        return next();
      }
    return next();
}

export default deserialize;
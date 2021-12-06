import jwt from "jsonwebtoken";
import config from "config";

const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

// sign jwt
module.exports.signJwt = (object:Object,options?:jwt.SignOptions | undefined) => {
    // return jwt.sign(object, privateKey, {
    //     ...(options && options),
    //     algorithm: "RS256",
    //   });

    return jwt.sign(object, privateKey,{...(options && options)})
}

// verify jwt
module.exports.verifyJwt = async(token: string) => {
    try {
      const decoded = jwt.verify(token, privateKey);
      return {
        valid: true,
        expired: false,
        decoded:decoded
      };
    } catch (e: any) {
      console.error(e);
      return {
        valid: false,
        expired: e.message === "jwt expired",
        decoded: null,
      };
    }
  }

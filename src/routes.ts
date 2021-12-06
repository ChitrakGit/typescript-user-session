import express,{Request,Response} from 'express';
import validateResource from './middleware/validateResource';

import deserialize from './middleware/deserialize.middleware';

import { createUserSchema } from './schema/user.schema';
import {createSessionSchema} from './schema/session.schema';
import {createProductSchema, deleteProductSchema, findProductSchema, updateProductSchema} from './schema/product.schema';

const {createUserHandler} = require(<string>"./controller/user.controller");
const product = require(<string>"./controller/product.controller");
const {createSessionHandler, getSessionHandler,deleteSessionHandler,updateSessionHandler} = require(<string>"./controller/session.controller");


const router = express.Router();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// User Routes
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const TestRoute = async(req:Request,res:Response) => {
    return res.json({ message: 'Hello World',status:200 });
}
router.get('/test',TestRoute);
////////////////////////////

router.post('/api/users',validateResource(createUserSchema),createUserHandler);

router.post('/api/sessions',validateResource(createSessionSchema),createSessionHandler);
router.get('/api/sessions',deserialize,getSessionHandler);
router.put('/api/sessions',deserialize,updateSessionHandler);
router.delete('/api/sessions',deserialize,deleteSessionHandler);

router.post('/api/products',[deserialize,validateResource(createProductSchema)],product.createProductHandler);
router.get('/api/products/:productId',[deserialize,validateResource(findProductSchema)],product.findProductHandler);
router.put('/api/products/:productId',[deserialize,validateResource(updateProductSchema)],product.updateProductHandler);
router.delete('/api/products/:productId',[deserialize,validateResource(deleteProductSchema)],product.deleteProductHandler);





module.exports = router;
import express from 'express';
import { PropertyController } from '../controllers/property.controller';

const propertyRouter = express.Router()

propertyRouter.route('/getPropertiesByUsername').post(
    (req, res)=> new PropertyController().getPropertiesByUsername(req, res)
)

propertyRouter.route('/getAllProperties').get(
    (req, res)=> new PropertyController().getAllProperties(req, res)
)

propertyRouter.route('/deleteProperty').post(
    (req, res)=> new PropertyController().deleteProperty(req, res)
)

propertyRouter.route('/addProperty').post(
    (req, res)=> new PropertyController().addProperty(req, res)
)

propertyRouter.route('/getPropertyById').post(
    (req, res)=> new PropertyController().getPropertyById(req, res)
)

propertyRouter.route('/editProperty').post(
    (req, res)=> new PropertyController().editProperty(req, res)
)

export default propertyRouter;
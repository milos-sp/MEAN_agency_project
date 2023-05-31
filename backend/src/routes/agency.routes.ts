import express from 'express';
import { AgencyController } from '../controllers/agency.controller';

const agencyRouter = express.Router();

agencyRouter.route('/getAllAgencies').get(
    (req, res)=> new AgencyController().getAllAgencies(req, res)
)

export default agencyRouter;
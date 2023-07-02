import express from 'express';
import { AgencyController } from '../controllers/agency.controller';

const agencyRouter = express.Router();

agencyRouter.route('/getAllAgencies').get(
    (req, res)=> new AgencyController().getAllAgencies(req, res)
)

agencyRouter.route('/searchAgencies').post(
    (req, res)=> new AgencyController().searchAgencies(req, res)
)

agencyRouter.route('/editAgency').post(
    (req, res)=> new AgencyController().editAgency(req, res)
)

export default agencyRouter;
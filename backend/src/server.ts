import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import agencyRouter from './routes/agency.routes';
import imageRouter from './routes/image.routes';
import propertyRouter from './routes/property.routes';



const app = express();
app.use(cors());
app.use(express.json());

const bodyParser = require('body-parser')

mongoose.connect('mongodb://127.0.0.1:27017/projekatDB')
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connected');
})

const router = express.Router();
router.use('/users', userRouter)
router.use('/agency', agencyRouter)
router.use('/image', imageRouter)
router.use('/properties', propertyRouter)

const path = require('path')
router.use('/uploads', express.static(path.join('./src/uploads')))


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
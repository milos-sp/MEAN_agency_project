import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let WorkerRequest = new Schema({
    agency: {
        type: String
    },
    increment: {
        type: Number
    }
})

export default mongoose.model('WorkerRequestModel', WorkerRequest, 'worker_requests');
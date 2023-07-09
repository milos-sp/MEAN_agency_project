import mongoose from "mongoose";

const Schema = mongoose.Schema;

let CancelJob = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    job_id: {
        type: String
    },
    client: {
        type: String
    },
    agency: {
        type: String
    },
    reason: {
        type: String
    }
})

export default mongoose.model('CancelRequestModel', CancelJob, 'stop_job_requests')
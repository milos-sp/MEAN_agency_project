import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Request = new Schema({
    property_id: {
        type: String
    },
    date_start: {
        type: String
    },
    date_end: {
        type: String
    },
    agency_username: {
        type: String
    },
    client_username: {
        type: String
    },
    status: {
        type: Number
    },
    _id: {
        type: mongoose.Types.ObjectId
    },
    offer: {
        type: Number
    }
})

export default mongoose.model('RequestModel', Request, 'requests')
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
    }

})

export default mongoose.model('RequestModel', Request, 'requests')
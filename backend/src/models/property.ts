import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Property = new Schema({
    type: {
        type: String
    },
    address: {
        type: String
    },
    owner: {
        type: String
    },
    rooms: {
        type: Number
    },
    area: {
        type: Number
    },
    layout: {
        type: Array
    },
    doors: {
        type: Array
    },
    id: {
        type: Number
    }
})

export default mongoose.model('PropertyModel', Property, 'properties')
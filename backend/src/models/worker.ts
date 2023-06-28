import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Worker = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    occupation: {
        type: String
    },
    agency: {
        type: String
    },
    property: {
        type: String
    },
    room: {
        type: Number
    }
})

export default mongoose.model('WorkerModel', Worker, 'workers');
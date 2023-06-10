import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Comment = new Schema({
    rating: {
        type: Number
    },
    comment: {
        type: String
    },
    username: {
        type: String
    },
    agency_username: {
        type: String
    }
})

export default mongoose.model('CommentModel', Comment, 'comments');
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Image = new Schema({
    username: {
        type: String
    },
    imageUrl: {
        type: String
    }
})

export default mongoose.model('ImageModel', Image, 'images')
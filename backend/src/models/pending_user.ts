import mongoose from 'mongoose';
var bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

let PendingUser = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    telephone: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    agency: {
        type: String
    },
    agencyID: {
        type: Number
    },
    description: {
        type: String
    },
    address: {
        type: {
            country: {
                type: String
            },
            city: {
                type: String
            },
            street: {
                type: String
            },
            street_n: {
                type: String
            }
        }
    },
    address_string: {
        type: String
    },
    workers_number: {
        type: Number
    },
    rejected: {
        type: Boolean
    }
})

PendingUser.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

PendingUser.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('PendingUserModel', PendingUser, 'pending_users');
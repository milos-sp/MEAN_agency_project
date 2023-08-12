import mongoose from 'mongoose';
import crypto from 'crypto';
var bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

let User = new Schema({
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
    }
})

User.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

User.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

User.methods.generatePasswordResetHash = function(){
    const resetHash = crypto.createHash('sha512').update(this.password).digest('hex')
    return resetHash
}

User.methods.verifyPasswordResetHash = function(resetHash = undefined){
    return resetHash === this.generatePasswordResetHash()
}

export default mongoose.model('UserModel', User, 'users');
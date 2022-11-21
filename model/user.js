const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,

    },
    fullname: {
        type: String,
        required: true
    },
    department: {
        type: String,
        default: 'staff'
    },
    reports: [{
        type: Schema.Types.ObjectId,
        ref: 'Report'
    }]
});

module.exports = mongoose.model('User', userSchema);
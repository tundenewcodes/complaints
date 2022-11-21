const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reportSchema = new Schema({

    reportBody: {
        type: String,
        required: true,
    },
    reportTitle: {
        type: String,
        required: true,
    },
    status: {
        type: String,

    },
  
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Report', reportSchema)
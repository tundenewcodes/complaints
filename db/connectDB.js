const mongoose = require('mongoose')

const connectDB = (url) => {
    mongoose
        .connect(url)
        .then(() => {
            console.log('connected to the database now ....')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = connectDB
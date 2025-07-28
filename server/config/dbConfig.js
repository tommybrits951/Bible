const mongoose = require("mongoose")


async function connectDB() {
    return await mongoose.connect("mongodb://localhost:27017/bible")
}

module.exports = connectDB
const mongoose = require("mongoose")



const bookSchema = new mongoose.Schema({
    name: String,
    chapters: [Array]
})


module.exports = mongoose.model("Book", bookSchema)
require("dotenv").config()
const connectDB = require("./config/dbConfig")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT
const app = express()

connectDB()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(cookieParser())
app.use("/", require("./routes/bibleRoutes"))
mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
})


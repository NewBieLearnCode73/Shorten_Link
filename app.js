const express =require("express")
const mongoDBConnection = require("./connection")
const app = express()
const notFound = require("./middlewares/notFoundMiddleware")
const globalError = require("./middlewares/globalMiddleware")
const urlRouter = require("./routes/url")
const dotenv = require("dotenv").config()

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shorten-link";



app.use(express.json())

mongoDBConnection(MONGODB_URI);


app.use("/api/url", urlRouter)

app.use(notFound)

app.use(globalError)


app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}!`)
})
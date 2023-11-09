const express = require("express")
const bodyparser = require("body-parser")
const helmet = require("helmet")
const mongoose = require("mongoose")

const app = express()


//Importing the routes
const user = require("./routes/user")
const NewUser = require("./routes/newuser")
const labour = require("./routes/labour")


//Using the middlewares
app.use(helmet())
app.use(bodyparser.json())


//Using the routes
app.use("/user", user)
app.use("/newuser", NewUser)
app.use("/labour", labour)


//Establish a connection to the database
const connectToDatabase = async () => {
    await mongoose.connect("mongodb+srv://cla2:cla2@cluster0.2z3crea.mongodb.net/authentication-system")
    console.log("Database is connected")
    
}

//Running the server
const port = 3000
app.listen(port, () => {
    connectToDatabase()
    console.log("Server is running")
})

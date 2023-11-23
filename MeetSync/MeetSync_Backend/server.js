//Get dependencies
const express = require("express")
const app = express()
const mysql = require("promise-mysql")
const fileUpload = require("express-fileupload")
const cors = require('cors')

//Setup dependencies
app.use(fileUpload({
    createParentPath: true
}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(express.static(__dirname + '/public'))

//Get routes
const userRoutes = require("./routes/userRoutes")

//Database connection
mysql.createConnection({ //TODO Modifier pour publication sur wecode
    host: "localhost",
    user: "root",
    password: "",
    database: "meetsync",
})
.then((db)=>{
    console.log("Connected to MeetSync database");

    app.get('/', (req,res,next)=>{
        res.json({status: 200, results: "Welcome to MeetSync API!"})
    })

    userRoutes(app, db);
})
.catch(err=>console.log(err))

//Server running
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`MeetSync server running on http://localhost:${PORT}/ ... `)
})
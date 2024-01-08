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

let config;
if(process.env.EDITOR !== "vi"){ // Check if server running on wecode
    config = require("./config_offline")
}else{
    config = require("./config_online")
}

const host = process.env.HOST_DB || config.db.host
const user = process.env.USER_DB || config.db.user
const database = process.env.DATABASE_DB || config.db.database
const password = process.env.PASSWORD_DB || config.db.password

//Get routes
const userRoutes = require("./routes/userRoutes")
const eventRoutes = require("./routes/eventRoutes")
const appointmentRequestRoutes = require("./routes/appointmentRequestRoutes")
const appointmentSessionRoutes = require("./routes/appointmentSessionRoutes")
const appointmentRoutes = require("./routes/appointmentRoutes")

//Database connection
mysql.createConnection({ //TODO Modifier pour publication sur wecode
    host: host,
    user: user,
    password: password,
    database: database,
})
.then((db)=>{
    console.log("Connected to MeetSync database");
    setInterval(async function () {
		let res = await db.query('SELECT 1');
		//console.log(res);
	}, 5000);
    app.get('/', (req,res,next)=>{
        res.json({status: 200, results: "Welcome to MeetSync API!"})
    })

    userRoutes(app, db);
    eventRoutes(app, db);
    appointmentRequestRoutes(app, db);
    appointmentSessionRoutes(app, db);
    appointmentRoutes(app, db);

})
.catch(err=>console.log(err))

//Server port running
const PORT = process.env.PORT || 8080

// Gestion des erreurs serveur
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: 'Error server'});
  });

app.listen(PORT, ()=>{
    console.log(`MeetSync server running on http://localhost:${PORT}/ ... `)
})
const authentication = require("../middleware/authentication")
if(!process.env.HOST_DB) {
	config = require('../config_offline');
} else {
	config = require('../config_online');
}
const secret = process.env.SECRET_USER || config.token.secret_user;

module.exports = (app, db) => {
    const AppointmentModel = require("../models/AppointmentModel")(db)
    
}
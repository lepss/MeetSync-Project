module.exports = (_db) => {
    db = _db
    AppointmentModel = require('../models/AppointmentModel')(db);
    return AppointmentController
}

class AppointmentController{
    
}
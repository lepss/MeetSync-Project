const authentication = require("../middleware/authentication")

module.exports = (app, db) => {
    const AppointmentController = require("../controllers/AppointmentController")(db)

	app.post("/api/appointment/generate/:event_id", AppointmentController.generateEventAppointments);
    app.post("/api/appointments", AppointmentController.getAllAppointment);
    app.put("/api/appointment/event/:event_id", authentication, AppointmentController.getAllEventAppointment);
    app.put('/api/appointment/session/:appointment_session_id', authentication, AppointmentController.getAllSessionAppointment);
    app.put("/api/appointment/user/:user_id", authentication, AppointmentController.getAllUserAppointment);
    app.get("/api/appointment/:id", authentication, AppointmentController.getAppointment);
    app.get("/api/appointment/delete/:id", authentication, AppointmentController.deleteAppointment)
}
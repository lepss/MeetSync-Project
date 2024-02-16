const authentication = require("../middleware/authentication")

module.exports = (app, db) => {
    const AppointmentController = require("../controllers/AppointmentController")(db)

    app.get("/api/appointments", AppointmentController.getAllAppointment);
    app.get("/api/appointment/event/:event_id", authentication, AppointmentController.getAllEventAppointment);
    app.get('/api/appointment/session/:appointment_session_id', authentication, AppointmentController.getAllSessionAppointment);
    app.get("/api/appointment/user/:user_id", authentication, AppointmentController.getAllUserAppointment);
    app.get("/api/appointment/:id", authentication, AppointmentController.getAppointment);
    app.delete("/api/appointment/delete/:id", authentication, AppointmentController.deleteAppointment)
    app.delete("/api/appointment/delete/all/:event_id", authentication, AppointmentController.deleteAllAppointmentInEvent)
}
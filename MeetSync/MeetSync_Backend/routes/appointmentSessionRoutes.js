const authentication = require("../middleware/authentication")

module.exports = (app, db) => {
    const AppointmentSessionController = require("../controllers/AppointmentSessionController")(db)

    app.post("/api/appointmentSession/add/:event_id", authentication, AppointmentSessionController.addAppointmentSession)
    app.get("/api/appointmentSession/all/event/:event_id", authentication, AppointmentSessionController.getAllEventAppointmentSession)
    app.get("/api/appointmentSession/all/user/:user_id", authentication, AppointmentSessionController.getAllUserAppointmentSession)
    app.get("/api/appointmentSession/one/:id", authentication, AppointmentSessionController.getAppointmentSession)
    app.get("/api/appointmentSession/event/id/:session_id", authentication, AppointmentSessionController.getEventIdOfAppointmentSession)
    app.put("/api/appointmentSession/update/:session_id", authentication, AppointmentSessionController.updateAppointmentSession)
    app.delete("/api/appointmentSession/delete/:id", authentication, AppointmentSessionController.deleteAppointmentSession)
}
const authentication = require("../middleware/authentication")

module.exports = (app, db) =>{
    const AppointmentRequestController = require("../controllers/AppointmentRequestController")(db)

    app.post("/api/appointmentRequest/add/:appointment_session_id", authentication, AppointmentRequestController.addAppointmentRequest)
    app.get("/api/appointmentRequest/all/event/:event_id", authentication, AppointmentRequestController.getAllEventAppointmentRequest)
    app.get("/api/appointmentRequest/all/appointmentSession/:appointmentSession_id", authentication, AppointmentRequestController.getAllSessionAppointmentRequest)
    app.get("/api/appointmentRequest/all/user/:user_id", authentication, AppointmentRequestController.getAllUserAppointmentRequest)
    app.get("/api/appointmentRequest/one/:id", authentication, AppointmentRequestController.getAppointmentRequest)
    app.put("/api/appointmentRequest/update/:id", authentication, AppointmentRequestController.updateAppointmentRequest)
    app.put("/api/appointmentRequest/validate/:id", authentication, AppointmentRequestController.validateAppointmentRequest)
    app.delete("/api/appointmentRequest/delete/:id", authentication, AppointmentRequestController.deleteAppointmentRequest)
}
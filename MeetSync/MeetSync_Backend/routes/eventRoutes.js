const authentication = require("../middleware/authentication")

module.exports = (app, db) =>{
    const EventController = require("../controllers/EventController")(db)
    // const EventDayModel = require("../models/EventDayModel")(db)

    app.post("/api/event/add", authentication, EventController.addEvent)
    app.get("/api/event/all", EventController.getEvents)
    app.get("/api/event/all/:user_id", authentication, EventController.getUserEvent)
    app.get("/api/event/one/:id", EventController.getEvent)
    app.put("/api/event/update/:id", authentication, EventController.updateEvent)
    app.delete("/api/event/delete/:id", authentication, EventController.deleteEvent)
}
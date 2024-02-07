const authentication = require("../middleware/authentication")

module.exports = (app, db) =>{
    const EventController = require("../controllers/EventController")(db)
    const EventDayController = require("../controllers/EventDayController")(db)

    //Event
    app.post("/api/event/add", authentication, EventController.addEvent)
    app.get("/api/event/all", EventController.getEvents)
    app.get("/api/event/all/:user_id", authentication, EventController.getUserEvent)
    app.get("/api/event/one/:id", EventController.getEvent)
    app.put("/api/event/update/:id", authentication, EventController.updateEvent)
    app.delete("/api/event/delete/:id", authentication, EventController.deleteEvent)

    //Event day
    app.post("/api/event/eventday/add", authentication, EventDayController.saveOneEventDay)
    app.get("/api/event/eventday/all/:event_id", EventDayController.getAllEventDays)
    app.get("/api/event/eventday/:event_id", EventDayController.getEventDay)
    app.put("/api/event/eventday/update/:id", authentication, EventDayController.updateEventDay)
    app.delete("/api/event/eventday/delete/:id", authentication, EventDayController.deleteEventDay)
}
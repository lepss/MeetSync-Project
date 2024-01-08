module.exports = (_db) => {
    db = _db
    EventDayModel = require('../models/EventDayModel')(db);
    return EventDayController
}

class EventDayController{
    
}
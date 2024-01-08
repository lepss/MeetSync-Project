module.exports = (_db) => {
    db = _db
    EventModel = require('../models/EventModel')(db);
    return EventController
}

class EventController{
    static async addEvent(req, res){
        const event = await EventModel.saveOneEvent(req);
        if(event.code){
            res.status(500).json({msg:"Failed to save event due to a server error", error: event})
        }else{
            res.status(200).json({msg: "Event saved"})
            //TODO add all eventDay (getEvent id => addDay(id) )
        }
    }

    static async getEvents(req, res){
        const events = await EventModel.getAllEvent();
        if(events.code){
            res.status(500).json({msg:"Failed to get events due to a server error", error: events})
        }else{
            if(events.length === 0){
                res.status(400).json({msg : "No events found"})
            }else{
                res.status(200).json({msg: "Events founds", result: events})
            }
        }
    }

    static async getEvent(req, res){
        const event = await EventModel.getOneEvent(req.params.id)
        if(event.code){
            res.status(500).json({msg:"Failed to get event due to a server error", error: event})
        }else{
            res.status(200).json({msg: "Event found", result: event})
        }
    }

    static async getUserEvent(req, res){
        const result = await EventModel.getAllUserEvent(req.params.user_id)
        if(result.code){
            res.status(500).json({msg:"Failed to get event due to a server error", error: result})
        }else{
            if(result.length === 0){
                res.status(400).json({msg : "No events found"})
            }else{
                res.status(200).json({msg: "Events founds", result: result})
            }
        }
    }

    static async updateEvent(req, res){
        const updateEvent = await EventModel.updateEvent(req, req.params.id)
        if(updateEvent.code){
            res.status(500).json({msg:"Failed to update event due to a server error", error: updateEvent})
        }else{
            res.status(200).json({msg: "Event updated", result: updateEvent})
        }
    }

    static async deleteEvent(req, res){
        const deleteEvent = await deleteEvent(req.params.id);
        if(deleteEvent.code){
            res.status(500).json({msg:"Failed to delete event due to a server error", error: deleteEvent})
        }else{
            res.status(200).json({msg: "Event deleted"})
        }
    }
}
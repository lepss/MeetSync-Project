module.exports = (_db) => {
    db = _db
    EventDayModel = require('../models/EventDayModel')(db);
    return EventDayController
}

class EventDayController{
    static async saveOneEventDay(req, res){
        const eventDay = await EventDayModel.saveOneEventDay(req);
        if(eventDay.code){
            res.status(500).json({msg:"Failed to save event day due to a server error", error: eventDay})
        }else{
            res.status(200).json({msg: "Event day saved"})
        }
    }

    static async getAllEventDays(req, res){
        const eventDays = await EventDayModel.getAllEventDay(req.params.event_id);
        if(eventDays.code){
            res.status(500).json({msg:"Failed to get event days due to a server error", error: eventDays})
        }else{
            if(eventDays.length === 0){
                res.status(400).json({msg : "No event days found"})
            }else{
                res.status(200).json({msg: "Event days founds", result: eventDays})
            }
        }
    }

    static async getEventDay(req, res){
        const eventDay = await EventDayModel.getOneEventDay(req.params.id);
        if(eventDay.code){
            res.status(500).json({msg:"Failed to get event day due to a server error", error: eventDay})
        }else{
            res.status(200).json({msg: "Event day found", result: eventDay})
        }
    }

    static async updateEventDay(req, res){
        const updateEventDay = await EventDayModel.updateEventDay(req, req.params.id);
        if(updateEventDay.code){
            res.status(500).json({msg:"Failed to update event day due to a server error", error: updateEventDay})
        }else{
            res.status(200).json({msg: "Event day updated", result: updateEventDay})
        }
    }

    static async deleteEventDay(req, res){
        const deleteEventDay = await EventDayModel.deleteEventDay(req.params.id);
        if(deleteEventDay.code){
            res.status(500).json({msg:"Failed to update event day due to a server error", error: deleteEventDay})
        }else{
            res.status(200).json({msg: "Event day updated"})
        }
    }
}
module.exports = (_db) => {
    db = _db
    EventModel = require('../models/EventModel')(db);
    return EventController
}

const fs = require("fs")

class EventController{
    static async addEvent(req, res){
        const event = await EventModel.saveOneEvent(req);
        if(event.code){
            res.status(500).json({msg:"Failed to save event due to a server error", error: event})
        }else{
            res.status(200).json({msg: "Event saved", insertId: event.insertId})
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

    static async getEventsCount(req, res){
        const events = await EventModel.getAllEvent();
        if(events.code){
            res.status(500).json({msg:"Failed to get events due to a server error", error: events})
        }else{
            if(events.length === 0){
                res.status(400).json({msg : "No events found"})
            }else{
                res.status(200).json({msg: "Events founds", result: events.length})
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
        const event = await EventModel.getOneEvent(req.params.event_id);
        if(event.code){
            res.status(500).json({msg:"Failed to get event due to a server error", error: event})
        }else{
            const updateEvent = await EventModel.updateEvent(req, req.params.event_id)
            if(updateEvent.code){
                res.status(500).json({msg:"Failed to update event due to a server error", error: updateEvent})
            }else{
                if(updateEvent.event_image_url !== undefined){
                    await fs.unlink(`public/images/${updateEvent.event_image_url}`, (err) => {
                        if(err){
                            console.log("Failed to delete old image")
                        }
                    })
                }
                res.status(200).json({msg: "Event updated", result: updateEvent})
            }
        }
    }

    static async saveEventPict(req, res){
        if(!req.files || Object.keys(req.files).length === 0){
            res.status(400).json({msg:"Failed to get event image"})
        }else{
            console.log(req.files);
            req.files.image.mv(`public/images/${req.files.image.name}`, (err) => {
                if(err){
                    res.status(500).json({ msg: "Picture not saved"})
                } else {
                    //c'est good c'est enregistrée on retourne le nome de l'img enregistrée vers le front
                    res.status(200).json({msg: "Picture saved", url: req.files.image.name})
                }
            })
        }
    }

    static async setEventAgendaGenerated(req, res){
        const updateEvent = await EventModel.setEventAgendaGenerated(req.body.agenda_generated, req.params.event_id)
        if(updateEvent.code){
            res.status(500).json({msg:"Failed to update event due to a server error", error: updateEvent})
        }else{
            res.status(200).json({msg: "Event updated", result: updateEvent})
        }
    }

    static async deleteEvent(req, res){
        const event = await EventModel.getOneEvent(req.params.id);
        if(event.code){
            res.status(500).json({msg:"Failed to get event due to a server error", error: event})
        }else{
            const deleteEvent = await EventModel.deleteEvent(req.params.id);
            if(deleteEvent.code){
                res.status(500).json({msg:"Failed to delete event due to a server error", error: deleteEvent})
            }else{
                if(deleteEvent.event_image_url !== undefined){
                    await fs.unlink(`public/images/${deleteEvent.event_image_url}`, (err) => {
                        if(err){
                            console.log("Failed to delete image")
                        }
                    })
                }
                res.status(200).json({msg: "Event deleted"})
            }
        }
        
    }
}
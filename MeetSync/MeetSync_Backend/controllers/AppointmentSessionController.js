module.exports = (_db) => {
    db = _db
    AppointmentSessionModel = require('../models/AppointmentSessionModel')(db);
    AppointmentRequestModel = require('../models/AppointmentRequestModel')(db);
    return AppointmentSessionController
}

class AppointmentSessionController{
    static async addAppointmentSession(req, res){
        const checkSession = await AppointmentSessionModel.getUserAppointmentSessionInEvent(req.body.user_id, req.params.event_id) // Check if user have already a session register in this event
        if(checkSession.code){
            res.status(500).json({msg: "Appointment verification server error", error: checkSession})
        }else{
            if(checkSession.length > 0){
                res.status(401).json({msg: "You already have a session register in this event, you can't have mutiple session in the same event"})
            }else{
                const checkRequest = await AppointmentRequestModel.getUserAppointmentRequestInEvent(req.body.user_id, req.params.event_id) // Check if user have already a request register in this event
                if(checkRequest.code){
                    res.status(500).json({msg: "Appointment verification server error", error: checkRequest})
                }else{
                    if(checkRequest.length > 0){
                        res.status(401).json({msg: "You already have a session request register in this event, you can't make a request and organize a sesion in the same event"})
                    }else{
                        console.log(checkRequest);
                        const appointmentSession = await AppointmentSessionModel.saveOneAppointmentSession(req, req.params.event_id);
                        if(appointmentSession.code){
                            res.status(500).json({msg:"Failed to save appointment session due to a server error", error: appointmentSession})
                        }else{
                            res.status(200).json({msg: "Appointment session saved"})
                        }
                    }
                }
            }
        }
    }

    static async getAllEventAppointmentSession(req, res){
        const appointmentSessions = await AppointmentSessionModel.getAllEventAppointmentSession(req.params.event_id);
        if(appointmentSessions.code){
            res.status(500).json({msg:"Failed to get appointment sessions due to a server error", error: appointmentSessions})
        }else{
            if(appointmentSessions.length === 0){
                res.status(400).json({msg : "No appointment sessions found"})
            }else{
                res.status(200).json({msg: "Appointment sessions found", result: appointmentSessions})
            }
        }
    }

    static async getAllUserAppointmentSession(req, res){
        const appointmentSessions = await AppointmentSessionModel.getAllUserAppointmentSession(req.params.user_id);
        if(appointmentSessions.code){
            res.status(500).json({msg:"Failed to get appointment sessions due to a server error", error: appointmentSessions})
        }else{
            if(appointmentSessions.length === 0){
                res.status(400).json({msg : "No appointment sessions found"})
            }else{
                res.status(200).json({msg: "Appointment sessions found", result: appointmentSessions})
            }
        }
    }

    static async getAppointmentSession(req, res){
        const appointmentSession = await AppointmentSessionModel.getOneAppointmentSession(req.params.id);
        if(appointmentSession.code){
            res.status(500).json({msg:"Failed to get appointment session due to a server error", error: appointmentSession})
        }else{
            res.status(200).json({msg: "Appointment session found", result: appointmentSession})
        }
    }

    static async updateAppointmentSession(req, res){
        const updateAppointmentSession = await AppointmentSessionModel.updateAppointmentSession(req, req.params.id);
        if(updateAppointmentSession.code){
            res.status(500).json({msg:"Failed to update appointment session due to a server error", error: updateAppointmentSession})
        }else{
            res.status(200).json({msg: "Appointment session updated", result: updateAppointmentSession})
        }
    }

    static async deleteAppointmentSession(req, res){
        const deleteAppointmentSession = await deleteAppointmentSession.deleteAppointmentSession(req.params.id);
        if(deleteAppointmentSession.code){
            res.status(500).json({msg:"Failed to delete appointment session due to a server error", error: deleteAppointmentSession})
        }else{
            res.status(200).json({msg: "Appointment session deleted", result: deleteAppointmentSession})
        }
    }
}
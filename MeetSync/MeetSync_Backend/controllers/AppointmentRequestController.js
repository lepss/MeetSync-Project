module.exports = (_db) => {
    db = _db
    AppointmentRequestModel = require('../models/AppointmentRequestModel')(db);
    AppointmentSessionModel = require('../models/AppointmentSessionModel')(db);
    return AppointmentRequestController
}

class AppointmentRequestController{
    static async addAppointmentRequest(req, res){
        //Get event id
        const eventId = await AppointmentSessionModel.getEventIdOfAppointmentSession(req.params.appointment_session_id)
        if(eventId.code){
            res.status(500).json({msg:"Failed to save appointment request due to a server error", error: eventId})
        }else{
            // Check if user have already a session register in this event
            const checkSession = await AppointmentSessionModel.getUserAppointmentSessionInEvent(req.body.user_id, eventId[0].event_id) 
            if(checkSession.code){
                res.status(500).json({msg: "Request verification server error", error: checkSession})
            }else{
                if(checkSession.length > 0){
                    res.status(401).json({msg: "You already have a session register in this event, you can't request an appointment as an oragnizer"})
                }else{
                    //check if a request is already done in this session
                    const checkRequest = await AppointmentRequestModel.getUserAppointmentRequestInSession(req.body.user_id, req.params.appointment_session_id)
                    if(checkRequest.code){
                        res.status(500).json({msg: "Request verification server error", error: checkRequest})
                    }else{
                        if(checkRequest.length > 0){
                            res.status(401).json({msg: "You already have a request register in this session, you can't have multiple request in the same session"})
                        }else{
                            const appointmentRequest = await AppointmentRequestModel.saveOneAppointmentRequest(req, req.params.appointment_session_id);
                            console.log(req.params);
                            if(appointmentRequest.code){
                                res.status(500).json({msg:"Failed to save appointment request due to a server error", error: appointmentRequest})
                            }else{
                                res.status(200).json({msg: "Appointment request saved"})
                            }
                        }
                    }
                }
            }
        }
    }

    static async getAppointmentRequest(req, res){
        const appointmentRequest = await AppointmentRequestModel.getOneAppointmentRequest(req.params.id);
        if(appointmentRequest.code){
            res.status(500).json({msg:"Failed to get appointment request due to a server error", error: appointmentRequest})
        }else{
            res.status(200).json({msg: "Appointment request found", result: appointmentRequest})
        }
    }

    static async getAllEventAppointmentRequest(req, res){
        const appointmentRequests = await AppointmentRequestModel.getAllEventAppointmentRequest(req.params.event_id);
        if(appointmentRequests.code){
            res.status(500).json({msg:"Failed to get appointment request due to a server error", error: appointmentRequests})
        }else{
            if(appointmentRequests.length === 0){
                res.status(400).json({msg : "No appointment request found"})
            }else{
                res.status(200).json({msg: "Appointment request found", result: appointmentRequests})
            }   
        }
    }

    static async getAllUserAppointmentRequest(req, res){
        const appointmentRequests = await AppointmentRequestModel.getAllUserAppointmentRequest(req.params.user_id);
        if(appointmentRequests.code){
            res.status(500).json({msg:"Failed to get appointment request due to a server error", error: appointmentRequests})
        }else{
            if(appointmentRequests.length === 0){
                res.status(400).json({msg : "No appointment request found"})
            }else{
                res.status(200).json({msg: "Appointment request found", result: appointmentRequests})
            }   
        }
    }

    static async getAllSessionAppointmentRequest(req, res){
        const appointmentRequests = await AppointmentRequestModel.getAllSessionAppointmentRequest(req.params.session_id);
        if(appointmentRequests.code){
            res.status(500).json({msg:"Failed to get appointment request due to a server error", error: appointmentRequests})
        }else{
            if(appointmentRequests.length === 0){
                res.status(400).json({msg : "No appointment request found"})
            }else{
                res.status(200).json({msg: "Appointment request found", result: appointmentRequests})
            }   
        }
    }

    static async getAllAppointmentRequest(req, res){
        const appointmentRequests = await AppointmentRequestModel.getAllAppointmentRequest();
        if(appointmentRequests.code){
            res.status(500).json({msg:"Failed to get appointment request due to a server error", error: appointmentRequests})
        }else{
            if(appointmentRequests.length === 0){
                res.status(400).json({msg : "No appointment request found"})
            }else{
                res.status(200).json({msg: "Appointment request found", result: appointmentRequests})
            }   
        }
    }

    static async getAppointmentRequestsCount(req, res){
        const appointmentRequests = await AppointmentRequestModel.getAllAppointmentRequest();
        if(appointmentRequests.code){
            res.status(500).json({msg:"Failed to get appointment request due to a server error", error: appointmentRequests})
        }else{
            if(appointmentRequests.length === 0){
                res.status(400).json({msg : "No appointment request found"})
            }else{
                res.status(200).json({msg: "Appointment request found", result: appointmentRequests.length})
            }   
        }
    }

    static async validateAppointmentRequest(req, res){
        const validate = await AppointmentRequestModel.validateAppointmentRequest(req.params.id, req.body.validate);
        if(validate.code){
            res.status(500).json({msg:"Failed to validate appointment request due to a server error", error: validate})
        }else{
            res.status(200).json({msg:`Appointment request set to ${req.body.validate}`, result: validate})  
        }
    }

    static async updateAppointmentRequest(req, res){
        const updateAppoinmentRequest = await AppointmentRequestModel.updateAppointmentRequest(req, req.params.id);
        if(updateAppoinmentRequest.code){
            res.status(500).json({msg:"Failed to validate appointment request due to a server error", error: updateAppoinmentRequest})
        }else{
            res.status(200).json({msg:`Appointment request updated`, result: updateAppoinmentRequest})  
        }
    }

    static async deleteAppointmentRequest(req, res){
        const deleteAppoinmentRequest = await AppointmentRequestModel.deleteAppointmentRequest(req.params.id);
        if(deleteAppoinmentRequest.code){
            res.status(500).json({msg:"Failed to delete appointment request due to a server error", error: deleteAppoinmentRequest})
        }else{
            res.status(200).json({msg:`Appointment request deleted`})  
        }
    }
}
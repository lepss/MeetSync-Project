module.exports = (_db) => {
    db = _db
    AppointmentRequestModel = require('../models/AppointmentRequestModel')(db);
    return AppointmentRequestController
}

class AppointmentRequestController{
    static async addAppointmentRequest(req, res){
        const appointmentRequest = await AppointmentRequestModel.saveOneAppointmentRequest(req, req.params.appointment_session_id);
        console.log(req.params);
        if(appointmentRequest.code){
            res.status(500).json({msg:"Failed to save appointment request due to a server error", error: appointmentRequest})
        }else{
            res.status(200).json({msg: "Appointment request saved"})
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
        const appointmentRequests = await AppointmentRequestModel.getAllSessionAppointmentRequest(req.params.appointment_session_id);
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

    static async validateAppointmentRequest(req, res){
        const validate = await AppointmentRequestModel.validateAppointmentRequest(req.params.id, req.body.validate);
        if(validate.code){
            res.status(500).json({msg:"Failed to validate appointment request due to a server error", error: validate})
        }else{
            res.status(200).json({msg:`Appointment request set to ${req.body.validate}`, result: validate})  
        }
    }

    static async updateAppointmentRequest(req, res){
        const updateAppoinmentRequest = await AppointmentRequestModel.updateAppointmentRequest(req, req.body.id);
        if(updateAppoinmentRequest.code){
            res.status(500).json({msg:"Failed to validate appointment request due to a server error", error: updateAppoinmentRequest})
        }else{
            res.status(200).json({msg:`Appointment request set to ${req.body.validate}`, result: updateAppoinmentRequest})  
        }
    }

    static async deleteAppointmentRequest(req, res){
        const deleteAppoinmentRequest = await AppointmentRequestModel.updateAppointmentRequest(req.params.id);
        if(deleteAppoinmentRequest.code){
            res.status(500).json({msg:"Failed to delete appointment request due to a server error", error: deleteAppoinmentRequest})
        }else{
            res.status(200).json({msg:`Appointment request deleted`})  
        }
    }
}
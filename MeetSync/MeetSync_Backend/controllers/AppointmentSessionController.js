module.exports = (_db) => {
    db = _db
    AppointmentSessionModel = require('../models/AppointmentSessionModel')(db);
    return AppointmentSessionController
}

class AppointmentSessionController{
    static async addAppointmentSession(req, res){
        const appointmentSession = await AppointmentSessionModel.saveOneAppointmentSession(req, req.params.event_id);
        if(appointmentSession.code){
            res.status(500).json({msg:"Failed to save appointment session due to a server error", error: appointmentSession})
        }else{
            res.status(200).json({msg: "Appointment session saved"})
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
        const deleteAppointmentSession = await deleteAppointmentSession.updateAppointmentSession(req.params.id);
        if(deleteAppointmentSession.code){
            res.status(500).json({msg:"Failed to delete appointment session due to a server error", error: deleteAppointmentSession})
        }else{
            res.status(200).json({msg: "Appointment session deleted", result: deleteAppointmentSession})
        }
    }
}
module.exports = (_db) => {
    db = _db
    AppointmentModel = require('../models/AppointmentModel')(db);
    return AppointmentController
}

class AppointmentController{
    static async generateEventAppointments(req, res){
        //TODO
    } 

    static async saveOneAppointment(req, res){
        const appointment = await AppointmentModel.saveOneAppointment(req); //Todo set appointment object
        if(appointment.code){
            res.status(500).json({msg:"Failed to saved appointment due to a server error", error: appointment})
        }else{
            res.status(200).json({msg: "Appointment saved", result: appointment})
        }
    }

    static async getAllAppointment(req, res){
        const appointments = await AppointmentModel.getAllAppointment();
        if(appointments.code){
            res.status(500).json({msg:"Failed to get appointments due to a server error", error: appointments})
        }else{
            if(appointments.length === 0){
                res.status(400).json({msg : "No appointment found"})
            }else{
                res.status(200).json({msg: "Appointments found", result: appointments})
            }   
        }
    }

    static async getAllEventAppointment(req, res){
        const appointments = await AppointmentModel.getAllEventAppointment(req.params.event_id);
        if(appointments.code){
            res.status(500).json({msg:"Failed to get appointments due to a server error", error: appointments})
        }else{
            if(appointments.length === 0){
                res.status(400).json({msg : "No appointment found"})
            }else{
                res.status(200).json({msg: "Appointments found", result: appointments})
            }   
        }
    }

    static async getAllSessionAppointment(req, res){
        const appointments = await AppointmentModel.getAllSessionAppointment(req.params.appointment_session_id);
        if(appointments.code){
            res.status(500).json({msg:"Failed to get appointments due to a server error", error: appointments})
        }else{
            if(appointments.length === 0){
                res.status(400).json({msg : "No appointment found"})
            }else{
                res.status(200).json({msg: "Appointments found", result: appointments})
            }   
        }
    }

    static async getAllUserAppointment(req, res){
        const appointments = await AppointmentModel.getAllUserAppointment(req.params.user_id);
        if(appointments.code){
            res.status(500).json({msg:"Failed to get appointments due to a server error", error: appointments})
        }else{
            if(appointments.length === 0){
                res.status(400).json({msg : "No appointment found"})
            }else{
                res.status(200).json({msg: "Appointments found", result: appointments})
            }   
        }
    }

    static async getAppointment(req, res){
        const appointment = await AppointmentModel.getOneAppointment(req.params.id);
        if(appointment.code){
            res.status(500).json({msg:"Failed to get appointment due to a server error", error: appointment})
        }else{
            res.status(200).json({msg: "Appointment found", result: appointment})
        }
    }

    static async deleteAppointment(req, res){
        const deleteAppointment = await AppointmentModel.getOneAppointment(req.params.id);
        if(deleteAppointment.code){
            res.status(500).json({msg:"Failed to delete appointment due to a server error", error: deleteAppointment})
        }else{
            res.status(200).json({msg: "Appointment deleted", result: deleteAppointment})
        }
    }
}
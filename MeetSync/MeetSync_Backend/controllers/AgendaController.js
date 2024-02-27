module.exports = (_db) => {
    db = _db
    AgendaModel = require('../models/AgendaModel')(db);
    AppointmentModel = require('../models/AppointmentModel')(db);
    EventModel = require('../models/EventModel')(db);
    AgendaGenerator = require("../service/agendaGenerator")
    return AgendaController
}

class AgendaController{
    static async generateEventAgenda(req, res){
        const event = await AgendaModel.getEventData(req.params.event_id)
        if(event.code){
            res.status(500).json({msg:"Failed to generate agenda due to a server error", error: event})
        }else{
            const sessions = await AgendaModel.getAllEventAppointmentSession(req.params.event_id)
            if(sessions.code){
                res.status(500).json({msg:"Failed to generate agenda due to a server error", error: sessions})
            }else{
                const requests = await AgendaModel.getAllEventAppointmentRequest(req.params.event_id)
                if(requests.code){
                    res.status(500).json({msg:"Failed to generate agenda due to a server error", error: requests})
                }else{
                    let eventData = AgendaController.formatEventData(event)
                    let organizerData = AgendaController.formatSessionData(sessions)
                    let participantData = AgendaController.formatRequestData(requests)
                    const appointmentGenerated = AgendaGenerator.generate(eventData, organizerData, participantData)
                    const appointmentsSaved = await AppointmentModel.saveMultipleAppointments(appointmentGenerated)
                    if(appointmentsSaved.code){
                        res.status(500).json({msg:"Failed to saved agenda due to a server error", error: appointmentsSaved})
                    }else{
                        const validateEventAgendaGeneration = await EventModel.setEventAgendaGenerated(true, req.params.event_id)
                        if(validateEventAgendaGeneration.code){
                            res.status(500).json({msg:"Failed to generate agenda due to a server error", error: validateEventAgendaGeneration})
                        }else{
                            res.status(200).json({msg: "Agenda generated and saved"})
                        }
                    }
                }
            }
        }
    }
    
    static formatEventData(data){
        const eventData = {
            event_id: data[0]?.id, 
            schedule: [],
            default_appointment_duration: data[0]?.appointment_duration,
            default_break_duration: data[0]?.break_duration,
        };
        data.forEach(row => {
            const day = row.start_time.toISOString().split('T')[0]; // Convertit la date en string et extrait la partie date
        
            // Ajouter chaque jour au tableau de schedule
            eventData.schedule.push({
                day: day,
                open_time: row.start_time.toISOString().split('T')[1],
                close_time: row.end_time.toISOString().split('T')[1],
                lunch_start_time: row.lunch_start_time.toISOString().split('T')[1],
                lunch_end_time: row.lunch_end_time.toISOString().split('T')[1],
            });
        })
        return eventData
    }

    static formatSessionData(data){
        const organizeData = data.map(item =>({
            organizer_id: item.user_id,
            appointment_session_id: item.id
        }))
        return organizeData
    }

    static formatRequestData(data){
        const groupedData = data.reduce((acc, { user_id, appointment_session_id, id }) => {
            // Si le user_id n'existe pas déjà dans l'accumulateur, l'initialiser avec un tableau vide
            if (!acc[user_id]) {
              acc[user_id] = [];
            }
            // Ajouter l'appointment_session_id au tableau du user_id correspondant
            acc[user_id].push({
                appointment_session_id: appointment_session_id,
                appointment_request_id: id
            });
            return acc;
          }, {});

          const formattedData = Object.entries(groupedData).map(([participant_id, appointments]) => ({
            participant_id: parseInt(participant_id),
            accepted_appointments: appointments
          }));

        return formattedData
    }
}
import Data from "./data.js"
import { Schedule } from "./schedule.js";
import { MeetingPool } from "./MeetingPool.js";

// Step 1: Collecte des Informations
const organizerData = Data.organizerData[0];
const clientsData = Data.clientData;
const participantsData = Data.participantData;

const schedule = new Schedule(organizerData.schedule, organizerData.default_appointment_duration, organizerData.default_break_duration);
console.table(schedule.getAvailableTimeSlots());
console.log(`Max rdv/pers : ${schedule.getNumberOfAvailableTimeSlots()} | Durée total event : ${schedule.getTotalEventHours()} heures | Temps par rdv + pause ${schedule.appointmentDurartion+schedule.breakDuration } min`);

const meetingPool = new MeetingPool(clientsData, participantsData, schedule.getAvailableTimeSlots());
meetingPool.getClients().forEach(client =>{
    // console.table(client.availableSlots)
})



const scheduler = (clientToSchedule, participantToSchedule) => {
    if(clientToSchedule.length <= 0){
        return
    }else{
        let randomClient = clientToSchedule[Math.floor(Math.random()*clientToSchedule.length)]
        console.log(randomClient);
        if(randomClient.availableSlots.length > 0){
            
            let sessionId = randomClient.data.appointment_session_id
            console.log(sessionId);
            participantToSchedule.map((participant) => console.log(participant.accepted_appointments))
            // let participantsFilter = participantToSchedule.filter(participant => participant.accepted_appointments.includes(sessionId))
            // if(participantFilter){
            //     console.log(participantsFilter);
            //     // randomClient.bookSlots.push(randomClient.availableSlots[0])
            //     // randomClient.availableSlots.shift() 
            // }
        }
    }
}

const clientToSchedule = meetingPool.getClients() 
const participantToSchedule = meetingPool.getParticipants()

scheduler(clientToSchedule, participantToSchedule)
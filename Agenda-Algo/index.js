import Data from "./data.js"
import { Schedule } from "./Schedule.js";
import { MeetingPool } from "./MeetingPool.js";

// Step 1: Collecte des Informations
const organizerData = Data.organizerData[0];
const clientsData = Data.clientData;
const participantsData = Data.participantData;

const schedule = new Schedule(organizerData.schedule, organizerData.default_appointment_duration, organizerData.default_break_duration);
// console.table(schedule.getAvailableTimeSlots());
// console.log(`Max rdv/pers : ${schedule.getNumberOfAvailableTimeSlots()} | Durée total event : ${schedule.getTotalEventHours()} heures | Temps par rdv + pause ${schedule.appointmentDurartion+schedule.breakDuration } min`);

const meetingPool = new MeetingPool(clientsData, participantsData, schedule.getAvailableTimeSlots());
meetingPool.getClients().forEach(client =>{
    // console.table(client.availableSlots)
})

const scheduler = (clientToSchedule, participantToSchedule) => {
    // console.log("Client start", clientToSchedule)
    // console.log("Participant start", participantToSchedule)

    if(participantToSchedule.length <= 0){
        return // Fin de la recursivité
    }else{
        let randomIndexParticipant = Math.floor(Math.random()*participantToSchedule.length)
        let randomParticipant = participantToSchedule[randomIndexParticipant] //Recupere un participant aléatoire
        // console.log("participant start", JSON.parse(JSON.stringify(randomParticipant)));

        if(randomParticipant.data.accepted_appointments.length > 0){ //Si il lui reste des rdv a booker
            if(randomParticipant.availableSlots.length > 0){
                let randomIndexSessionId = Math.floor(Math.random()*randomParticipant.data.accepted_appointments.length)
                let sessionId = randomParticipant.data.accepted_appointments[randomIndexSessionId] // Récupere a rdv a booker aléatoire
                // console.log("Id present", randomParticipant.data.accepted_appointments);
                console.log("Session Id choisie : ", sessionId);


                let clientFilter = clientToSchedule.filter(client => client.data.appointment_session_id === sessionId) //Récupére l'organisateur correspondant au rdv
                console.log("Client id", clientFilter[0].data.appointment_session_id);

                if(clientFilter.length > 0){ // Si il recupére un organisateur
                    if(clientFilter[0].availableSlots.length > 0){ // Si l'organisateur a des slots de rdv disponible
                        const earliestCommonSlot = findEarliestCommonSlot(clientFilter[0].availableSlots, randomParticipant.availableSlots) //Cherche le slot commun le plus tot
                        let findSlot = earliestCommonSlot.date;
                        findSlot.appointment_id = sessionId
                        console.log("ID set", findSlot.appointment_id);
                        // earliestCommonSlot.date.appointment_id = sessionId
                        // console.log("Slot commun trouvé", earliestCommonSlot);

                        if(earliestCommonSlot){
                            randomParticipant.bookSlots.push(findSlot)
                            clientFilter[0].bookSlots.push(findSlot)

                            randomParticipant.availableSlots.splice(earliestCommonSlot.index2, 1)
                            clientFilter[0].availableSlots.splice(earliestCommonSlot.index1, 1)

                            // console.log("Id slot date client", earliestCommonSlot.index1);
                            // console.log("Id slot date participant", earliestCommonSlot.index2);

                            randomParticipant.data.accepted_appointments.splice(randomIndexSessionId, 1)
                            // console.log("Id restant : ", randomParticipant.data.accepted_appointments);
                            // console.log("participant end", JSON.parse(JSON.stringify(randomParticipant)));

                            scheduler(clientToSchedule, participantToSchedule)
                            // console.log("Client end", clientToSchedule)
                            // console.log("Participant end", participantToSchedule)
                        }else{
                            console.log("Erreur, aucun slot commun disponible");
                        }
                    }else{
                        console.log("Erreur, organisteur n'a plus de slots disponible");
                    }
                }else{
                    console.log("Erreur, ne trouve pas d'organisteur correspondant a l'id du rdv");
                }
            }else{
                console.log("Error, participant n'a plus de slot disponible");
            }
        }else{
            participantToSchedule.splice(randomIndexParticipant, 1)
            // console.log("remove participant");
            scheduler(clientToSchedule, participantToSchedule)
            //Sinon retire le participant de la liste
        }
    }
}

const findEarliestCommonSlot = (slots1, slots2) => {
    let i = 0, j = 0;

    while (i < slots1.length && j < slots2.length){
        if(slots1[i].start < slots2[j].start ){
            i++
        }else if(slots1[i].start  > slots2[j].start ){
            j++
        }else{
            return{
                date: slots1[i],
                index1 : i,
                index2: j
            } 
        }
    }
    return null
}

const clientToSchedule = meetingPool.getClients().map(client =>({...client}))
const participantToSchedule = meetingPool.getParticipants().map(participant => ({...participant}))

scheduler(clientToSchedule, participantToSchedule)

// console.log(clientToSchedule)
console.log("Client :", meetingPool.getClients())
// console.log(participantToSchedule)
console.log("particpants :", meetingPool.getParticipants())

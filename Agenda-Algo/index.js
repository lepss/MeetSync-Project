import Data from "./data.js"
import { Schedule } from "./schedule.js";

// Step 1: Collecte des Informations
const organizer = Data.organizerData[0];
const clients = Data.clientData;
const participants = Data.participantData;

const schedule = new Schedule(organizer.schedule, organizer.default_appointment_duration, organizer.default_break_duration);
console.table(schedule.getAvailableTimeSlots());
console.log(`Max rdv/pers : ${schedule.getNumberOfAvailableTimeSlots()} | Durée total event : ${schedule.getTotalEventHours()} heures | Temps par rdv + pause ${schedule.appointmentDurartion+schedule.breakDuration } min`);
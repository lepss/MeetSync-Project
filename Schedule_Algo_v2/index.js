import fakeData from "./fake-data.js";
import { Event } from "./event.js";
import { MeetingPool } from "./meeting-pool.js";

// Step 1: Collecte des Informations
const eventData = fakeData.eventData[0];
const organizersData = fakeData.organizerData;
const participantsData = fakeData.participantData;

// Step 2 : Setup agenda event
const event = new Event(eventData);
const globalEventSchedule = event.generateEventSchedule()
console.table(globalEventSchedule);

// Step 3 : Setup meeting pool
const meetingPool = new MeetingPool(organizersData, participantsData, globalEventSchedule)
const meetingPoolSetup = meetingPool.generateMeetingPool()
const eventAppointments = meetingPoolSetup.appointments
const organizersSetup = meetingPoolSetup.organizers
const participantsSetup = meetingPoolSetup.participants
console.log("All Appointments", eventAppointments);
console.log("Organizers", organizersSetup);
console.log("Participants", participantsSetup); // TODO

// Step 4 : Draw agenda
const test = participantsSetup[1]
const events = []
test.bookSlots.map((appointment, index) => {
    let event = {
        id : index,
        allDay: false,
        start : new Date(appointment.start),
        end : new Date(appointment.end),
        title: `Rdv with ${appointment.participant_id}`,
        editable: false,
        display: "auto"
    }
    events.push(event)
})

let ec = new EventCalendar(document.getElementById('calendar'), {
    view: 'timeGridWeek',
    date: new Date("2023-01-01"),
    slotDuration: "00:30",
    events: events
});
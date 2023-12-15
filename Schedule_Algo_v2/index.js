import fakeData from "./fakeData.js";
import { Event } from "./event.js";
import { MeetingPool } from "./meetingPool.js";
import { FakeDataGenerator } from "./fakeDataGenerator.js";

//Step 0: Génération des fake datas
const fakeDataGenerator = new FakeDataGenerator()

// Step 1: Collecte des Informations
const eventData = fakeData.eventData[0];
// const organizersData = fakeData.organizerData;
const organizersData = fakeDataGenerator.generateOrganizerData(30)
// const participantsData = fakeData.participantData;
const participantsData = fakeDataGenerator.generateParticipantData(10, 25)

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
console.log("Participants", participantsSetup);

// Step 4 : Draw agenda
const test = organizersSetup[0]
const events = []
test.bookSlots.map((appointment, index) => {
    let event = {
        id : index,
        allDay: false,
        start : new Date(appointment.start),
        end : new Date(appointment.end),
        title: `Rdv with ${appointment.organizer_id}`,
        editable: false,
        // display: "auto"
    }
    events.push(event)
})

let ec = new EventCalendar(document.getElementById('calendar'), {
    view: 'timeGridWeek',
    headerToolBar:{
        start: 'prev, next today',
        center: 'title',
        end: 'dayGridMonth, timeGridWeek,timeGridDay,listWeek'
    },
    scrollTime: '08:00:00',
    date: new Date("2023-01-01"),
    slotDuration: "00:30",
    events: events
});
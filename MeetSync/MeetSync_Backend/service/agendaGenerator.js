const Event = require("./class/event")
const MeetingPool = require("./class/meetingPool")

class AgendaGenerator{
    static generate(eventData, organizersData, participantsData){
        //If agenda already generated -> deleted all appointment setup before

        // Step 1 : Setup agenda event
        const event = new Event(eventData);
        const globalEventSchedule = event.generateEventSchedule()
        // console.table(globalEventSchedule);

        // Step 2 : Setup meeting pool
        const meetingPool = new MeetingPool(organizersData, participantsData, globalEventSchedule)
        const meetingPoolSetup = meetingPool.generateMeetingPool()
        const eventAppointments = meetingPoolSetup.appointments
        const organizersSetup = meetingPoolSetup.organizers
        const participantsSetup = meetingPoolSetup.participants
        // console.log("All Appointments", eventAppointments);
        // console.log("Organizers", organizersSetup);
        // console.log("Participants", participantsSetup);

        return eventAppointments
    }
}

module.exports = AgendaGenerator
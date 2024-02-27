const Event = require("./class/event")
const MeetingPool = require("./class/meetingPool")

class AgendaGenerator{
    static generate(eventData, organizersData, participantsData){
        // Step 1 : Setup agenda event
        const event = new Event(eventData);
        const globalEventSchedule = event.generateEventSchedule()

        // Step 2 : Setup meeting pool
        const meetingPool = new MeetingPool(organizersData, participantsData, globalEventSchedule)
        const meetingPoolSetup = meetingPool.generateMeetingPool()
        const eventAppointments = meetingPoolSetup.appointments
        const organizersSetup = meetingPoolSetup.organizers
        const participantsSetup = meetingPoolSetup.participants

        return eventAppointments
    }
}

module.exports = AgendaGenerator
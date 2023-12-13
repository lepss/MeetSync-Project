export class FakeDataGenerator{
    constructor(){

    }

    generateOrganizerData(numberOfOrganizers) {
        const organizers = [];
        for (let i = 1; i <= numberOfOrganizers; i++) {
            organizers.push({
                organizer_id: i,
                appointment_session_id: i * 100
            });
        }
        return organizers;
    }
    
    generateParticipantData(numberOfParticipants, numberOfSessions) {
        const participants = [];
        for (let i = 1; i <= numberOfParticipants; i++) {
            const acceptedAppointments = new Set();
            // Générer un nombre aléatoire de rendez-vous pour chaque participant
            const numAppointments = Math.floor(Math.random() * numberOfSessions) + 1;
            while (acceptedAppointments.size < numAppointments) {
                const sessionId = (Math.floor(Math.random() * numberOfSessions) + 1) * 100;
                acceptedAppointments.add(sessionId);
            }
            participants.push({
                participant_id: i,
                accepted_appointments: Array.from(acceptedAppointments)
            });
        }
        return participants;
    }

}
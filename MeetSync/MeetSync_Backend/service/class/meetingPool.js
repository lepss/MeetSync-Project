class MeetingPool{
    constructor(organizersData, participantsData, eventSchedule){
        this.organizersData = organizersData;
        this.participantsData = participantsData;
        this.eventSchedule = eventSchedule;
    }

    setupMeetingPool(){
        const organizers = [];
        const participants = [];

        this.organizersData.map((organizer) =>{
            let o = {data: organizer, availableSlots: this.eventSchedule.slice(), bookSlots: []}
            organizers.push(o)
        })

        this.participantsData.map((participant) =>{
            let o = {data: participant, availableSlots: this.eventSchedule.slice(), bookSlots: []}
            participants.push(o)
        })

        return {organizers : organizers, participants : participants}
    }

    generateMeetingPool(){
        const meetingPoolSetup = this.setupMeetingPool() //Setup un agenda vide pour tout les participants
        const organizers = JSON.parse(JSON.stringify(meetingPoolSetup.organizers)) //Recupére les agendas des organisateurs
        const participants = JSON.parse(JSON.stringify(meetingPoolSetup.participants)) // Récupére les agendas des participant

        const organizersSetup = JSON.parse(JSON.stringify(organizers)) // Copie des agendas des organisteurs
        const participantsSetup = JSON.parse(JSON.stringify(participants)) // Copie des agendas des participants

        let appointments = []

        while(participants.length > 0){
            let randomIndexParticipant = Math.floor(Math.random()*participants.length)
            let randomParticipant = participants[randomIndexParticipant]
            if(randomParticipant.data.accepted_appointments.length > 0){
                if(randomParticipant.availableSlots.length > 0){
                    let randomIndexSessionId = Math.floor(Math.random()*randomParticipant.data.accepted_appointments.length)
                    let sessionId = randomParticipant.data.accepted_appointments[randomIndexSessionId].appointment_session_id
                    let requestId = randomParticipant.data.accepted_appointments[randomIndexSessionId].appointment_request_id
                    let sessionOrganizer = organizers.filter(organizer => organizer.data.appointment_session_id === sessionId)[0]
                    if(sessionOrganizer !== undefined){
                        if(sessionOrganizer.availableSlots.length > 0){
                            let earliestCommonSlot = this.findEarliestAvailableCommonSlot(sessionOrganizer.availableSlots, randomParticipant.availableSlots)
                            if(earliestCommonSlot){
                                let appointment = {
                                    start: earliestCommonSlot.date.start, 
                                    end: earliestCommonSlot.date.end, 
                                    organizer_id: sessionOrganizer.data.organizer_id, 
                                    participant_id: randomParticipant.data.participant_id, 
                                    appointment_session_id: sessionId,
                                    appointment_request_id: requestId
                                }
                                appointments.push(appointment)

                                randomParticipant.bookSlots.push(appointment)
                                sessionOrganizer.bookSlots.push(appointment)

                                let participantToUpdate = participantsSetup.find(p => p.data.participant_id === randomParticipant.data.participant_id)
                                if(participantToUpdate){
                                    participantToUpdate.bookSlots.push(appointment)
                                    participantToUpdate.availableSlots.splice(earliestCommonSlot.index2, 1)
                                }

                                randomParticipant.availableSlots.splice(earliestCommonSlot.index2, 1)
                                sessionOrganizer.availableSlots.splice(earliestCommonSlot.index1, 1)

                                randomParticipant.data.accepted_appointments.splice(randomIndexSessionId, 1)
                                // console.log("Matching success");
                            }else{
                                // 
                                console.log(`Error, no matching slot find for ${sessionOrganizer} and  ${randomParticipant}`);
                            }
                        }else{
                            // TODO remove accepted_appointment and add appointment to rejected_appointment
                            console.log(`Error, ${sessionOrganizer[0]} doesnt have any avaible slots`);
                        }
                    }else{
                        // TODO remove accepted_appointment and add appointment to rejected_appointment
                        console.log(`Error, ${sessionId} doesnt exist`);
                    }
                }else{
                    // TODO Remove participant and add all appointement left to rejected_appointment
                    console.log(`${randomParticipant} has no available slots`);
                }
            }else{
                participants.splice(randomIndexParticipant, 1)
            }
        }
        return {
            appointments : appointments,
            organizers : organizers, 
            participants : participantsSetup
        }
    }

    findEarliestAvailableCommonSlot = (slots1, slots2) => {
        let i = 0, j = 0;
        // Optimisation -> Tester dans les deux sens si le premier creneau de disponible chez chacun des participant est disponible chez l'autre, afin d'eviter de parcourir tout le tableau
        while (i < slots1.length && j < slots2.length){
            const date1 = new Date(slots1[i].start).getTime()
            const date2 = new Date(slots2[j].start).getTime()
            if(date1 < date2 ){
                i++
            }else if(date1  > date2 ){
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
}

module.exports = MeetingPool
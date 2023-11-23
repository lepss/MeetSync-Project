export class MeetingParticipant{
    constructor(id, availableSlots){
        this.id = id;
        this.availableSlots = availableSlots;
        this.bookSlots = [];
    }
}
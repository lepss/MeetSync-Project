export class MeetingParticipant{
    constructor(data, availableSlots){
        this.data = data;
        this.availableSlots = availableSlots;
        this.bookSlots = [];
    }
}
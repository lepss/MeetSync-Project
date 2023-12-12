import { MeetingParticipant } from "./MeetingParticipant.js";

export class MeetingPool{
    constructor(clientsData, participantsData, availableSlot){
        this.clientsData = clientsData;
        this.participantsData = participantsData;
        this.availableSlot = availableSlot;

        this._generatePool();
    }

    _generatePool(){
        this.clients = [];
        this.participants = [];

        this.clientsData.forEach(client =>{
            let c = {data: client, availableSlots : this.availableSlot.slice(), bookSlots: []}
            // let c = new MeetingParticipant(client, this.availableSlot.slice());
            this.clients.push(c);
        })
        
        this.participantsData.forEach(participant =>{
            let p = {data: participant, availableSlots : this.availableSlot.slice(), bookSlots: []}
            // let p = new MeetingParticipant(participant, this.availableSlot.slice());
            this.participants.push(p);
        })
    }

    getClients(){
        return this.clients;
    }

    getParticipants(){
        return this.participants;
    }
}
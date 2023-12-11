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
            let c = new MeetingParticipant(client, this.availableSlot);
            this.clients.push(c);
        })
        
        this.participantsData.forEach(participant =>{
            let p = new MeetingParticipant(participant, this.availableSlot);
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
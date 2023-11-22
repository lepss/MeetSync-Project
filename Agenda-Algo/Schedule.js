class Schedule{
    constructor(planning, appointmentDurartion, breakDuration){
        this.planning = planning;
        this.appointmentDurartion = appointmentDurartion;
        this.breakDuration = breakDuration;

        this._calculateTotalEventHours();
        this._calculateAvailableTimeSlots();
    }

    _calculateAvailableTimeSlots(){
        this.availableSlots = [];

        this.planning.forEach(day =>{
            const { open_time, close_time, lunch_start_time, lunch_end_time } = day;
            const openTime = new Date(`${day.day} ${open_time}`);
            let currentTime = new Date(openTime);
            let lunchStartTime = new Date(`${day.day} ${lunch_start_time}`)
            let lunchEndTime = new Date(`${day.day} ${lunch_end_time}`)
            let lastTimeToSetSlotBeforeEndingDay = new Date(`${day.day} ${close_time}`)
            lastTimeToSetSlotBeforeEndingDay.setMinutes(lastTimeToSetSlotBeforeEndingDay.getMinutes() - this.appointmentDurartion)
            let lastTimeToSetSlotBeforeLunch = new Date(lunchStartTime)
            lastTimeToSetSlotBeforeLunch.setMinutes(lastTimeToSetSlotBeforeLunch.getMinutes() - this.appointmentDurartion)

            while(currentTime <= lastTimeToSetSlotBeforeEndingDay){
                if(!(currentTime >= lastTimeToSetSlotBeforeLunch && currentTime < lunchEndTime)){
                    const endTime = new Date(currentTime);
                    endTime.setMinutes(endTime.getMinutes() + this.appointmentDurartion);
                    this.availableSlots.push({
                        start: currentTime.toString(),
                        end: endTime.toString(),
                        appointment_id: null, // Aucun rendez-vous assigné initialement
                    });
                    // Passage à la prochaine plage horaire après la pause
                    currentTime.setMinutes(currentTime.getMinutes() + this.appointmentDurartion + this.breakDuration);
                }else{
                    // Passage à la prochaine plage horaire après la pause déjeuner
                    currentTime = new Date(lunchEndTime);
                }
            }
        });
    }

    _calculateTotalEventHours(){
        this.totalHours = 0;

        this.planning.forEach(day => {
            const openTime = new Date(`${day.day} ${day.open_time}`);
            const closeTime = new Date(`${day.day} ${day.close_time}`);
            const hoursDifference = (closeTime - openTime) / (1000 * 60 * 60); // Convertir en heures
            this.totalHours += hoursDifference;
        });
    }

    getTotalEventHours(){
        return this.totalHours;
    }

    getAvailableTimeSlots(){
        return this.availableSlots;
    }

    getNumberOfAvailableTimeSlots(){
        return this.availableSlots.length;
    }
}
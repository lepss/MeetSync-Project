class Event{
    constructor(eventData){
        this.schedule = eventData.schedule
        this.appointmentDuration = eventData.default_appointment_duration
        this.breakDuration = eventData.default_break_duration
    }

    generateEventSchedule(){
        const appointmentSlots = []

        this.schedule.forEach(day =>{
            const { open_time, close_time, lunch_start_time, lunch_end_time } = day;
            const openTime = new Date(`${day.day} ${open_time}`);
            let currentTime = new Date(openTime);
            let lunchStartTime = new Date(`${day.day} ${lunch_start_time}`)
            let lunchEndTime = new Date(`${day.day} ${lunch_end_time}`)
            let lastTimeToSetSlotBeforeEndingDay = new Date(`${day.day} ${close_time}`)
            lastTimeToSetSlotBeforeEndingDay.setMinutes(lastTimeToSetSlotBeforeEndingDay.getMinutes() - this.appointmentDuration)
            let lastTimeToSetSlotBeforeLunch = new Date(lunchStartTime)
            lastTimeToSetSlotBeforeLunch.setMinutes(lastTimeToSetSlotBeforeLunch.getMinutes() - this.appointmentDuration)

            while(currentTime <= lastTimeToSetSlotBeforeEndingDay){
                if(!(currentTime >= lastTimeToSetSlotBeforeLunch && currentTime < lunchEndTime)){
                    const endTime = new Date(currentTime);
                    endTime.setMinutes(endTime.getMinutes() + this.appointmentDuration);
                    appointmentSlots.push({
                        start: currentTime.toString(),
                        end: endTime.toString(),
                        appointment_id: null, // Aucun rendez-vous assigné initialement
                    });
                    // Passage à la prochaine plage horaire après la pause
                    currentTime.setMinutes(currentTime.getMinutes() + this.appointmentDuration + this.breakDuration);
                }else{
                    // Passage à la prochaine plage horaire après la pause déjeuner
                    currentTime = new Date(lunchEndTime);
                }
            }
        });
        return appointmentSlots
    }
}

module.exports = Event
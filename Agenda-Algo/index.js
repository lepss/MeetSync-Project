import Data from "./data.js"

// Step 1: Collecte des Informations
const organizer = Data.organizerData[0];
const clients = Data.clientData;
const participants = Data.participantData;

// Step 2: Définition des Contraintes
const eventConstraints = {
  schedule: organizer.schedule,
  defaultAppointmentDuration: organizer.default_appointment_duration,
  defaultBreakDuration: organizer.default_break_duration,
};

// Step 3: Génération des Plages Horaires Disponibles
const availableTimeSlots = generateAvailableTimeSlots(eventConstraints);
const totalHoursEvent = calculateTotalEventHours(eventConstraints.schedule);
console.table(availableTimeSlots);
console.log(`Max rdv/pers : ${availableTimeSlots.length} | Durée total event : ${totalHoursEvent} heures | Temps par rdv + pause ${eventConstraints.defaultAppointmentDuration+eventConstraints.defaultBreakDuration } min`);

/** FUNCTIONS  **/
function calculateTotalEventHours(schedule) {
  let totalHours = 0;
  schedule.forEach(day => {
      const openTime = new Date(`${day.day} ${day.open_time}`);
      const closeTime = new Date(`${day.day} ${day.close_time}`);
      const hoursDifference = (closeTime - openTime) / (1000 * 60 * 60); // Convertir en heures
      totalHours += hoursDifference;
  });
  return totalHours;
}

function generateAvailableTimeSlots(eventConstraints) {
  const { schedule, defaultAppointmentDuration, defaultBreakDuration } = eventConstraints;

  const availableTimeSlots = [];

  // Parcours de chaque jour dans le calendrier
  schedule.forEach(day => {
    const { open_time, close_time, lunch_start_time, lunch_end_time } = day;

    // Conversion des horaires d'ouverture et de fermeture en objets Date
    const openTime = new Date(`${day.day} ${open_time}`);

    // Création de plages horaires disponibles entre l'heure d'ouverture et de fermeture
    let currentTime = new Date(openTime);
    let lunchStartTime = new Date(`${day.day} ${lunch_start_time}`)
    let lunchEndTime = new Date(`${day.day} ${lunch_end_time}`)

    let lastTimeToSetSlotBeforeEndingDay = new Date(`${day.day} ${close_time}`)
    lastTimeToSetSlotBeforeEndingDay.setMinutes(lastTimeToSetSlotBeforeEndingDay.getMinutes() - defaultAppointmentDuration)

    let lastTimeToSetSlotBeforeLunch = new Date(lunchStartTime)
    lastTimeToSetSlotBeforeLunch.setMinutes(lastTimeToSetSlotBeforeLunch.getMinutes() - defaultAppointmentDuration)

    while (currentTime  <= lastTimeToSetSlotBeforeEndingDay ) {
      // Vérification de l'heure de pause déjeuner
      if (!(currentTime >= lastTimeToSetSlotBeforeLunch && currentTime < lunchEndTime)) {
        // Ajout de la plage horaire disponible
        const endTime = new Date(currentTime);
        endTime.setMinutes(endTime.getMinutes() + defaultAppointmentDuration);
        availableTimeSlots.push({
          start: currentTime.toString(),
          end: endTime.toString(),
          appointment_id: null, // Aucun rendez-vous assigné initialement
        });

        // Passage à la prochaine plage horaire après la pause
        currentTime.setMinutes(currentTime.getMinutes() + defaultAppointmentDuration + defaultBreakDuration);
      } else {
        // Passage à la prochaine plage horaire après la pause déjeuner
        currentTime = new Date(lunchEndTime);
      }
    }
  });

  return availableTimeSlots;
}
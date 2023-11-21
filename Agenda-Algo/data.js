const organizerData = [
    {
      organizer_id: 1,
      schedule: [
        { day: "2023-01-01", open_time: "09:00:00", close_time: "18:00:00", lunch_start_time: "12:00:00", lunch_end_time: "13:00:00" },
        { day: "2023-01-02", open_time: "08:30:00", close_time: "17:30:00", lunch_start_time: "12:30:00", lunch_end_time: "13:30:00" },
        { day: "2023-01-03", open_time: "08:30:00", close_time: "12:30:00", lunch_start_time: "12:30:00", lunch_end_time: "13:30:00" },
        // Ajoutez les jours supplémentaires au besoin
      ],
      default_appointment_duration: 30,
      default_break_duration: 10,
    }
  ];
  
  const clientData = [
    {
      client_id: 1,
      appointment_session_id: 101
    },
    {
      client_id: 2,
      appointment_session_id: 201
    },
    {
      client_id: 3,
      appointment_session_id: 301
    },
    {
      client_id: 4,
      appointment_session_id: 401
    },
    {
      client_id: 5,
      appointment_session_id: 501
    },
    {
      client_id: 6,
      appointment_session_id: 601
    },
    {
      client_id: 7,
      appointment_session_id: 701
    },
    {
      client_id: 8,
      appointment_session_id: 801
    },
    {
      client_id: 9,
      appointment_session_id: 901
    },
    {
      client_id: 10,
      appointment_session_id: 1001
    },
    {
      client_id: 11,
      appointment_session_id: 1101
    },
    {
      client_id: 12,
      appointment_session_id: 1201
    },
  ];
  
  const participantData = [
    {
      participant_id: 1,
      accepted_appointments: [301, 901, 201, 401]
    },
    {
      participant_id: 2,
      accepted_appointments: [1001, 701, 301, 501, 1201, 801, 101, 901, 201, 601]
    },
    {
      participant_id: 3,
      accepted_appointments: [501, 901, 1001, 201, 101, 601, 301]
    },
    {
      participant_id: 4,
      accepted_appointments: [],
    },
    {
      participant_id: 5,
      accepted_appointments: [1001]
    },
    {
      participant_id: 6,
      accepted_appointments: [1101]
    },
    {
      participant_id: 7,
      accepted_appointments: [501, 101, 801, 401, 701, 1201, 1001, 1101, 601, 901]
    },
    {
      participant_id: 8,
      accepted_appointments: [701, 501, 201]
    },
    {
      participant_id: 9,
      accepted_appointments: [901, 701, 301, 1101, 1001, 601, 501, 101]
    },
    {
      participant_id: 10,
      accepted_appointments: [801, 701, 101, 1001, 501]
    },
    {
      participant_id: 11,
      accepted_appointments: [301, 201]
    },
    {
      participant_id: 12,
      accepted_appointments: [1101, 1001, 401, 701, 201, 1201, 501, 901]
    },
  ];
  
  // GENERATION RANDOM ACCEPTED APPOINTMENT
  const getRandomInteger = (min, max) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const generateRandomAcceptedAppointment = () =>{
    const randomChoose = []
    const randomData = []
    const boucle = getRandomInteger(0, clientData.length - 1)
    for(let i = 0; i < boucle; i++){
      let random;
      do{
        random = clientData[Math.floor(Math.random() * clientData.length)].appointment_session_id
      }while(randomChoose.includes(random))
      randomData.push(random);
      randomChoose.push(random);
    }
    console.log(randomData)
    return randomData
  } 
  
  export default {organizerData, clientData, participantData};
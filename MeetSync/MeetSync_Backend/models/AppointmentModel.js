module.exports = (_db) => {
    db = _db
    return AppointmentModel
}

class AppointmentModel{

    static saveOneAppointment(data){
        return db.query(`
        INSERT INTO appointments
        (date_start, date_end, appointment_request_id, appointment_session_id, organizer_id, participant_id)
        VALUES (?, ?, ?, ?, ?, ?)`
        , [data.start, data.end, data.appointment_request_id, data.apointment_session_id, data.organizer_id, data.participant_id]) 
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
    }

    static saveMultipleAppointments(datas){
        const values = datas.map(data => [
            new Date(data.start),
            new Date(data.end),
            data.appointment_request_id,
            data.appointment_session_id,
            data.organizer_id,
            data.participant_id
        ]);

        return db.query(`
        INSERT INTO appointments
        (date_start, date_end, appointment_request_id, appointment_session_id, organizer_id, participant_id)
        VALUES ?`
        , [values]) 
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
    }

    static getAllAppointment(){
        return db.query (`
        SELECT *
        FROM appointments
        `, [])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static getAllEventAppointment(event_id){
        return db.query(`
        SELECT app.id, app.date_start, app.date_end, app.appointment_request_id, app.appointment_session_id, app.organizer_id, app.participant_id
        FROM appointments app
        JOIN appointment_sessions ass ON app.appointment_session_id = ass.id
        WHERE ass.event_id = ?
        `, [event_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static getAllSessionAppointment(appointment_session_id){
        return db.query (`
        SELECT *
        FROM appointments
        WHERE appointment_session_id = ?
        `, [appointment_session_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static getAllUserAppointment(user_id){
        return db.query(`
        SELECT *
        FROM appointments 
        WHERE organizer_id = ? OR participant_id = ?
        `, [user_id, user_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static getOneAppointment(id){
        return db.query (`
        SELECT *
        FROM appointments
        WHERE id = ?
        `, [id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static deleteAppointment(id){
        return db.query (`
        DELETE FROM appointments
        WHERE id = ?
        `, [id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static deleteAllAppointmentInEvent(event_id){
        return db.query (`
        DELETE FROM appointments
        WHERE appointment_session_id IN (
            SELECT id
            FROM appointment_sessions
            WHERE event_id = ?
        )
        `, [event_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }
}
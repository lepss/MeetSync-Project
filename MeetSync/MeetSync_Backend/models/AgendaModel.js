module.exports = (_db) => {
    db = _db
    return AgendaModel
}

class AgendaModel{
    static getEventData(event_id){
        return db.query (`
        SELECT e.id, e.appointment_duration, e.break_duration, ed.start_time, ed.end_time, ed.lunch_start_time, ed.lunch_end_time
        FROM events e
        JOIN event_days ed ON e.id = ed.event_id
        WHERE e.id = ?
        `, [event_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static getAllEventAppointmentSession(event_id){
        return db.query (`
        SELECT id, user_id
        FROM appointment_sessions
        WHERE event_id = ?
        `, [event_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static getAllEventAppointmentRequest(event_id){
        return db.query (`
        SELECT ar.user_id, ar.appointment_session_id, ar.id
        FROM appointment_requests ar
        JOIN appointment_sessions ass ON ar.appointment_session_id = ass.id
        WHERE ar.accepted_status = 'accepted'
        AND ass.event_id = ?
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
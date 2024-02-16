module.exports = (_db) => {
    db = _db
    return AppointmentSessionModel
}

class AppointmentSessionModel{
    static saveOneAppointmentSession(req, event_id){
        return db.query(`
        INSERT INTO appointment_sessions
        (description, created_at, event_id, user_id, user_key_id)
        VALUES (?, NOW(), ?, ?, ?)`
        , [req.body.description, event_id, req.body.user_id, req.body.user_key_id])
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
    }

    static getAllEventAppointmentSession(event_id){
        return db.query (`
        SELECT *
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

    static getAllUserAppointmentSession(user_id){
        return db.query (`
        SELECT *
        FROM appointment_sessions
        WHERE user_id = ?
        `, [user_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static getOneAppointmentSession(id){
        return db.query (`
        SELECT *
        FROM appointment_sessions
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

    static updateAppointmentSession(req, id){
        return db.query(`
        UPDATE appointment_sessions
        description = ?
        WHERE id = ?`
        , [req.body.description, id])
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
    }

    static getUserAppointmentSessionInEvent(user_id, event_id){
        return db.query (`
        SELECT *
        FROM appointment_sessions
        WHERE event_id = ? AND user_id = ?
        `, [event_id, user_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static getEventIdOfAppointmentSession(session_id){
        return db.query(`
        SELECT event_id
        FROM appointment_sessions
        WHERE id = ?
        `, [session_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static deleteAppointmentSession(id){
        return db.query (`
        DELETE FROM appointment_sessions
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
}
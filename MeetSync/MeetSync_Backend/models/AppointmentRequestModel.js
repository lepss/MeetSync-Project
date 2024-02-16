module.exports = (_db) => {
    db = _db
    return AppointmentRequestModel
}

class AppointmentRequestModel{

    static saveOneAppointmentRequest(req, appointmentSessionId){
        return db.query(`
        INSERT INTO appointment_requests
        (request, created_at, accepted_status, user_id, user_key_id, appointment_session_id)
        VALUES (?, NOW(), "pending", ?, ?, ?)`
        , [req.body.request, req.body.user_id, req.body.user_key_id, appointmentSessionId])
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
    }

    static getAllEventAppointmentRequest(event_id){
        //TODO inner join sql
    }

    static getAllSessionAppointmentRequest(appointment_session_id){
        return db.query (`
        SELECT *
        FROM appointment_requests
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

    static getAllUserAppointmentRequest(user_id){
        return db.query (`
        SELECT *
        FROM appointment_requests
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

    static getOneAppointmentRequest(id){
        return db.query (`
        SELECT *
        FROM appointment_requests
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

    static validateAppointmentRequest(id, validate){
        return db.query(`
        UPDATE appointment_requests
        SET accepted_status = ?
        WHERE id = ?`
        , [validate, id])
        .then((res)=>{
            return res
        })
        .catch((err) => {
            console.log(err);
            return err
        })
    }

    static updateAppointmentRequest(req, id){
        return db.query(`
        UPDATE appointment_requests
        SET request = ?
        WHERE id = ?`
        , [req.body.request, id])
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
    }

    static getUserAppointmentRequestInEvent(user_id, event_id){
        return db.query (`
        SELECT *
        FROM appointment_requests ar
        JOIN appointment_sessions ass ON ar.appointment_session_id = ass.id
        WHERE ass.event_id = ? AND ar.user_id = ?
        `, [event_id, user_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    
    static getUserAppointmentRequestInSession(user_id, session_id){
        return db.query (`
        SELECT *
        FROM appointment_requests
        WHERE user_id = ? AND appointment_session_id = ?
        `, [user_id, session_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static deleteAppointmentRequest(id){
        return db.query (`
        DELETE FROM appointment_requests
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
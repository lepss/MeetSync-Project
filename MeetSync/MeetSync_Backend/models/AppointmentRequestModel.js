module.exports = (_db) => {
    db = _db
    return AppointmentRequestModel
}

class AppointmentRequestModel{
    /**
     * Save one appointment request in an appointment session
     * @param {request} req 
     */
    static saveOneAppointmentRequest(req){
        return db.query(`
        INSERT INTO appointment_requests
        (request, created_at, accepted_status, user_id, appointment_session_id)
        VALUES (?, NOW(), "pending" ?, ?)`
        , [req.body.request, req.body.user_id, req.body.appointment_session_id])
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
    }

    static getAllEventAppointmentRequest(event_id){
        return db.query (`
        SELECT *
        FROM appointment_requests
        WHERE 
        `, [])// TODO INNER JOIN
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
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

    static getAllUserAppointmentRequest(user_key_id){

    }

    static getOneAppointmentRequest(id){

    }

    static validateAppointmentRequest(id, validate){

    }

    static updateAppointmentRequest(id){

    }

    static deleteAppointmentRequest(id){
        
    }
}
module.exports = (_db) => {
    db = _db
    return AppointmentSessionModel
}

class AppointmentSessionModel{
    static saveOneAppointmentSession(req){
        return db.query(`
        INSERT INTO appointment_sessions
        (description, created_at, event_id, user_id)
        VALUES (?, NOW(), ?, ?)`
        , [req.body.description, req.body.event_id, req.body.user_id])
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

    static deleteAppointmentSession(id){
        //TODO delete with request / appointment if exist
    }
}
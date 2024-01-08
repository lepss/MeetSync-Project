module.exports = (_db) => {
    db = _db
    return AppointmentModel
}

class AppointmentModel{

    static saveOneAppointment(req){
        return db.query(`
        INSERT INTO appointments
        (date_start, date_end, appointment_request_id, appointment_session_id)
        VALUES (?, ?, ?, ?)`
        , [req.body.request, req.body.user_id, req.body.appointment_session_id]) //TODO correction
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
        //TODO Query with inner join
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
        //TODO Query with inner join on appointment_request
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
        //TODO delete 
    }
}
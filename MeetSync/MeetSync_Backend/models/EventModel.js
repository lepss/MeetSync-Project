module.exports = (_db) => {
    db = _db
    return EventModel
}

class EventModel{
    static saveOneEvent(req){
        return db.query(`
        INSERT INTO events
        (name, description, appointment_duration, break_duration, created_at, event_image_url, user_id, location)
        VALUES (?, ?, ?, ?, NOW(), ?, ?, ?)`,
        [req.body.name, req.body.description, req.body.appointment_duration, req.body.break_duration, req.body.event_image_url, req.body.user_id, req.body.location])
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
    }

    static getAllEvent(){
        return db.query (`
        SELECT *
        FROM events
        `, [])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static getAllUserEvent(user_id){
        return db.query (`
        SELECT *
        FROM events
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

    static getOneEvent(id){
        return db.query (`
        SELECT *
        FROM events
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

    static updateEvent(req, id){
        return db.query (`
        UPDATE events
        SET name = ?, description = ?, location = ?, appointment_duration = ?, break_duration = ?, event_image_url = ?
        WHERE id = ?
        `, [req.body.name, req.body.description, req.body.location, req.body.appointment_duration, req.body.break_duration, req.body.event_image_url, id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static setEventAgendaGenerated(agenda_generated, id){
        return db.query (`
        UPDATE events
        SET agenda_generated = ?
        WHERE id = ?
        `, [agenda_generated, id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static updateEventPict(img_url, id){
        return db.query (`
        UPDATE events
        SET event_image_url = ?
        WHERE id = ?
        `, [img_url, id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static deleteEvent(id){
        return db.query (`
        DELETE FROM events
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
module.exports = (_db) => {
    db = _db
    return EventDayModel
}

class EventDayModel{
    static saveOneEventDay(res){
        return db.query(`
        INSERT INTO event_days
        (start_time, end_time, lunch_start_time, lunch_end_time, event_id)
        VALUES (?, ?, ?, ?, ?)`
        , [req.body.start_time, req.body.end_time, req.body.lunch_start_time, req.body.lunch_end_time, req.body.event_id])
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
    }

    static getAllEventDay(event_id){
        return db.query (`
        SELECT *
        FROM event_days
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

    static getOneEventDay(id){
        return db.query (`
        SELECT *
        FROM event_days
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

    static updateEventDay(req, id){
        return db.query(`
        UPDATE event_days
        SET start_time = ?, end_time = ?, lunch_start_time = ?, lunch_end_time = ?
        WHERE id = ?`
        , [req.body.start_time, req.body.end_time, req.body.lunch_start_time, req.body.lunch_end_time, id])
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
    }   

    static deleteEventDay(id){
        //TODO delete 
    }
}
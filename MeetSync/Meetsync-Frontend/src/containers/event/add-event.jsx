import {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { addOneEvent, addEventDay } from "../../api/event";
import { useSelector } from "react-redux"
import { selectUser } from "../../slices/userSlice"
import moment from "moment"
import "moment/locale/fr";
moment.locale("fr");

const AddEvent = () =>{

    const user = useSelector(selectUser)
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm()
    const [dates, setDates] = useState([{ 
        id: Date.now(),
        date : '', 
        start_time: '', 
        end_time: '', 
        lunch_start_time: '', 
        lunch_end_time: '' 
    }]);

    const onSubmit = (data) =>{
        data.user_id = user.infos.id
        addOneEvent(data)
        .then((res)=>{
            if(res.status === 200){
                dates.map((date) =>{
                    const newDate = {
                        event_id: res.data.insertId,
                        start_time: new Date(date.date + 'T' + date.start_time),
                        end_time: new Date(date.date + 'T' + date.end_time),
                        lunch_start_time: new Date(date.date + 'T' + date.lunch_start_time),
                        lunch_end_time: new Date(date.date + 'T' + date.lunch_end_time)
                    }
                    addEventDay(newDate)
                    .then((res)=>{
                        if(res.status === 200){
                            console.log("Event day saved");
                        }else{
                            setError(res.response.data.msg);
                        }
                    })
                    .catch(err=>console.log(err))
                })
                setRedirect(true);
            }else{
                setError(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    const addDateInput = (e) =>{
        e.preventDefault();
        const newDate = {
            id: Date.now(),
            date : '', 
            start_time: '', 
            end_time: '', 
            lunch_start_time: '', 
            lunch_end_time: '' 
        }
        setDates([...dates, newDate]);
    }
    const deleteDateInput = (e, id) => {
        e.preventDefault();
        setDates(dates.filter(date => date.id !== id));
    }
    const handleChange = (id, field, value) =>{
        setDates(dates.map(date => date.id === id ? { ...date, [field]: value } : date));
    }

    if(redirect){
        return <Navigate to="/event" />
    }

    return(
        <section className="section form">
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <h3 className="sub-content-title">Add your own event</h3>
                        {error !== null && <p className="form-error">{error}</p>}
                        <form onSubmit={handleSubmit(onSubmit)} id="event-form">
                            <div className="sub-group">
                            <input className="form-input" type="file" placeholder="Event Image" name="event_image" {...register("event_image")} />
                                {/* TODO image input */}
                            </div>
                            <div className="sub-group">
                                <input className="form-input" type="text" placeholder="Event Name" name="name" {...register("name")} />
                            </div>
                            <div className="sub-group">
                                <input className="form-input" type="text" placeholder="Location" name="location" {...register("location")} />
                            </div>
                            <div className="sub-group">
                                {dates.map((date, index) => (
                                    <div key={date.id}>
                                    <label>Date {index + 1}:</label>
                                    <input
                                        type="date"
                                        value={date.date}
                                        onChange={(e) => handleChange(date.id, 'date', e.target.value)}
                                    />
                                    <input
                                        type="time"
                                        value={date.start_time}
                                        onChange={(e) => handleChange(date.id, 'start_time', e.target.value)}
                                    />
                                    <input
                                        type="time"
                                        value={date.end_time}
                                        onChange={(e) => handleChange(date.id, 'end_time', e.target.value)}
                                    />
                                    <label>Lunch break:</label>
                                    <input
                                        type="time"
                                        value={date.lunch_start_time}
                                        onChange={(e) => handleChange(date.id, 'lunch_start_time', e.target.value)}
                                    />
                                    <input
                                        type="time"
                                        value={date.lunch_end_time}
                                        onChange={(e) => handleChange(date.id, 'lunch_end_time', e.target.value)}
                                    />
                                    <button type="button" onClick={(e) => deleteDateInput(e, date.id)}>Delete</button>
                                    </div>
                                ))}
                                <button onClick={addDateInput}>Add Day</button>
                            </div>
                            <div className="sub-group">
                                <textarea name="description" id="" cols="50" rows="5" placeholder="Event Description" {...register("description")}>
                                </textarea>
                            </div>
                            <div className="sub-group">
                                <input className="form-input" type="number" placeholder="Appointment Duration" name="appointment_duration" {...register("appointment_duration")} />
                            </div>
                            <div className="sub-group">
                                <input className="form-input" type="number" placeholder="Break Duration" name="break_duration" {...register("break_duration")} />
                            </div>
                            <div className="sub-group">
                                <input type="submit" name="submit" id="event-submit" className="button" value="Create Event"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddEvent
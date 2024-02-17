import { useState } from "react"
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
        formState: {errors}
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
                                <label htmlFor="event_image" className="text-label">Event image</label>
                                <input className="form-input" type="file" placeholder="Event Image" name="event_image" id="event_image" {...register("event_image")} />
                                {/* TODO image input */}
                            </div>
                            <div className="sub-group">
                                <label htmlFor="name" className="text-label">Event name</label>
                                <input className="form-input" type="text" placeholder="Event Name" name="name" id="name" 
                                    {...register("name", {
                                        required: "This field is required"
                                    })} 
                                />
                            </div>
                            {errors.name && <p className="form-error">{errors.name.message}</p>}
                            <div className="sub-group">
                                <label htmlFor="location" className="text-label">Location</label>
                                <input className="form-input" type="text" placeholder="Location" name="location" id="location" 
                                    {...register("location", {
                                        required: "This field is required"
                                    })} 
                                />
                            </div>
                            {errors.location && <p className="form-error">{errors.location.message}</p>}
                            <div className="sub-group">
                                <label htmlFor="" className="text-label">Event days configuration</label>
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
                                <label htmlFor="description" className="text-label">Event description</label>
                                <textarea name="description" id="description" cols="50" rows="5" placeholder="Event Description" 
                                    {...register("description", {
                                        required: "This field is required"
                                    })}
                                >
                                </textarea>
                            </div>
                            {errors.description && <p className="form-error">{errors.description.message}</p>}
                            <div className="sub-group">
                                <label htmlFor="appointment_duration" className="text-label">Appointment duration</label>
                                <input className="form-input" type="number" placeholder="Appointment Duration" name="appointment_duration" id="appointment_duration" 
                                    {...register("appointment_duration", {
                                        required: "This field is required"
                                    })} 
                                />
                            </div>
                            {errors.appointment_duration && <p className="form-error">{errors.appointment_duration.message}</p>}
                            <div className="sub-group">
                                <label htmlFor="break_duration" className="text-label">Break duration</label>
                                <input className="form-input" type="number" placeholder="Break Duration" name="break_duration" id="break_duration" 
                                    {...register("break_duration", {
                                        required: "This field is required"
                                    })} 
                                />
                            </div>
                            {errors.break_duration && <p className="form-error">{errors.break_duration.message}</p>}
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
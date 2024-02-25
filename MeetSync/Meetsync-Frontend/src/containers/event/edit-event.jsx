import { useParams } from "react-router-dom";
import {useState, useEffect} from "react"
import { Navigate } from "react-router-dom"
import { updateEvent, loadOneEvent, getEventDays } from "../../api/event";
import { useForm } from "react-hook-form"

const EditEvent = () => {
    const params = useParams()
    const [redirect, setRedirect] = useState(null)
    const [error, setError] = useState(null)
    const [event, setEvent] = useState({})
    const [eventDays, setEventDays] = useState([{}])
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = (data) =>{
        updateEvent(data, params.event_id)
        .then((res)=>{
            if(res.status === 200){
                console.log("Event updated");
                setRedirect(true);
            }else{
                setError(res.response.data.msg)
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        if(isNaN(parseInt(params.event_id))){
            setRedirect(true);
        }

        let isMounted = true;
        const fetchData = () => {
            loadOneEvent(params.event_id)
            .then((res) => {
                if(res.status === 200 && isMounted){
                    setEvent(res.data.result[0])
                    getEventDays(params.event_id)
                    .then((dayRes)=>{
                        if(res.status === 200 && isMounted){
                            setEventDays(dayRes.data.result)
                        }
                    })
                    .catch((dayErr) => console.log(dayErr));
                }
            })
            .catch((err) => console.log(err));
        }
        fetchData();
        return () => {
            isMounted = false;
        }
        
    }, [params.event_id])

    if(redirect){
        return <Navigate to={`/dashboard` }/>
    }

    return(
        <section className="section form">
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <h3 className="sub-content-title">Edit event</h3>
                        {error !== null && <p className="form-error">{error}</p>}
                        <form onSubmit={handleSubmit(onSubmit)} id="event-form">
                            <div className="sub-group">
                                <label htmlFor="event_image_url" className="text-label">Event image</label>
                                <input className="form-input" type="file" placeholder="Event Image" name="event_image_url" {...register("event_image_url")} />
                            </div>
                            <div className="sub-group">
                                <label htmlFor="name" className="text-label">Event name</label>
                                <input className="form-input" type="text" defaultValue={event.name} placeholder="Event Name" name="name" id="name" 
                                {...register("name", {
                                    required: "This field is required"
                                })} 
                                />
                            </div>
                            {errors.name && <p className="form-error">{errors.name.message}</p>}
                            <div className="sub-group">
                                <label htmlFor="location" className="text-label">Location</label>
                                <input className="form-input" type="text" defaultValue={event.location} placeholder="Location" name="location" id="location"
                                {...register("location",{
                                    required: "This field is required"
                                })} 
                                />
                            </div>
                            {errors.location && <p className="form-error">{errors.location.message}</p>}
                            {/* <div className="sub-group">
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
                            </div> */}
                            <div className="sub-group">
                                <label htmlFor="description" className="text-label">Event description</label>
                                <textarea name="description" id="description" cols="50" rows="5" defaultValue={event.description} placeholder="Event Description"
                                    {...register("description", {
                                        required: "This field is required"
                                    })}
                                >
                                </textarea>
                            </div>
                            {errors.description && <p className="form-error">{errors.description.message}</p>}
                            <div className="sub-group">
                                <label htmlFor="appointment_duration" className="text-label">Appointment duration</label>
                                <input className="form-input" type="number" defaultValue={event.appointment_duration} placeholder="Appointment Duration" name="appointment_duration" id="appointment_duration" 
                                    {...register("appointment_duration", {
                                        required: "This field is required"
                                    })} 
                                />
                            </div>
                            {errors.appointment_duration && <p className="form-error">{errors.appointment_duration.message}</p>}
                            <div className="sub-group">
                                <label htmlFor="break_duration" className="text-label">Break duration</label>
                                <input className="form-input" type="number" defaultValue={event.break_duration} placeholder="Break Duration" name="break_duration" id="break_duration" 
                                    {...register("break_duration", {
                                        required: "This field is required"
                                    })} 
                                />
                            </div>
                            {errors.break_duration && <p className="form-error">{errors.break_duration.message}</p>}
                            <div className="sub-group">
                                <input type="submit" name="submit" id="event-submit" className="button" value="Edit Event"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditEvent;
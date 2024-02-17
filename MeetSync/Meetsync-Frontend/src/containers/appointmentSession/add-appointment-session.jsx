import {useState} from "react"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { addAppointmentSession } from "../../api/appointmentSession"
import {useSelector} from "react-redux"
import { selectUser } from "../../slices/userSlice"

const AddAppointmentSession = () =>{
    
    const user = useSelector(selectUser);
    const params = useParams();
    const [redirect, setRedirect] = useState(null)
    const [error, setError] = useState(null)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmit = (data) =>{
        data.event_id = params.event_id
        data.user_id = user.infos.id
        data.user_key_id = user.infos.key_id
        addAppointmentSession(data, params.event_id)
        .then((res)=>{
            if(res.status === 200){
                console.log("Sesion added");
                setRedirect(true);
            }else{
                setError(res.response.data.msg)
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    if(redirect){
        return <Navigate to={`/appointmentSessions/${params.event_id}` }/>
    }

    return(
        <section className="section form">
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <h3 className="sub-content-title">Add Appointment Session</h3>
                        {error !== null && <p className="form-error">{error}</p>}
                        <form onSubmit={handleSubmit(onSubmit)} id="session-form">
                            <div className="sub-group">
                                <label htmlFor="description" className="text-label">Session description</label>
                                <input className="form-input" type="text" placeholder="Session description" name="description" id="description" 
                                    {...register("description", {
                                        required: "This field is required"
                                    })} 
                                />
                            </div>
                            {errors.description && <p className="form-error">{errors.description.message}</p>}
                            <div className="sub-group">
                                <input type="submit" name="submit" id="session-submit" className="button" value="Create Session"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddAppointmentSession
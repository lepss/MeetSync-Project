import {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { addAppointmentRequest } from "../../api/appointmentRequest";
import { loadOneAppointmentSession } from "../../api/appointmentSession";
import {useSelector} from "react-redux"
import { selectUser } from "../../slices/userSlice"

const AddAppointmentRequest= () =>{
    const user = useSelector(selectUser);
    const params = useParams();
    const [redirect, setRedirect] = useState(null)
    const [error, setError] = useState(null)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()
    const [appointmentSession, setAppointmentSession] = useState(null)

    useEffect(()=>{
        loadOneAppointmentSession(params.session_id)
        .then((res)=>{
            if(res.status === 200){
                setAppointmentSession(res.data.result[0])
            }else{
                setError(res.response.data.msg);
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }, [])

    const onSubmit = (data) =>{
        data.user_id = user.infos.id
        data.user_key_id = user.infos.key_id
        addAppointmentRequest(data, params.session_id)
        .then((res)=>{
            if(res.status === 200){
                console.log("Request added");
                setRedirect(true);
            }else{
                setError(res.response.data.msg)
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    if(redirect){
        return <Navigate to={`/dashboard` }/>
    }

    return(
        <section className="section form">
            <div className="container">
                <div className="content">
                    {appointmentSession !== null &&
                        <div className="sub-content">
                            <h3 className="sub-content-title">Join {appointmentSession.description}</h3>
                            {error !== null && <p className="form-error">{error}</p>}
                            <form onSubmit={handleSubmit(onSubmit)} id="session-form">
                                <div className="sub-group">
                                    <label htmlFor="request" className="text-label">Request</label>
                                    <input className="form-input" type="text" placeholder="Session Request" name="request" id="request" 
                                        {...register("request", {
                                            required: "This field is required"
                                        })} 
                                    />
                                </div>
                                {errors.request && <p className="form-error">{errors.request.message}</p>}
                                <div className="sub-group">
                                    <input type="submit" name="submit" id="request-submit" className="button" value="Request Session"/>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default AddAppointmentRequest
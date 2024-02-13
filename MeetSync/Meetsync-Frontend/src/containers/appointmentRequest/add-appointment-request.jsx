import {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom";
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
        watch
    } = useForm()
    const [appointmentSession, setAppointmentSession] = useState(null)

    useEffect(()=>{
        loadOneAppointmentSession(params.session_id)
        .then((res)=>{
            if(res.status === 200){
                setAppointmentSession(res.data.result[0])
            }else{
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
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    if(redirect){
        return <Navigate to={`/dashboard` }/>
    }

    return(
        <section className="section">
            <div className="container">
                <div className="content">
                    {appointmentSession !== null &&
                        <div className="sub-content">
                            <h3 className="sub-content-title">Join {appointmentSession.description}</h3>
                            {error !== null && <p className="form-error">{error}</p>}
                            <form onSubmit={handleSubmit(onSubmit)} id="session-form">
                                <div className="sub-group">
                                    <input className="form-input" type="text" placeholder="Session Request" name="request" {...register("request")} />
                                </div>
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
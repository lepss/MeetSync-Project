import { useParams } from "react-router-dom";
import {useState, useEffect} from "react"
import { Navigate } from "react-router-dom"
import { updateOneAppointmentSession, loadOneAppointmentSession } from "../../api/appointmentSession";
import { useForm } from "react-hook-form"

const EditAppointmentSession = () => {
    const params = useParams()
    const [redirect, setRedirect] = useState(null)
    const [error, setError] = useState(null)
    const [session, setSession] = useState(null)
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = (data) =>{
        updateOneAppointmentSession(params.session_id, data)
        .then((res)=>{
            if(res.status === 200){
                console.log("Session updated");
                setRedirect(true);
            }else{
                setError(res.response.data.msg)
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        if(isNaN(parseInt(params.session_id))){
            setRedirect(true);
        }
        loadOneAppointmentSession(params.session_id)
        .then((res) => {
            setSession(res.data.result[0])
        })
        .catch((err) => console.log(err));
    }, [])

    if(redirect){
        return <Navigate to={`/dashboard` }/>
    }

    return(
        <section className="section form">
            <div className="container">
                <div className="content">
                    {session !== null &&
                        <div className="sub-content">
                            <h3 className="sub-content-title">Edit session</h3>
                            {error !== null && <p className="form-error">{error}</p>}
                            <form onSubmit={handleSubmit(onSubmit)} id="session-form">
                                <div className="sub-group">
                                    <label htmlFor="description" className="text-label">Session description</label>
                                    <input className="form-input" type="text" defaultValue={session.description} placeholder="Session description" name="description" id="description" 
                                        {...register("description" , {
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
                    }
                </div>
            </div>
        </section>
    )
}

export default EditAppointmentSession
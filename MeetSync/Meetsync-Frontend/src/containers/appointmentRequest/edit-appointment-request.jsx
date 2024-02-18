import { useParams } from "react-router-dom";
import {useState, useEffect} from "react"
import { Navigate } from "react-router-dom"
import { updateOneAppointmentRequest, loadOneAppointmentRequest } from "../../api/appointmentRequest";
import { useForm } from "react-hook-form"

const EditAppointmentRequest = () =>{
    const params = useParams()
    const [redirect, setRedirect] = useState(null)
    const [error, setError] = useState(null)
    const [request, setRequest] = useState({})
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = (data) =>{
        updateOneAppointmentRequest(params.request_id, data)
        .then((res)=>{
            if(res.status === 200){
                console.log("Request updated");
                setRedirect(true);
            }else{
                setError(res.response.data.msg)
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        if(isNaN(parseInt(params.request_id))){
            setRedirect(true);
        }

        let isMounted = true;
        const fetchData = () => {
            loadOneAppointmentRequest(params.request_id)
            .then((res) => {
                if(res.status === 200 && isMounted){
                    setRequest(res.data.result[0])
                } 
            })
            .catch((err) => console.log(err));
        }
        fetchData();
        return () => {
            isMounted = false;
        }
    }, [params.request_id])

    if(redirect){
        return <Navigate to={`/dashboard` }/>
    }

    return(
        <section className="section form">
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <h3 className="sub-content-title">Edit request</h3>
                        {error !== null && <p className="form-error">{error}</p>}
                        <form onSubmit={handleSubmit(onSubmit)} id="request-form">
                            <div className="sub-group">
                                <label htmlFor="request" className="text-label">Request</label>
                                <input className="form-input" type="text" defaultValue={request.request} placeholder="Session Request" name="request" id="request"
                                    {...register("request", {
                                        required: "This field is required"
                                    })} 
                                />
                            </div>
                            {errors.request && <p className="form-error">{errors.request.message}</p>}
                            <div className="sub-group">
                                <input type="submit" name="submit" id="request-submit" className="button" value="Edit Request"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditAppointmentRequest
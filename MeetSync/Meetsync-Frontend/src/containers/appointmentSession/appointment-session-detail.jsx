import {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom";
import { loadOneAppointmentSession } from "../../api/appointmentSession";
import { loadOneUser } from "../../api/user";
import moment from "moment";

const AppointmentSessionDetail = () =>{
    const params = useParams();
    const [appointmentSession, setAppointmentSession] = useState({})
    const [user, setUser] = useState({})

    useEffect(()=>{
        let isMounted = true;
        const fetchData = () => {
            loadOneAppointmentSession(params.session_id)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setAppointmentSession(res.data.result[0])
                    loadOneUser(res.data.result[0].user_key_id)
                    .then((res)=>{
                        if(res.status === 200 && isMounted){
                            setUser(res.data.user)
                        }
                    })
                    .catch(err=>console.log(err))
                }
            })
            .catch(err=>console.log(err))
        }
        fetchData();
        return () => {
            isMounted = false;
        }

    }, [params.session_id])

    return(
        <section className="section session-detail">
            <h2 className="section-title">Appointment Session detail</h2>
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        {/* <h3 className="sub-content-title">Sub Content Title</h3> */}
                        <div className="sub-group">
                            <p>{appointmentSession.description}</p>
                            <p>Created at {moment(appointmentSession.created_at).format("LLL")}</p>
                            <p>Organize by {user.username}</p>
                            <Link to={`/addAppointmentRequest/${params.session_id}`}>
                                <button className="button">Join Session</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AppointmentSessionDetail
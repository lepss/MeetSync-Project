import {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom";
import { loadAllEventAppointmentSession } from "../../api/appointmentSession";
import { loadOneEvent } from "../../api/event";
import AppointmentSessionListItem from "../../components/appointment-session/appointment-session-list-item";

const AppointmentSessionList = () =>{
    const params = useParams();
    const [appointmentSessions, setAppointmentSessions] = useState([]);
    const [event, setEvent] = useState(null);

    useEffect(()=>{
        loadAllEventAppointmentSession(params.event_id)
        .then((res)=>{
            if(res.status === 200){
                setAppointmentSessions(res.data.result)
                // console.log(res.data.result);
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
        loadOneEvent(params.event_id)
        .then((res)=>{
            if(res.status === 200){
                setEvent(res.data.result[0])
                // console.log(res.data.result);
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }, [])

    return(
        <section className="section session-list">
            {event !== null &&
                <h2 className="section-title">Appointment sessions - {event.name}</h2>
            }
            <div className="container">
                <div className="content">
                    {appointmentSessions.length > 0 &&
                        <ul className="sub-content">
                            {appointmentSessions.map((session) => {
                                return(
                                    <li className="sub-group" key={session.id}>
                                        <AppointmentSessionListItem
                                            description={session.description}
                                            session_id={session.id}
                                            user_key_id={session.user_key_id}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    }
                </div>
            </div>
        </section>
    )
}

export default AppointmentSessionList
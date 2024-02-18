import {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import { loadAllEventAppointmentSession } from "../../api/appointmentSession";
import { loadOneEvent } from "../../api/event";
import AppointmentSessionListItem from "../../components/appointment-session/appointment-session-list-item";

const AppointmentSessionList = () =>{
    const params = useParams();
    const [appointmentSessions, setAppointmentSessions] = useState([]);
    const [event, setEvent] = useState({});

    useEffect(()=>{
        let isMounted = true;
        const fetchData = () => {
            loadAllEventAppointmentSession(params.event_id)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setAppointmentSessions(res.data.result)
                }
            })
            .catch(err=>console.log(err))
            loadOneEvent(params.event_id)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setEvent(res.data.result[0])
                }
            })
            .catch(err=>console.log(err))
        }
        fetchData();
        return () => {
            isMounted = false;
        }

    }, [params.event_id])

    return(
        <section className="section session-list">
            <h2 className="section-title">Appointment sessions - {event.name}</h2>
            <div className="container">
                <div className="content">
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
                </div>
            </div>
        </section>
    )
}

export default AppointmentSessionList
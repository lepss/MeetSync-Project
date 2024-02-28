import {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import { loadAllEventAppointmentSession } from "../../api/appointmentSession";
import { loadOneEvent } from "../../api/event";
import AppointmentSessionListItem from "../../components/appointment-session/appointment-session-list-item";

const AppointmentSessionList = () =>{
    const params = useParams();
    const [appointmentSessions, setAppointmentSessions] = useState([]);
    const [event, setEvent] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const sessionPromise = loadAllEventAppointmentSession(params.event_id);
                const eventPromise = loadOneEvent(params.event_id);

                const [sessionRes, eventRes] = await Promise.all([sessionPromise, eventPromise]);

                if (isMounted) {
                    if (sessionRes.status === 200) {
                        setAppointmentSessions(sessionRes.data.result);
                    }
                    if (eventRes.status === 200) {
                        setEvent(eventRes.data.result[0]);
                    }
                    setIsLoading(false); // Les données sont chargées, on peut cesser le chargement
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
        return () => {
            isMounted = false;
        };
    }, [params.event_id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return(
        <section className="section session-list">
            <h2 className="section-title">Appointment sessions - {event.name}</h2>
            <div className="container">
                <div className="content">
                    <ul className="sub-content">
                        {appointmentSessions !== undefined && appointmentSessions.length > 0 ? (
                            appointmentSessions.map((session) => {
                                return(
                                    <li className="sub-group" key={session.id}>
                                        <AppointmentSessionListItem
                                            description={session.description}
                                            session_id={session.id}
                                            user_key_id={session.user_key_id}
                                        />
                                    </li>
                                )})
                        ) : (
                            <li>No sessions found</li>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default AppointmentSessionList
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import { generateAgenda } from "../../api/agenda";
import { deleteAllAppointmentInEvent, loadAllEventAppointments } from "../../api/appointment";
import { loadAllEventAppointmentSession } from "../../api/appointmentSession";
import { loadAllEventAppointmentRequests } from "../../api/appointmentRequest";
import { updateEventGenerated } from "../../api/event";
import TableRowDashboardEventRequest from "../../components/dashboard/table-row-dashboard-event-request";
import TableRowDashboardEventSession from "../../components/dashboard/table-row-dashboard-event-session";
import TableRowDashboardEventAppointment from "../../components/dashboard/table-row-dashboard-event-appointment";

const EventDashboard = () =>{
    const params = useParams();
    const [sessions, setSessions] = useState([])
    const [requests, setRequests] = useState([])
    const [appointments, setAppointments] = useState([])
    const [statusCounts, setStatusCounts] = useState({ accepted: 0, rejected: 0, pending: 0 });
    
    useEffect(()=>{
        let isMounted = true;
        const fetchData = () => {
            loadAllEventAppointmentSession(params.event_id)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setSessions(res.data.result)
                }
            })
            .catch(err=>console.log(err))
            loadAllEventAppointmentRequests(params.event_id)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setRequests(res.data.result)
                    const counts = res.data.result.reduce((acc, { accepted_status }) => {
                        acc[accepted_status] = (acc[accepted_status] || 0) + 1;
                        return acc;
                    }, { accepted: 0, rejected: 0, pending: 0 });
                    setStatusCounts(counts);
                }
            })
            .catch(err=>console.log(err))
            loadAllEventAppointments(params.event_id)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setAppointments(res.data.result)
                }
            })
            .catch(err=>console.log(err))
        }
        fetchData();
        return () => {
            isMounted = false;
        }
    }, [params.event_id])

    const fetchAppointments = () => {
        loadAllEventAppointments(params.event_id)
        .then((res)=>{
            if(res.status === 200){
                setAppointments(res.data.result)
            }
        })
        .catch(err=>console.log(err))
    }

    const handleClickGenerateAgenda = () =>{
        generateAgenda(params.event_id)
        .then((res)=>{
            if(res.status === 200){
                fetchAppointments()
            }else{
                console.log(res);
            }
        })
        .catch(err=>console.log(err))
    }

    const handleClickDeleteAgenda = () =>{
        deleteAllAppointmentInEvent(params.event_id)
        .then((res)=>{
            if(res.status === 200){
                const data = {agenda_generated : false}
                updateEventGenerated(data, params.event_id)
                if(res.status === 200){
                    setAppointments([])
                }else{
                    console.log(res)
                }
            }else{
                console.log(res);
            }
        })
        .catch(err=>console.log(err))
    }

    return(
        <section className="section dashboard">
            <h2 className="section-title">Event Dashboard</h2>
            <div className="container dashboard">
                <div className="content">
                    <h3 className="sub-content-title">Sessions</h3>
                    <div className="table-wrapper">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>From</th>
                                <th>Request Number</th>
                                <th>Accepted Number</th>
                                <th>Rejected Number</th>
                                <th>Pending Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map((session, id)=>{
                                return(
                                    <TableRowDashboardEventSession 
                                        key={id}
                                        name={session.description}
                                        sessionId={session.id}
                                        userKeyId={session.user_key_id}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            <div className="container dashboard">
                <div className="content">
                    <h3 className="sub-content-title">Requests</h3>
                    <div className="table-wrapper">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Request</th>
                                <th>From</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {requests.map((request, id)=>{
                            return(
                                <TableRowDashboardEventRequest 
                                    key={id}
                                    request={request.request}
                                    status={request.accepted_status}
                                    userKeyId={request.user_key_id}
                                />
                            )
                        })}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            <div className="container dashboard">
                <div className="content">
                    <h3 className="sub-content-title">Appointments</h3>
                    <div className="table-wrapper">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Session</th>
                                <th>Date Start</th>
                                <th>Date End</th>
                                <th>Organizer Id</th>
                                <th>Participant Id</th>
                            </tr>
                        </thead>
                        <tbody>
                        {appointments !== undefined && appointments.length > 0 && appointments.map((appointment, id)=>{
                            return(
                                <TableRowDashboardEventAppointment 
                                    key={id}
                                    dateStart={appointment.date_start}
                                    dateEnd={appointment.date_end}
                                    organizerId={appointment.organizer_id}
                                    participantId={appointment.participant_id}
                                    sessionId={appointment.appointment_session_id}
                                />
                            )
                        })}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="content">
                    <h3 className="sub-content-title">Event Actions</h3>
                    <div className="event-actions">
                        <button className="button" onClick={handleClickGenerateAgenda}>
                            Generate Agenda
                        </button>
                        <button className="button btn-delete" onClick={handleClickDeleteAgenda}>
                            Delete Agenda
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventDashboard
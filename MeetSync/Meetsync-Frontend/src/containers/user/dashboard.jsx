import {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import { selectUser } from "../../slices/userSlice"
import { loadAllUserEvents } from "../../api/event";
import { loadAllUserAppointmentSession } from "../../api/appointmentSession";
import { loadAllUserAppointmentRequest } from "../../api/appointmentRequest";
import TableRowRequest from "../../components/admin/table-row-request";
import TableRowSession from "../../components/admin/table-row-session";
import TableRowEvent from "../../components/admin/table-row-event";
import Calendar from "../../components/admin/fullCalendar";

const Dashboard = () =>{
    const user = useSelector(selectUser)
    const [events, setEvents] = useState([])
    const [sessions, setSessions] = useState([])
    const [requests, setRequests] = useState([])

    useEffect(()=>{
        if(user.infos.id !== undefined){
            getAllUserEvent();
            getAllUserSession();
            getAllUserRequest();
        }
    }, [user])

    const getAllUserEvent = () =>{
        loadAllUserEvents(user.infos.id)
        .then((res)=>{
            if(res.status === 200){
                setEvents(res.data.result)
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    const getAllUserSession = () => {
        loadAllUserAppointmentSession(user.infos.id)
        .then((res)=>{
            if(res.status === 200){
                setSessions(res.data.result)
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    const getAllUserRequest = () => {
        loadAllUserAppointmentRequest(user.infos.id)
        .then((res)=>{
            if(res.status === 200){
                setRequests(res.data.result)
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    return(
        <section className="section dashboard agenda">
            <h2 className="section-title">Dashboard</h2>
            <div className="container">
                <div className="content calendar">
                    <h3 className="sub-content-title">My Schedule</h3>
                    <Calendar />
                </div>
            </div>
            <div className="container dashboard">
                <div className="content">
                    <h3 className="sub-content-title">My Events</h3>
                    <div className="table-wrapper">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Description</th>
                                    <th>Location</th>
                                    <th>Appointment duration</th>
                                    <th>Break duration</th>
                                    <th>Nb days</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {events.length > 0 && events.map((event, id)=>{
                                return(
                                    <TableRowEvent 
                                        key={id}
                                        eventId={event.id}
                                        name={event.name}
                                        description={event.description}
                                        location={event.location}
                                        appointmentDuration={event.appointment_duration}
                                        breakDuration={event.break_duration}
                                        handleDelete={getAllUserEvent}
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
                    <h3 className="sub-content-title">My Sessions</h3>
                    <div className="table-wrapper">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Session</th>
                                    <th>Request number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {sessions.length > 0 && sessions.map((session, id)=>{
                                return(
                                    <TableRowSession
                                        key={id}
                                        sessionId={session.id}
                                        eventId={session.event_id}
                                        sessionDescription={session.description}
                                        handleDelete={getAllUserSession}
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
                    <h3 className="sub-content-title">My Request</h3>
                    <div className="table-wrapper">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Session</th>
                                    <th>Request</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {requests.length > 0 && requests.map((request, id)=>{
                                return(
                                    <TableRowRequest 
                                        key={id}
                                        requestId={request.id}
                                        request={request.request}
                                        status={request.accepted_status}
                                        sessionId={request.appointment_session_id}
                                        handleDelete={getAllUserRequest}
                                    />
                                )
                            })}
                            </tbody>
                        </table>
                    </div>  
                </div>
            </div>
        </section>
    )
}

export default Dashboard
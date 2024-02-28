import {useState, useEffect} from "react"
import { loadAllUser } from "../../api/user";
import { loadAllAppointments } from "../../api/appointment";
import { loadAllAppointmentRequest } from "../../api/appointmentRequest";
import { loadAllAppointmentSession } from "../../api/appointmentSession";
import { loadAllEvents } from "../../api/event";

import TableRowEvent from "../../components/dashboard/table-row-event";
import TableRowSession from "../../components/dashboard/table-row-session";
import TableRowRequest from "../../components/dashboard/table-row-request";
import TableRowUser from "../../components/dashboard/table-row-user";
import TableRowDashboardEventAppointment from "../../components/dashboard/table-row-dashboard-event-appointment";
import AdminCalendar from "../../components/adminCalendar";

const AdminDashboard = () =>{
    const [events, setEvents] = useState([])
    const [sessions, setSessions] = useState([])
    const [requests, setRequests] = useState([])
    const [users, setUsers] = useState([])
    const [appointments, setAppointments] = useState([])

    useEffect(()=>{
        getAllUsers()
        getAllEvents()
        getAllRequests()
        getAllSessions()
        getAllAppointments()
    }, [])

    const getAllUsers = () => {
        loadAllUser()
        .then((res)=>{
            if(res.status === 200){
                setUsers(res.data.user)
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    const getAllEvents = () =>{
        loadAllEvents()
        .then((res)=>{
            if(res.status === 200){
                setEvents(res.data.result)
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    const getAllSessions = () =>{
        loadAllAppointmentSession()
        .then((res)=>{
            if(res.status === 200){
                setSessions(res.data.result)
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    const getAllRequests = () =>{
        loadAllAppointmentRequest()
        .then((res)=>{
            if(res.status === 200){
                setRequests(res.data.result)
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }

    const getAllAppointments = () =>{
        loadAllAppointments()
        .then((res)=>{
            if(res.status === 200){
                setAppointments(res.data.result)
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }
    

    return(
        <section className="section dashboard agenda">
            <h2 className="section-title">Admin Dashboard</h2>
            <div className="container dashboard">
                <div className="content">
                    <h3 className="sub-content-title">Events</h3>
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
                            {events !== undefined && events.length > 0 && events.map((event, id)=>{
                                return(
                                    <TableRowEvent 
                                        key={id}
                                        eventId={event.id}
                                        name={event.name}
                                        description={event.description}
                                        location={event.location}
                                        appointmentDuration={event.appointment_duration}
                                        breakDuration={event.break_duration}
                                        handleDelete={getAllEvents}
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
                    <h3 className="sub-content-title">Sessions</h3>
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
                            {sessions !== undefined && sessions.length > 0 && sessions.map((session, id)=>{
                                return(
                                    <TableRowSession
                                        key={id}
                                        sessionId={session.id}
                                        eventId={session.event_id}
                                        sessionDescription={session.description}
                                        handleDelete={getAllSessions}
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
                                    <th>Event</th>
                                    <th>Session</th>
                                    <th>Request</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {requests !== undefined && requests.length > 0 && requests.map((request, id)=>{
                                return(
                                    <TableRowRequest 
                                        key={id}
                                        requestId={request.id}
                                        request={request.request}
                                        status={request.accepted_status}
                                        sessionId={request.appointment_session_id}
                                        handleDelete={getAllRequests}
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
                <div className="content calendar">
                    <h3 className="sub-content-title">Schedule</h3>
                    <AdminCalendar />
                </div>
            </div>
            <div className="container dashboard">
                <div className="content">
                    <h3 className="sub-content-title">Users</h3>
                    <div className="table-wrapper">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users !== undefined && users.length > 0 && users.map((user, id)=>{
                                return(
                                    <TableRowUser 
                                        key={id}
                                        userId={user.id}
                                        firstname={user.firstname}
                                        lastname={user.lastname}
                                        username={user.username}
                                        email={user.email}
                                        phone={user.phone}
                                        role={user.role}
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

export default AdminDashboard
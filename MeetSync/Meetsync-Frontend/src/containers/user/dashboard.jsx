import {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import { selectUser } from "../../slices/userSlice"
import { loadAllUserEvents } from "../../api/event";
import { loadAllUserAppointmentSession } from "../../api/appointmentSession";
import { loadAllUserAppointmentRequest } from "../../api/appointmentRequest";

const Dashboard = () =>{
    const user = useSelector(selectUser)
    const [events, setEvents] = useState([])
    const [sessions, setSessions] = useState([])
    const [requests, setRequests] = useState([])

    useEffect(()=>{
        if(user.infos.id !== undefined){
            loadAllUserEvents(user.infos.id)
            .then((res)=>{
                if(res.status === 200){
                    setEvents(res.data.result)
                }else{
                    console.log(res.response.data.msg);
                }
            })
            .catch(err=>console.log(err))
            loadAllUserAppointmentSession(user.infos.id)
            .then((res)=>{
                if(res.status === 200){
                    setSessions(res.data.result)
                }else{
                    console.log(res.response.data.msg);
                }
            })
            .catch(err=>console.log(err))
            loadAllUserAppointmentRequest(user.infos.id)
            .then((res)=>{
                if(res.status === 200){
                    console.log(res.data.result);
                    setRequests(res.data.result)
                }else{
                    console.log(res.response.data.msg);
                }
            })
            .catch(err=>console.log(err))
        }
    }, [user])

    return(
        <section className="section">
            <h2 className="section-title">Dashboard</h2>
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <h3 className="sub-content-title">My Schedule</h3>
                        {/* {events.length > 0 &&
                        } */}
                        <div className="sub-group">
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <h3 className="sub-content-title">My Events</h3>
                            <div className="sub-group">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Event</th>
                                            <th>Description</th>
                                            <th>Location</th>
                                            <th>Appointment duration</th>
                                            <th>Break duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {events.length > 0 && events.map((event)=>{
                                        return(
                                            <tr key={event.id}>
                                                <td>{event.name}</td>
                                                <td>{event.description}</td>
                                                <td>{event.location}</td>
                                                <td>{event.appointment_duration}</td>
                                                <td>{event.break_duration}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <h3 className="sub-content-title">My Sessions</h3>
                        <div className="sub-group">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Event</th>
                                        <th>Session</th>
                                        <th>Request number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {sessions.length > 0 && sessions.map((session)=>{
                                    return(
                                        <tr key={session.id}>
                                            <td>Event name</td>
                                            <td>{session.description}</td>
                                            <td>12</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <h3 className="sub-content-title">My Request</h3>
                        <div className="sub-group">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Event</th>
                                        <th>Request</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {requests.length > 0 && requests.map((request)=>{
                                    return(
                                        <tr key={request.id}>
                                            <td>Event name</td>
                                            <td>{request.request}</td>
                                            <td>{request.accepted_status}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
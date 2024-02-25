import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { getEventsCount } from "../api/event";
import { getUsersCount } from "../api/user";
import { getAppointmentRequestCount } from "../api/appointmentRequest";
import { getAppointmentSessionCount } from "../api/appointmentSession";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Counter from "../components/counter";
import {
  faAngleRight,
  faCalendarDays,
  faUser,
  faHandshake
} from "@fortawesome/free-solid-svg-icons";

const Home = () =>{
    const [eventCount, setEventCount]= useState(0)
    const [userCount, setuserCount]= useState(0)
    const [sessionCount, setSessionCount]= useState(0)
    const [requestCount, setRequestCount]= useState(0)

    useEffect(()=>{
        let isMounted = true;
        const fetchData = () => {
            getEventsCount()
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setEventCount(res.data.result)
                }
            })
            .catch(err=>console.log(err))
            getUsersCount()
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setuserCount(res.data.result)
                }
            })
            .catch(err=>console.log(err))
            getAppointmentRequestCount()
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setRequestCount(res.data.result)
                }
            })
            .catch(err=>console.log(err))
            getAppointmentSessionCount()
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setSessionCount(res.data.result)
                }
            })
            .catch(err=>console.log(err))
        }
        fetchData();
        return () => {
            isMounted = false;
        }

    }, [])

    return(
    <section className="section">
        <div className="container banner-home">
            <div className="banner-home ">
                <div className="sub-content counter-wrapper">
                    <div className="counter-container">
                        <FontAwesomeIcon icon={faCalendarDays}/>
                        <div className="counter"><Counter target={eventCount} /></div>
                        <span>Events</span>
                    </div>
                    <div className="counter-container">
                        <FontAwesomeIcon icon={faUser}/>
                        <div className="counter"><Counter target={userCount} /></div>
                        <span>Users</span>
                    </div>
                    <div className="counter-container">
                        <FontAwesomeIcon icon={faHandshake}/>
                        <div className="counter" ><Counter target={sessionCount} /></div>
                        <span>Meetings</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="content">
                <div className="sub-content">
                    <h2 className="sub-content-title">Connect, Sync, Meet: Transform your professional network with MeetSync!</h2>
                    <p>MeetSync revolutionizes professional interactions by offering a dynamic platform to optimize your meetings at events. Thanks to our intuitive technology, create unique networking opportunities, schedule your meetings and share your experiences, all in just a few clicks. Join the MeetSync community and take your career to the next level.</p>
                    <Link to="/event">
                        <button className="button">Start now <FontAwesomeIcon icon={faAngleRight}/></button>
                    </Link>
                </div>
            </div>
        </div>

    </section>

    )
}

export default Home
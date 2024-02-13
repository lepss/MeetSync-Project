import {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom";
import { loadOneEvent } from "../../api/event";
import { getEventDays } from "../../api/event"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faCalendar
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const EventDetail = () =>{
    const params = useParams();
    const [event, setEvent] = useState(null)
    const [eventDay, setEventDay] = useState([])

    useEffect(()=>{
        loadOneEvent(params.id)
        .then((res)=>{
            if(res.status === 200){
                setEvent(res.data.result[0])
                // console.log(res.data.result[0]);
                getEventDays(res.data.result[0].id)
                .then((res)=>{
                    if(res.status === 200){
                        setEventDay(res.data.result)
                        // console.log(res.data.result);
                    }else{
                        console.log(res.response.data.msg);
                    }
                })
            }else{
                console.log(res.response.data.msg);
            }
        })
    }, [])

    return(
        <section className="section event-detail">
            {event !== null &&
                <>
                    <div className="banner">
                        <h2 className="section-title">{event.name}</h2>
                        <img src="https://placehold.co/600x200" alt="event image presentation"/>
                    </div>
                    <div className="container">
                        <div className="content">
                            <div className="sub-content">
                                <div className="sub-group">
                                    <p><FontAwesomeIcon icon={faLocationDot}/>Paris, Palais des congrès</p>
                                    {eventDay.length > 0 &&
                                    <>
                                        {eventDay.length > 1 ? (
                                            <p><FontAwesomeIcon icon={faCalendar}/>From {moment(eventDay[0].start_time).format('LLL')} to {moment(eventDay[eventDay.length - 1].start_time).format('LLL')}</p>
                                        ) : (
                                            <p><FontAwesomeIcon icon={faCalendar}/>{moment(eventDay[0].start_time).format('LLL')}</p>
                                        )}
                                    </>
                                    }
                                    <p>{event.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="content">
                            <div className="sub-content">
                                <div className="sub-group">
                                    <p>Want to organize meeting session during this event ? Join us !</p>
                                    <Link to={`/addAppointmentSession/${event.id}`}>
                                        <button className="button">Organize meeting</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="content">
                            <div className="sub-content">
                                <div className="sub-group">
                                    <p>Want to meet people during this event ? Join us !</p>
                                    <Link to={`/appointmentSessions/${event.id}`}>
                                        <button className="button">Join meetings</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </section>
    )

}

export default EventDetail
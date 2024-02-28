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
import { config } from "../../config";

const EventDetail = () =>{
    const params = useParams();
    const [event, setEvent] = useState({})
    const [eventDay, setEventDay] = useState([{}])

    useEffect(()=>{
        let isMounted = true;
        const fetchData = () => {
            loadOneEvent(params.id)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setEvent(res.data.result[0])
                    getEventDays(res.data.result[0].id)
                    .then((res)=>{
                        if(res.status === 200 && isMounted){
                            setEventDay(res.data.result)
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
    }, [params.id])

    return(
        <section className="section event-detail">
            <div className="banner">
                <h2 className="section-title">{event.name}</h2>
                {event.event_image_url !== null ? (
                    <img src={config.pict_url+event.event_image_url} alt="event image presentation"/>
                ) : (
                    <img src="https://placehold.co/600x200" alt="event image presentation"/>
                )}
                
            </div>
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <div className="sub-group">
                            <p><FontAwesomeIcon icon={faLocationDot}/>{event.location}</p>
                            {eventDay.length > 1 ? (
                                <p><FontAwesomeIcon icon={faCalendar}/>From {moment(eventDay[0].start_time).format('LLL')} to {moment(eventDay[eventDay.length - 1].start_time).format('LLL')}</p>
                            ) : (
                                <p><FontAwesomeIcon icon={faCalendar}/>{moment(eventDay[0].start_time).format('LLL')}</p>
                            )}
                            <p>{event.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            {event.agenda_generated === 0 ? (
            <>
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
            ) : (
                <div className="container">
                    <div className="content">
                        <div className="sub-content">
                            <div className="sub-group">
                                <p>This event is close for registration</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </section>
    )

}

export default EventDetail
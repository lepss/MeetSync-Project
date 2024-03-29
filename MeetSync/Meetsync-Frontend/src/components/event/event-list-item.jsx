import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import { getEventDays } from "../../api/event"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faCalendar
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const EventListItem = ({
    name,
    description,
    location,
    event_id
}) =>{

    const [eventDays, setEventDays] = useState([])

    useEffect(()=>{
        getEventDays(event_id)
        .then((res)=>{
            if(res.status === 200){
                setEventDays(res.data.result)
            }else{
                console.log(res.response.data.msg);
            }
        })
    }, [])

    return(
        <>
            <Link to={`/event/${event_id}`}>
                <h3 className="sub-content-title">{name}</h3>
                <p className="single-line-text">{description}</p>
                <p><FontAwesomeIcon icon={faLocationDot}/>{location}</p>
                {eventDays.length > 0 &&
                    <>
                        {eventDays.length > 1 ? (
                            <p><FontAwesomeIcon icon={faCalendar}/>{moment(eventDays[0].start_time).format('LLL')} - {moment(eventDays[eventDays.length - 1].start_time).format('LLL')}</p>
                        ) : (
                            <p><FontAwesomeIcon icon={faCalendar}/>{moment(eventDays[0].start_time).format('LLL')}</p>
                        )}
                    </>
                }
            </Link>
        </>
    )
}

EventListItem.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    event_id: PropTypes.number
};

export default EventListItem;
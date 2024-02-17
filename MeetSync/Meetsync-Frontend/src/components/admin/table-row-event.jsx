import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import { getEventDays } from "../../api/event";
import { deleteEvent } from "../../api/event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faTrash,
    faCircleArrowRight
} from "@fortawesome/free-solid-svg-icons";

const TableRowEvent = ({
    eventId,
    name,
    description,
    location,
    appointmentDuration,
    breakDuration,
    handleDelete
}) =>{
    const [eventDays, setEventDays] = useState([])

    const onClickDelete = (id) =>{
        deleteEvent(id)
        .then((res)=>{
            if(res.status === 200){
                handleDelete()
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        getEventDays(eventId)
        .then((res)=>{
            if(res.status === 200){
                setEventDays(res.data.result)
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }, [])

    return(
        <>
            {eventDays !== null &&
                <tr>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>{location}</td>
                    <td>{appointmentDuration}</td>
                    <td>{breakDuration}</td>
                    <td>{eventDays.length}</td>
                    <td>
                        <Link to={`/eventDashboard/${eventId}`}><FontAwesomeIcon icon={faCircleArrowRight}/></Link>
                        <Link to={`/editEvent/${eventId}`}><FontAwesomeIcon icon={faPenToSquare}/></Link>
                        <button
                            onClick={(e)=>{
                                e.preventDefault()
                                onClickDelete(eventId)
                            }}
                        >
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </td>
                </tr>
            }
        </>
    )
}

TableRowEvent.propTypes = {
    eventId: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    appointmentDuration: PropTypes.number,
    breakDuration: PropTypes.number
}

export default TableRowEvent;
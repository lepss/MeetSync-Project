import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import { getEventDays } from "../../api/event";
import { loadOneEvent } from "../../api/event"
import { deleteEvent } from "../../api/event";
import Popup from "../popup"
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
    const [event, setEvent] = useState({})
    const [eventDays, setEventDays] = useState([])
    const [popup, setPopup] = useState({
        show: false,
        id: null
    })

    const handleDeleteModal = (id) =>{
        setPopup({
            show: true,
            id
        })
    }

    const handleDeleteModalTrue = () =>{
        if(popup.show && popup.id){
            deleteEvent(popup.id)
            .then((res)=>{
                if(res.status === 200){
                    handleDelete()
                }
            })
            .catch(err=>console.log(err))
            setPopup({
                show: false,
                id: null
            })
        }
    }

    const handleDeleteModalFalse = () =>{
        setPopup({
            show: false,
            id: null
        })
    }

    const onClickDelete = (id) =>{
        handleDeleteModal(id)
    }

    useEffect(()=>{
        let isMounted = true;
        const fetchData = () => {
            loadOneEvent(eventId)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setEvent(res.data.result[0])
                }
            })
            .catch(err=>console.log(err))
            getEventDays(eventId)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setEventDays(res.data.result)
                }
            })
            .catch(err=>console.log(err))
        }
        fetchData();
        return () => {
            isMounted = false;
        }
    }, [eventId])

    return(
        <>
            <tr>
                <td>{name}</td>
                <td>{description}</td>
                <td>{location}</td>
                <td>{appointmentDuration}</td>
                <td>{breakDuration}</td>
                <td>{eventDays.length}</td>
                <td>
                    <Link to={`/eventDashboard/${eventId}`} title={"Event dashboard"}><FontAwesomeIcon icon={faCircleArrowRight}/></Link>
                    {event.agenda_generated === 1 ? (
                        <Link to={""} title={"This button is disabled because the calendar is already generated."} className="link-disabled">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                    ) : (
                        <Link to={`/editEvent/${eventId}`} title={"Edit this event"}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                    )}

                    <button className="btn-table"
                        disabled={event.agenda_generated === 1}
                        title={event.agenda_generated === 1 ? "This button is disabled because the calendar is already generated." : "Delete this event"}
                        onClick={(e)=>{
                            e.preventDefault()
                            onClickDelete(eventId)
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </td>
            </tr>
            {popup.show && (
                <Popup 
                    message={"Are you sure you wan't to delete this event ?"}
                    handleDeleteTrue={handleDeleteModalTrue}
                    handleDeleteFalse={handleDeleteModalFalse}
                />
            )}
        </>
    )
}

TableRowEvent.propTypes = {
    eventId: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    appointmentDuration: PropTypes.number,
    breakDuration: PropTypes.number,
    handleDelete: PropTypes.func
}

export default TableRowEvent;
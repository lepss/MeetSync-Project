import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import { loadOneEvent } from "../../api/event"
import { loadAllSessionAppointmentRequest } from "../../api/appointmentRequest"
import { deleteAppointmentSession } from "../../api/appointmentSession"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faTrash,
    faCircleArrowRight
} from "@fortawesome/free-solid-svg-icons";

const TableRowSession = ({
    sessionId,
    eventId,
    sessionDescription, 
    handleDelete
}) =>{
    const [event, setEvent] = useState(null)
    const [nbRequest, setNbRequest] = useState(0)

    const onClickDelete = (id) =>{
        deleteAppointmentSession(id)
        .then((res)=>{
            if(res.status === 200){
                handleDelete()
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadOneEvent(eventId)
        .then((res)=>{
            if(res.status === 200){
                setEvent(res.data.result[0])
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
        loadAllSessionAppointmentRequest(sessionId)
        .then((res)=>{
            if(res.status === 200){
                setNbRequest(res.data.result.length)
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }, [])

    return(
        <>
            {event !== null &&
                <tr>
                    <td>{event.name}</td>
                    <td>{sessionDescription}</td>
                    <td>{nbRequest}</td>
                    <td>
                        <Link to={`/appointmentRequestList/${sessionId}`}><FontAwesomeIcon icon={faCircleArrowRight}/></Link>
                        <Link to={`/editAppointmentSession/${sessionId}`}><FontAwesomeIcon icon={faPenToSquare}/></Link>
                        
                        <button
                            onClick={(e)=>{
                                e.preventDefault()
                                onClickDelete(sessionId)
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

TableRowSession.propTypes = {
    sessionId: PropTypes.number,
    eventId: PropTypes.number,
    sessionDescription: PropTypes.string,
    handleDelete: PropTypes.func
}

export default TableRowSession;
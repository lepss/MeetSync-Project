import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import { loadOneEvent } from "../../api/event";
import { loadOneAppointmentSession } from "../../api/appointmentSession";
import { deleteAppointmentRequest } from "../../api/appointmentRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faTrash
} from "@fortawesome/free-solid-svg-icons";

const TableRowRequest = ({
    requestId,
    request,
    status,
    sessionId,
    handleDelete
}) =>{
    const [event, setEvent] = useState(null)
    const [session, setSession] = useState(null)

    const onClickDelete = (id) =>{
        deleteAppointmentRequest(id)
        .then((res)=>{
            if(res.status === 200){
                handleDelete()
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadOneAppointmentSession(sessionId)
        .then((res)=>{
            if(res.status === 200){
                setSession(res.data.result[0])
                loadOneEvent(res.data.result[0].event_id)
                .then((res)=>{
                    if(res.status === 200){
                        setEvent(res.data.result[0])
                    }else{
                        console.log(res.response.data.msg);
                    }
                })
                .catch(err=>console.log(err))
            }else{
                console.log(res.response.data.msg);
            }
        })
        .catch(err=>console.log(err))
    }, [])

    return(
        <>
            {event !== null && session !== null &&
            <tr>
                <td>{event.name}</td>
                <td>{session.description}</td>
                <td>{request}</td>
                <td>{status}</td>
                <td>
                    <Link to={`/editAppointmentRequest/${requestId}`}><FontAwesomeIcon icon={faPenToSquare}/></Link>
                    <button
                        onClick={(e)=>{
                            e.preventDefault()
                            onClickDelete(requestId)
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

TableRowRequest.propTypes = {
    requestId: PropTypes.number,
    request: PropTypes.string,
    status: PropTypes.string,
    sessionId: PropTypes.number,
    handleDelete: PropTypes.func
}

export default TableRowRequest;
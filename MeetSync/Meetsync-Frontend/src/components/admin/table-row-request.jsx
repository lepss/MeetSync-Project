import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import { loadOneEvent } from "../../api/event";
import { loadOneAppointmentSession } from "../../api/appointmentSession";
import { deleteAppointmentRequest } from "../../api/appointmentRequest";
import Popup from "../popup"
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
    const [event, setEvent] = useState({})
    const [session, setSession] = useState({})
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
            deleteAppointmentRequest(popup.id)
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
        handleDeleteModal(id);
    }

    useEffect(()=>{
        let isMounted = true;
        const fetchData = () => {
            loadOneAppointmentSession(sessionId)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setSession(res.data.result[0])
                    loadOneEvent(res.data.result[0].event_id)
                    .then((res)=>{
                        if(res.status === 200 && isMounted){
                            setEvent(res.data.result[0])
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
        
    }, [sessionId])

    return(
        <>
            <tr>
                <td>{event.name}</td>
                <td>{session.description}</td>
                <td>{request}</td>
                <td>{status}</td>
                <td>
                    {event.agenda_generated === 1 ? (
                        <Link to={""} title={"This button is disabled because the calendar is already generated."} className="link-disabled">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                    ) : (
                        <Link to={`/editAppointmentRequest/${requestId}`} title={"Edit this request"}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                    )}
                    <button className="btn-table"
                        disabled={event.agenda_generated === 1}
                        title={event.agenda_generated === 1 ? "This button is disabled because the calendar is already generated." : "Delete this request"}
                        onClick={(e)=>{
                            e.preventDefault()
                            onClickDelete(requestId)
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </td>
            </tr>
            {popup.show && (
                <>
                    <Popup 
                        message={"Are you sure you wan't to delete this request ?"}
                        handleDeleteTrue={handleDeleteModalTrue}
                        handleDeleteFalse={handleDeleteModalFalse}
                    />
                </>
            )}
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
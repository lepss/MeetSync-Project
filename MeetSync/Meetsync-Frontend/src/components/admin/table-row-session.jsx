import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import { loadOneEvent } from "../../api/event"
import { loadAllSessionAppointmentRequest } from "../../api/appointmentRequest"
import { deleteAppointmentSession } from "../../api/appointmentSession"
import Popup from "../popup"
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
    const [event, setEvent] = useState({})
    const [nbRequest, setNbRequest] = useState(0)
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
            deleteAppointmentSession(popup.id)
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
            loadOneEvent(eventId)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setEvent(res.data.result[0])
                }
            })
            .catch(err=>console.log(err))
            loadAllSessionAppointmentRequest(sessionId)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setNbRequest(res.data.result.length)
                }
            })
            .catch(err=>console.log(err))
        }
        fetchData();
        return () => {
            isMounted = false;
        }
        
    }, [eventId, sessionId])

    return(
        <>
            <tr>
                <td>{event.name}</td>
                <td>{sessionDescription}</td>
                <td>{nbRequest}</td>
                <td>
                    <Link to={`/appointmentRequestList/${sessionId}`}><FontAwesomeIcon icon={faCircleArrowRight}/></Link>
                    <Link to={`/editAppointmentSession/${sessionId}`}><FontAwesomeIcon icon={faPenToSquare}/></Link>
                    
                    <button className="btn-table"
                        onClick={(e)=>{
                            e.preventDefault()
                            onClickDelete(sessionId)
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </td>
            </tr>
            {popup.show && (
                <Popup 
                    message={"Are you sure you wan't to delete this session ?"}
                    handleDeleteTrue={handleDeleteModalTrue}
                    handleDeleteFalse={handleDeleteModalFalse}
                />
            )}
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
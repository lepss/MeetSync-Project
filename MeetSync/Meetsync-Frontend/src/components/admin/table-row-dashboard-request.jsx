import {useState, useEffect} from "react"
import PropTypes from "prop-types"
import { loadOneUser } from "../../api/user"
import { validateOneAppointmentRequest } from "../../api/appointmentRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCircleXmark
} from "@fortawesome/free-solid-svg-icons";

const TableRowDashboardRequest = ({
    request,
    status,
    requestId,
    userKeyId,
    handleValidate
}) => {
    const [user, setUser] = useState({})

    const onClickValidate = () =>{
        let data = {
            validate: "accepted"
        }
        validateOneAppointmentRequest(requestId, data)
        .then((res)=>{
            if(res.status === 200){
                handleValidate()
            }
        })
        .catch(err=>console.log(err))
    }

    const onClickRejected = () => {
        let data = {
            validate: "rejected"
        }
        validateOneAppointmentRequest(requestId, data)
        .then((res)=>{
            if(res.status === 200){
                handleValidate()
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        let isMounted = true;
        const fetchData = () => {
            loadOneUser(userKeyId)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setUser(res.data.user)
                }
            })
            .catch(err=>console.log(err))
        }
        fetchData();
        return () => {
            isMounted = false;
        }
    }, [userKeyId])

    return(
        <tr>
            <td>{request}</td>
            <td>{user.username}</td>
            <td>{status}</td>
            <td>
                <button className="btn-table"
                    onClick={(e)=>{
                        e.preventDefault()
                        onClickValidate()
                    }}
                >
                    <FontAwesomeIcon icon={faCircleCheck}/>
                </button>
                <button className="btn-table"
                    onClick={(e)=>{
                        e.preventDefault()
                        onClickRejected()
                    }}
                >
                    <FontAwesomeIcon icon={faCircleXmark}/>
                </button>
            </td>
        </tr>
    )
}

TableRowDashboardRequest.propTypes = {
    request: PropTypes.string,
    status: PropTypes.string,
    requestId: PropTypes.number,
    userKeyId: PropTypes.string,
    handleValidate: PropTypes.func
}

export default TableRowDashboardRequest
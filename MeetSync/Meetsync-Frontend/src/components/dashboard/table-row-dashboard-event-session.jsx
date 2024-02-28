import {useState, useEffect} from "react"
import PropTypes from "prop-types"
import { loadAllSessionAppointmentRequest } from "../../api/appointmentRequest"
import { loadOneUser } from "../../api/user"

const TableRowDashboardEventSession = ({
    name,
    sessionId,
    userKeyId
}) => {
    const [statusCounts, setStatusCounts] = useState({ accepted: 0, rejected: 0, pending: 0 });
    const [user, setUser] = useState({})

    useEffect(()=>{
        let isMounted = true;
        const fetchData = () => {
            loadAllSessionAppointmentRequest(sessionId)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    const counts = res.data.result.reduce((acc, { accepted_status }) => {
                        acc[accepted_status] = (acc[accepted_status] || 0) + 1;
                        return acc;
                    }, { accepted: 0, rejected: 0, pending: 0 });
                    setStatusCounts(counts);
                }
            })
            .catch(err=>console.log(err))
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
        
    }, [sessionId, userKeyId])

    return(
        <tr>
            <td>{name}</td>
            <td>{user.username}</td>
            <td>{Number(statusCounts.accepted) + Number(statusCounts.rejected) + Number(statusCounts.pending)}</td>
            <td>{statusCounts.accepted}</td>
            <td>{statusCounts.rejected}</td>
            <td>{statusCounts.pending}</td>
        </tr>
    )
}

TableRowDashboardEventSession.propTypes = {
    name: PropTypes.string,
    userKeyId: PropTypes.string,
    sessionId: PropTypes.number
}

export default TableRowDashboardEventSession
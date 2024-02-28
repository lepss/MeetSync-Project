import {useState, useEffect} from "react"
import PropTypes from "prop-types"
import { loadOneUser } from "../../api/user"

const TableRowDashboardEventRequest = ({
    request,
    status,
    userKeyId
}) => {
    const [user, setUser] = useState({})

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
        </tr>
    )
}

TableRowDashboardEventRequest.propTypes = {
    request: PropTypes.string,
    status: PropTypes.string,
    userKeyId: PropTypes.string,
    requestId: PropTypes.number
}

export default TableRowDashboardEventRequest
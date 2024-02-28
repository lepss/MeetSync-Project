import {useState, useEffect} from "react"
import PropTypes from "prop-types"
import { loadOneAppointmentSession } from "../../api/appointmentSession"
import moment from "moment/moment"

const TableRowDashboardEventAppointment = ({
    dateStart,
    dateEnd,
    organizerId,
    participantId,
    sessionId
}) => {
    const [session, setSession] = useState({})

    useEffect(()=>{
        let isMounted = true;
        const fetchData = () => {
            loadOneAppointmentSession(sessionId)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setSession(res.data.result[0]);
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
        <tr>
            <td>{session.description}</td>
            <td>{moment(dateStart).format("L")} - {moment(dateStart).format("LT")}</td>
            <td>{moment(dateEnd).format("L")} - {moment(dateEnd).format("LT")}</td>
            <td>{organizerId}</td>
            <td>{participantId}</td>
        </tr>
    )
}

TableRowDashboardEventAppointment.propTypes = {
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    organizerId: PropTypes.number,
    participantId: PropTypes.number,
    sessionId: PropTypes.number
}

export default TableRowDashboardEventAppointment
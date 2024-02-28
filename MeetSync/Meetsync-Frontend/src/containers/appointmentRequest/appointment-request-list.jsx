import {useState, useEffect} from "react"
import { useParams, Navigate } from "react-router-dom";
import { loadAllSessionAppointmentRequest } from "../../api/appointmentRequest";
import TableRowDashboardRequest from "../../components/dashboard/table-row-dashboard-request";

const AppointmentRequestList = () =>{
    const params = useParams();
    const [requests, setRequests] = useState([])
    const [redirect, setRedirect] = useState(null)

    useEffect( ()=>{
        if(isNaN(parseInt(params.session_id))){
            setRedirect(true);
        }
        loadAllRequests()

    }, [])

    const loadAllRequests = () =>{
        loadAllSessionAppointmentRequest(params.session_id)
        .then((res) => {
            if(res.status === 200){
                setRequests(res.data.result)
            } 
        })
        .catch((err) => console.log(err));
    }

    if(redirect){
        return <Navigate to={`/dashboard` }/>
    }

    return(
        <section className="section dashboard">
            <h2 className="section-title">Request Dashboard</h2>
            <div className="content">
                <div className="table-wrapper">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Request</th>
                            <th>From</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests !== undefined && requests.length > 0 && requests.map((request, id)=>{
                            return(
                                <TableRowDashboardRequest 
                                    key={id}
                                    request={request.request}
                                    status={request.accepted_status}
                                    requestId={request.id}
                                    userKeyId={request.user_key_id}
                                    handleValidate={loadAllRequests}
                                />
                            )
                        })}
                    </tbody>
                </table>
                </div>
            </div>
        </section>
    )
}

export default AppointmentRequestList
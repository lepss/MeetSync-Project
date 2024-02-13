import PropTypes from "prop-types"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import moment from "moment";
import { loadOneUser } from "../../api/user";

const AppointmentSessionListItem = ({
    description,
    location,
    session_id,
    user_key_id
}) =>{

    const [user, setUser] = useState(null)

    useEffect(()=>{
        loadOneUser(user_key_id)
        .then((res)=>{
            if(res.status === 200){
                setUser(res.data.user)
            }else{
                console.log(res.response.data.msg);
            }
        })
    }, [])

    return(
        <>
            <Link to={`/appointmentSession/${session_id}`}>
                <p>{description}</p>
                <p>{location}</p>
                {user !== null &&
                    <p>Organize by {user.email}</p>
                }
            </Link>
        </>
    )
}

AppointmentSessionListItem.propTypes = {
    description: PropTypes.string,
    location: PropTypes.string,
    session_id: PropTypes.number,
    user_key_id: PropTypes.string
}

export default AppointmentSessionListItem
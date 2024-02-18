import PropTypes from "prop-types"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import { loadOneUser } from "../../api/user";

const AppointmentSessionListItem = ({
    description,
    location,
    session_id,
    user_key_id
}) =>{

    const [user, setUser] = useState({})

    useEffect(()=>{
        let isMounted = true;
        const fetchData = () => {
            loadOneUser(user_key_id)
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

    }, [user_key_id])

    return(
        <Link to={`/appointmentSession/${session_id}`}>
            <p>{description}</p>
            <p>{location}</p>
            <p>Organize by {user.username}</p>
        </Link>
    )
}

AppointmentSessionListItem.propTypes = {
    description: PropTypes.string,
    location: PropTypes.string,
    session_id: PropTypes.number,
    user_key_id: PropTypes.string
}

export default AppointmentSessionListItem
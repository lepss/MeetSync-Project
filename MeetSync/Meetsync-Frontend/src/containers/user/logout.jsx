import {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import { logoutUser } from "../../slices/userSlice"
import {Navigate} from "react-router-dom"

const Logout = () => {
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)

    useEffect(()=>{
        window.localStorage.removeItem("meetsync-token")
        dispatch(logoutUser())
        setRedirect(true)
    }, [])

    if(redirect) {
        return <Navigate to="/"/>
    }

    return (
        <div>
        </div>
        )
}

export default Logout
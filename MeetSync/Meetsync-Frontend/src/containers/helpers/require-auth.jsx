import {useState,useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import PropTypes from "prop-types"
import {selectUser, connectUser} from "../../slices/userSlice"
import {Navigate, useParams} from "react-router-dom"
import { checkMyToken } from "../../api/user"

const RequireAuth = (props) =>{
    const params = useParams()
    const user = useSelector(selectUser);
    const dispatch = useDispatch()
    const Child = props.child
    const [redirect, setRedirect] = useState(false)
    const [redirectAdmin, setRedirectAdmin] = useState(false)

    useEffect(()=>{
        checkUserToken();
    }, [props])

    const checkUserToken = () =>{
        if(user.isLogged === false){
            const token = window.localStorage.getItem("meetsync-token")
            if(token === null && props.auth){
                setRedirect(true);
            }else{
                if(token !== null){
                    checkMyToken()
                    .then((res)=>{
                        if(res.status !== 200){
                            if(props.auth){
                                setRedirect(true);
                            }
                        }else {
                            let myUser = res.data.user
                            myUser.token = token
                            dispatch(connectUser(myUser))
                            if(myUser.role !== "admin" && props.admin){
                                setRedirectAdmin(true);
                            }
                        }
                    })
                    .catch(err=>console.log(err))
                }
            }
        }else{
            if(user.infos.role !== "admin"){
                if(props.admin){
                    setRedirectAdmin(true)
                }
            }
        }
    }

    if(redirect){
        return <Navigate to="/login"/>
    }
    if(redirectAdmin){
        return <Navigate to="/"/>
    }
    return (<Child  {...props} params={params}/>)
}

RequireAuth.propTypes = {
    child: PropTypes.elementType,
    auth: PropTypes.bool,
    admin: PropTypes.bool,
}

export default RequireAuth
import { useForm } from "react-hook-form"
import {useState} from "react"
import { Navigate } from "react-router-dom"
import { loginUser } from "../../api/user"
import { useDispatch } from "react-redux"
import { connectUser } from "../../slices/userSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const Login = () =>{
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)
    const {
        register,
        handleSubmit,
        // formState: {errors},
    } = useForm()

    const onSubmit = (data) =>{
        loginUser(data)
        .then((res)=>{
            if(res.status === 200){
                window.localStorage.setItem("meetsync-token", res.data.token)
                let newUser = res.data.user
                newUser.token = res.data.token
                dispatch(connectUser(newUser))
                setRedirect(true)
            }else{
                setError(res.response.data.msg)
            }
        })
        .catch(err=>console.log(err))
    }

    if(redirect){
        return <Navigate to="/" />
    }

    return(
        <section className="section form">
            <div className="container">
                <div className="content">
                    <div className="sub-content signin-image">
                        <figure><img src="https://placehold.co/200x200" alt="sing in image"/></figure>
                        {/* <a href="#" class="signup-image-link">Create an account</a> */}
                    </div>
                    <div className="sub-content">
                        <h2 className="sub-content-title">Sign in</h2>
                        {error !== null && <p className="form-error">{error}</p>}
                        <form onSubmit={handleSubmit(onSubmit)} className="register-form" id="login-form">
                            <div className="sub-group">
                                <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope}/></label>
                                <input className="form-input" type="email" placeholder="Email" {...register("email")} />
                            </div>
                            <div className="sub-group">
                                <label htmlFor="password"><FontAwesomeIcon icon={faLock}/></label>
                                <input className="form-input" type="password" placeholder="Password" {...register("password")} />
                            </div>
                            <div className="sub-group">
                                <input type="submit" name="signin" id="sigin" className="button" value="Log in"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
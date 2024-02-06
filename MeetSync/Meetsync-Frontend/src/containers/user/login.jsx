import { useForm } from "react-hook-form"
import {useState} from "react"
import { Navigate } from "react-router-dom"
import { loginUser } from "../../api/user"
import { useDispatch } from "react-redux"
import { connectUser } from "../../slices/userSlice"

const Login = () =>{
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)
    const {
        register,
        handleSubmit,
        formState: {errorForm},
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
        <section className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src="https://placehold.co/200x200" alt="sing up image"/></figure>
                        {/* <a href="#" class="signup-image-link">Create an account</a> */}
                    </div>
                    <div className="signin-form">
                        <h2 className="form-title">Sign in</h2>
                        {error !== null && <p className="form-error">{error}</p>}
                        <form onSubmit={handleSubmit(onSubmit)} className="register-form" id="login-form">
                            <div className="form-group">
                                <label htmlFor="email">E</label>
                                <input type="email" placeholder="Email" {...register("email")} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">P</label>
                                <input type="password" placeholder="Password" {...register("password")} />
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="sigin" className="form-submit" value="Log in"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
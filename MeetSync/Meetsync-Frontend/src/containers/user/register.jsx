import { useForm } from "react-hook-form"
import {useState} from "react"
import { Navigate } from "react-router-dom"
import { registerUser } from "../../api/user"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm()

    const onSubmit = (data) =>{
        registerUser(data)
        .then((res)=>{
            if(res.status === 200){
                setRedirect(true)
            }else{
                setError(res.response.data.msg)
            }
        })
        .catch(err=>console.log(err))
    }

    if(redirect){
        return <Navigate to="/login" />
    }

    return(
        <section className="section form">
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <h2 className="sub-content-title">Sign up</h2>
                        {error !== null && <p className="form-error">{error}</p>} 
                        <form onSubmit={handleSubmit(onSubmit)} className="register-form" id="register-form">
                            <div className="sub-group">
                                <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope}/></label>
                                <input className="form-input" type="email" placeholder="Email" id="email" 
                                    {...register("email", {
                                        required: "This field is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ ,
                                            message: "Invalid email format"
                                        } 
                                    })}
                                />
                            </div>
                            {errors.email && <p className="form-error">{errors.email.message}</p>}
                            <div className="sub-group">
                                <label htmlFor="password"><FontAwesomeIcon icon={faLock}/></label>
                                <input className="form-input" type="password" placeholder="Password" id="password"
                                    {...register("password", {
                                        required: "This field is required",
                                        minLength: {
                                            value : 4,
                                            message : "Password length should be at least 4 characters"
                                        }
                                    })}
                                />
                            </div>
                            {errors.password && <p className="form-error">{errors.password.message}</p>}
                            <div className="sub-group">
                            <label htmlFor="repassword"><FontAwesomeIcon icon={faLock}/></label>
                                <input className="form-input" type="password" placeholder="Confirm password" id="repassword"
                                    {...register("confirm_password", {
                                        required: "This field is required",
                                        validate: value => value === watch('password') || "Passwords do not match"
                                    })}
                                />
                            </div>
                            {errors.confirm_password && <p className="form-error">{errors.confirm_password.message}</p>}
                            <div className="sub-group">
                                <input type="submit" name="Signup" id="signup" className="button" value="Register"/>
                            </div>
                        </form>
                    </div>
                    <div className="sub-content signup-image">
                        <figure>
                            <img src="https://placehold.co/200x200" alt="sing up image"/>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
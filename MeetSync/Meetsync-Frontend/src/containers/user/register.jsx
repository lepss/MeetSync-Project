import { useForm } from "react-hook-form"
import {useState} from "react"
import { Navigate } from "react-router-dom"
import { registerUser } from "../../api/user"

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
        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        {error !== null && <p className="form-error">{error}</p>} 
                        <form onSubmit={handleSubmit(onSubmit)} className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="email">E</label>
                                <input type="email" placeholder="Email" id="email" 
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
                            <div className="form-group">
                            <label htmlFor="password">P</label>
                                <input type="password" placeholder="Password" id="password"
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
                            <div className="form-group">
                            <label htmlFor="repassword">R</label>
                                <input type="password" placeholder="Confirm password" id="repassword"
                                    {...register("confirm_password", {
                                        required: "This field is required",
                                        validate: value => value === watch('password') || "Passwords do not match"
                                    })}
                                />
                            </div>
                            {errors.confirm_password && <p className="form-error">{errors.confirm_password.message}</p>}
                            <div className="form-group form-button">
                                <input type="submit" name="Signup" id="signup" className="form-submit" value="Register"/>
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src="https://placehold.co/200x200" alt="sing up image"/></figure>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
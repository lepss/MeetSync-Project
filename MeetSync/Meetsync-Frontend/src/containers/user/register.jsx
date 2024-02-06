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
        <section className="form-container">
            <h2 className="form-title">Sign up</h2>
            {error !== null && <p className="form-error">{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="email" 
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ ,
                            message: "Invalid email format"
                        } 
                    })}
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
                <input type="password" placeholder="password" 
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value : 4,
                            message : "Password length should be at least 4 characters"
                        }
                    })}
                />
                {errors.password && <p className="form-error">{errors.password.message}</p>}
                <input type="password" placeholder="confirm password" 
                    {...register("confirm_password", {
                        required: "This field is required",
                        validate: value => value === watch('password') || "Passwords do not match"
                    })}
                />
                {errors.confirm_password && <p className="form-error">{errors.confirm_password.message}</p>}
                <input type="submit" value="Signup"/>
            </form>
        </section>
    )
}

export default Register
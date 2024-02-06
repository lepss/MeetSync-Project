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
        <section className="form-container">
            <h2 className="form-title">Log in</h2>
            {error !== null && <p className="form-error">{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="email" {...register("email")} />
                <input type="password" placeholder="password" {...register("password")} />
                <input type="submit" name="Login"/>
            </form>
        </section>
    )
}

export default Login
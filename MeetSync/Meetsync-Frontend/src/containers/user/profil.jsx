import {useState} from "react"
import { useForm } from "react-hook-form"
import {useSelector, useDispatch} from "react-redux"
import { selectUser, connectUser } from "../../slices/userSlice"
import { checkMyToken, updateUserProfil } from "../../api/user"

const Profil = () =>{
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmit = (data) => {
        updateUserProfil(data, user.infos.key_id)
        .then((res)=>{
            if(res.status === 200){
                checkMyToken()
                .then((res)=>{
                    if(res.status === 200){
                        const token = window.localStorage.getItem("meetsync-token")

                        let newUser = res.data.user
                        newUser.token = token
                        console.log(token);
                        dispatch(connectUser(newUser))
                        setMsg("Profil modified with success")
                    }else{
                        setError(res.response.data.msg)
                    }
                })
                .catch(err=>console.log(err))
            }else{
                setError(res.response.data.msg)
            }
        })
        .catch(err=>console.log(err))
    }

    return(
        <section className="section form">
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <h2 className="sub-content-title">Profil</h2>
                        {error !== null && <p className="form-error">{error}</p>}
                        {msg !== null && <p className="form-succes">{msg}</p>}
                        <form onSubmit={handleSubmit(onSubmit)} className="register-form" id="profil-form">
                            <div className="sub-group">
                                <label htmlFor="firstname" className="text-label">Firstname</label>
                                <input className="form-input" type="text" defaultValue={user.infos.firstname} placeholder="firstname" name="firstname" {...register("firstname")} />
                            </div>
                            <div className="sub-group">
                                <label htmlFor="lastname" className="text-label">Lastname</label>
                                <input className="form-input" type="text" defaultValue={user.infos.lastname} placeholder="lastname" name="lastname" {...register("lastname")} />
                            </div>
                            <div className="sub-group">
                                <label htmlFor="username" className="text-label">Username</label>
                                <input className="form-input" type="text" defaultValue={user.infos.username} placeholder="username" name="username" {...register("username")} />
                            </div>
                            <div className="sub-group">
                                <label htmlFor="phone" className="text-label">Phone</label>
                                <input className="form-input" type="tel" defaultValue={user.infos.phone} placeholder="phone" name="phone"
                                {...register("phone", {
                                    pattern: {
                                        value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                        message: "Invalid phone number"
                                    }
                                })} 
                                />
                            </div>
                            {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                            <div className="sub-group">
                                <input type="submit" name="submit" id="profil-submit" className="button" value="Submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profil
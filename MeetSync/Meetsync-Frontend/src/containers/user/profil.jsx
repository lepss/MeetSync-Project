import {useState, useEffect} from "react"
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

    useEffect(()=>{

    }, [user])

    return(
        <section className="profil">
            <div className="container">
                <div className="profil-content">
                    <div className="profil-form">
                        <h2 className="form-title">Profil</h2>
                        {error !== null && <p className="form-error">{error}</p>}
                        {msg !== null && <p className="form-msg">{msg}</p>}
                        <form onSubmit={handleSubmit(onSubmit)} className="register-form" id="profil-form">
                            <div className="form-group">
                                <input type="text" defaultValue={user.infos.firstname} placeholder="firstname" {...register("firstname")} />
                            </div>
                            <div className="form-group">
                                <input type="text" defaultValue={user.infos.lastname} placeholder="lastname" {...register("lastname")} />
                            </div>
                            <div className="form-group">
                                <input type="text" defaultValue={user.infos.username} placeholder="username" {...register("username")} />
                            </div>
                            <div className="form-group">
                                <input type="tel" defaultValue={user.infos.phone} placeholder="phone" 
                                {...register("phone", {
                                    pattern: {
                                        value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                        message: "Invalid phone number"
                                    }
                                })} 
                                />
                            </div>
                            {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                            <div className="form-group form-button">
                                <input type="submit" name="submit" id="profil-submit" className="form-submit" value="Submit"/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="profil-image">
                    <figure><img src="https://placehold.co/200x200" alt="profil image"/></figure>
                </div>
            </div>
        </section>
    )
}

export default Profil
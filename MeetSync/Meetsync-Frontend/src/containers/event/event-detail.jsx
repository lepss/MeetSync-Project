import {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom";
import { loadOneEvent } from "../../api/event";
import { getEventDays } from "../../api/event"

const EventDetail = () =>{
    const params = useParams();
    const [event, setEvent] = useState(null)
    const [eventDay, setEventDay] = useState([])

    useEffect(()=>{
        loadOneEvent(params.id)
        .then((res)=>{
            if(res.status === 200){
                setEvent(res.data.result)
                console.log(res.data.result[0]);
                getEventDays(res.data.result[0].id)
                .then((res)=>{
                    if(res.status === 200){
                        setEventDay(res.data.result)
                        
                    }else{
                        console.log(res.response.data.msg);
                    }
                })
            }else{
                console.log(res.response.data.msg);
            }
        })
    }, [])

    return(
        <section>
            <h2>Event detail - {params.id}</h2>
        </section>
    )

}

export default EventDetail
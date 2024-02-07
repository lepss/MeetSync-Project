import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadAllEvents } from "../../api/event";
import EventListItem from "../../components/event/event-list-item";

const EventList = () =>{
    const [events, setEvents] = useState([]);

    useEffect(()=>{
        loadAllEvents()
        .then((res)=>{
            if(res.status === 200){
                setEvents(res.data.result)
            }else{
                console.log(res.response.data.msg);
            }
        })
    }, [])

    return(
        <section className="section event-list">
            <h2 className="section-title">Events list</h2>
            <div className="container">
                <div className="content">
                    {events.length > 0 &&
                        <ul className="sub-content">
                            {events.map((event)=>{
                                return(
                                    <li className="sub-group" key={event.id}>
                                        <EventListItem
                                            name={event.name}
                                            description={event.description}
                                            location={"Palais des congrès, Paris"}
                                            event_id={event.id}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    }
                </div>
            </div>
        </section>
    )
}

export default EventList;
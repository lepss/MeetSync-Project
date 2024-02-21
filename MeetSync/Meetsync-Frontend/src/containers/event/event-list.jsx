import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadAllEvents } from "../../api/event";
import EventListItem from "../../components/event/event-list-item";

const EventList = () =>{
    const [events, setEvents] = useState([]);

    useEffect(()=>{
        let isMounted = true;
        const fetchData = () => {
            loadAllEvents()
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    setEvents(res.data.result)
                }
            })
            .catch(err=>console.log(err))
        }
        fetchData();
        return () => {
            isMounted = false;
        }

    }, [])

    return(
        <section className="section event-list">
            <div className="container">
                <div className="content">
                    <h2 className="section-title">Events list</h2>  
                    <ul className="sub-content">
                        {events.map((event)=>{
                            return(
                                <li className="sub-group even-list-item" key={event.id}>
                                    <EventListItem
                                        name={event.name}
                                        description={event.description}
                                        location={event.location}
                                        event_id={event.id}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="container">
                <div className="content">
                    <div className="sub-content">
                        <div className="sub-group">
                            <p>Want to add your event to Meetsync ?</p>
                            <Link to="/addEvent">
                                <button className="button">Add your event !</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventList;
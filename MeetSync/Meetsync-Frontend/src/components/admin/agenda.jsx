import {useState, useEffect} from "react"
import moment from "moment"
import Scheduler from "@mormat/react-scheduler"

const Agenda = () =>{
    const config = {
        draggable : false,
        events: [
            {
                start: Date.now(),
                label: "some event",
            }
        ]
    }

    return(
        <Scheduler {...config} />
        // <p>Agenda</p>
    )
}

export default Agenda
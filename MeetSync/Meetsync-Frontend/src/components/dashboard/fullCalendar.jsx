import { useEffect } from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import moment from 'moment'
import "moment/locale/fr";
moment.locale("fr");
import {useSelector, useDispatch} from "react-redux"
import { selectUser } from "../../slices/userSlice"
import { selectAppointments, setAppointments } from "../../slices/appointmentSlice";
import { loadAllUserAppointments } from "../../api/appointment"

const Calendar = () => {
    const dispatch = useDispatch()
    const rdv = useSelector(selectAppointments)
    const user = useSelector(selectUser)
    // const [appointments, setAppointments] = useState([])

    useEffect(() => {
        let isMounted = true;
        const fetchData = () => {
            loadAllUserAppointments(user.infos.id)
            .then((res)=>{
                if(res.status === 200 && isMounted){
                    if(res.data.result){
                        let formatedAppointments = []
                        res.data.result.map((item) =>{
                            item.date_start = new Date(item.date_start).getTime()
                            item.date_end = new Date(item.date_end).getTime()

                            let formatedItem = {
                                id: item.id,
                                title: `Rdv - ${item.id}`,
                                start: item.date_start,
                                end: item.date_end,
                            }
                            formatedAppointments.push(formatedItem);
                        })

                    setAppointments(formatedAppointments);
                    dispatch(setAppointments(formatedAppointments))
                    }
                }
            })
            .catch(err=>console.log(err))
        }
        fetchData();
        return () => {
            isMounted = false;
        }
    }, [user.infos.id])
    return(
        <div>
            <FullCalendar
                  plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin  ]}
                  initialView="dayGridMonth"
                  weekends={false}
                  events={rdv}
                  headerToolbar= {{left: 'prev,next', center: 'title', right: 'timeGridWeek,timeGridDay,listDay'}}
            />
      </div>
    )

}

export default Calendar
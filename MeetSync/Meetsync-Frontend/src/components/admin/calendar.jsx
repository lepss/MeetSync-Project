import {useState, useEffect, useMemo} from "react"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "moment/locale/fr";
moment.locale("fr");
import {useSelector, useDispatch} from "react-redux"
import { selectUser } from "../../slices/userSlice"
import { selectAppointments, setAppointments } from "../../slices/appointmentSlice";
import { loadAllUserAppointments } from "../../api/appointment"

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = () => {
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
            <Calendar
                views={["day", "agenda", "work_week", "month"]}
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events=  {[
                    {
                        id: 0,
                        title: "All Day Event very long title",
                        allDay: true,
                        start: new Date(2015, 3, 0),
                        end: new Date(2015, 3, 1)
                    }]
                  }
                onSelectEvent={(event) => alert(event.title)}
                // startAccessor="start"
                // endAccessor="end"
                style={{ height: 500 }}
            />
      </div>
    )
}

export default MyCalendar
import {useState, useEffect} from "react"
import moment from "moment"
import "moment/locale/fr";
moment.locale("fr");
import Scheduler from "@mormat/react-scheduler"
import {useSelector} from "react-redux"
import { selectUser } from "../../slices/userSlice"
import { loadAllUserAppointments } from "../../api/appointment"

const Agenda = () =>{

    const user = useSelector(selectUser)
    const [appointments, setAppointments] = useState([])

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
                            _id: item.id,
                            label: `Rdv - ${item.id}`,
                            start: item.date_start,
                            end: item.date_end,
                            color: "black",
                            backgroundColor: "blue",
                            // rowHeight: "500px"
                        }
                        formatedAppointments.push(formatedItem);
                    })

                    setAppointments(formatedAppointments);
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
        <>
            {appointments.length > 0 &&
                <Scheduler 
                    events = {appointments}
                    draggable = {false}
                    currentDate = {moment().format("YYYY-MM-DD")}
                    // minHour = "08:00"
                    // enableOverlapping =  {true}
                    rowHeight = "500px"
                />
            }
        </>
    )
}

export default Agenda
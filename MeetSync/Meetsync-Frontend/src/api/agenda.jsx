import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem("meetsync-token")

export function generateAgenda(event_id) {
    return axios.get(`${config.api_url}/api/agenda/generate/${event_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err) => {
        console.log(err)
        return err
    })
}
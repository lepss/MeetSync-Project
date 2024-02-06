import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem("meetsync-token")

export function generateAppointment(event_id) {
    return axios.post(`${config.api_url}/api/appointment/generate/${event_id}`, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res.data
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

export function loadAllAppointments(){
    return axios.get(`${config.api_url}/api/appointments`)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function loadAllEventAppointments(event_id){
    return axios.get(`${config.api_url}/api/appointment/event/${event_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}


export function loadAllSessionAppointments(session_id){
    return axios.get(`${config.api_url}/api/appointment/session/${session_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function loadAllUserAppointments(user_id){
    return axios.get(`${config.api_url}/api/appointment/user/${user_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function loadOneAppointment(id){
    return axios.get(`${config.api_url}/api/appointment/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function deleteAppointment(id) {
    return axios.delete(`${config.api_url}/api/appointment/delete/${id}`, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res.data
        })
        .catch((err) => {
            return err
        })
}
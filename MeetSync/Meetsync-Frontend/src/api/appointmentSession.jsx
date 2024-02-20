import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem("meetsync-token")

export function addAppointmentSession(data, event_id) {
    return axios.post(`${config.api_url}/api/appointmentSession/add/${event_id}`, data, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

export function loadAllEventAppointmentSession(event_id){
    return axios.get(`${config.api_url}/api/appointmentSession/all/event/${event_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function loadAllUserAppointmentSession(user_id){
    return axios.get(`${config.api_url}/api/appointmentSession/all/user/${user_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}


export function loadOneAppointmentSession(id){
    return axios.get(`${config.api_url}/api/appointmentSession/one/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function getEventIdOfAppointmentSession(session_id){
    return axios.get(`${config.api_url}/api/appointmentSession/event/id/${session_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function updateOneAppointmentSession(event_id, datas){
    return axios.put(`${config.api_url}/api/appointmentSession/update/${event_id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function deleteAppointmentSession(id) {
    return axios.delete(`${config.api_url}/api/appointmentSession/delete/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err) => {
        return err
    })
}
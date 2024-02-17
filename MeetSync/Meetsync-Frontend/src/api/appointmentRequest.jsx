import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem("meetsync-token")

export function addAppointmentRequest(datas, session_id) {
    return axios.post(`${config.api_url}/api/appointmentRequest/add/${session_id}`, datas, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

export function loadAllEventAppointmentRequests(event_id){
    return axios.get(`${config.api_url}/api/appointmentRequest/all/event/${event_id}`)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function loadAllSessionAppointmentRequest(session_id){
    return axios.get(`${config.api_url}/api/appointmentRequest/all/appointmentSession/${session_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}


export function loadAllUserAppointmentRequest(user_id){
    return axios.get(`${config.api_url}/api/appointmentRequest/all/user/${user_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function loadOneAppointmentRequest(id){
    return axios.get(`${config.api_url}/api/appointmentRequest/one/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function updateOneAppointmentRequest(id, datas){
    return axios.put(`${config.api_url}/api/appointmentRequest/update/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function validateOneAppointmentRequest(id){
    return axios.put(`${config.api_url}/api/appointmentRequest/validate/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function deleteAppointmentRequest(id) {
    return axios.delete(`${config.api_url}/api/appointmentRequest/delete/${id}`, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}
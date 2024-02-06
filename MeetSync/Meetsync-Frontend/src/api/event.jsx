import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem("meetsync-token")

export function addOneEvent(datas){
    return axios.post(`${config.api_url}/api/event/add`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err) => {
        console.log(err)
        return err
    })
}

export function loadAllEvents(){
    return axios.get(`${config.api_url}/api/event/all`)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function loadAllUserEvents(user_id){
    return axios.get(`${config.api_url}/api/event/all/${user_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function loadOneEvent(id){
    return axios.get(`${config.api_url}/api/event/one/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export function updateEvent(datas, id) {
    return axios.put(`${config.api_url}/api/event/update/${id}`, datas, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res.data
        })
        .catch((err) => {
            return err
        })
}

export function deleteEvent(id) {
    return axios.delete(`${config.api_url}/api/event/delete/${id}`, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res.data
        })
        .catch((err) => {
            return err
        })
}
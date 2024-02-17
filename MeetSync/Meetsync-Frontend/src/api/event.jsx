import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem("meetsync-token")

//Event
export function addOneEvent(datas){
    return axios.post(`${config.api_url}/api/event/add`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err) => {
        return err
    })
}

export function loadAllEvents(){
    return axios.get(`${config.api_url}/api/event/all`)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function loadAllUserEvents(user_id){
    return axios.get(`${config.api_url}/api/event/all/${user_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function loadOneEvent(id){
    return axios.get(`${config.api_url}/api/event/one/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function updateEvent(datas, event_id) {
    return axios.put(`${config.api_url}/api/event/update/${event_id}`, datas, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}

export function deleteEvent(id) {
    return axios.delete(`${config.api_url}/api/event/delete/${id}`, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}

//Event day
export function addEventDay(datas) {
    return axios.post(`${config.api_url}/api/event/eventday/add`, datas, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}

export function getEventDays(event_id) {
    return axios.get(`${config.api_url}/api/event/eventday/all/${event_id}`)
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}

export function getEventDay(event_id) {
    return axios.get(`${config.api_url}/api/event/eventday/${event_id}`)
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}

export function updateEventDay(datas, id) {
    return axios.put(`${config.api_url}/api/event/eventday/update/${id}`, datas, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}

export function deleteEventDay(id) {
    return axios.delete(`${config.api_url}/api/event/eventday/update/${id}`, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}

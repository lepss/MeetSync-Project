
import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem("meetsync-token")

export function registerUser(datas) {
    return axios.post(`${config.api_url}/api/user/register`, datas)
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}

export function loginUser(datas) {
    return axios.post(`${config.api_url}/api/user/login`, datas)
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}

export function updateUserProfil(datas, key_id) {
    return axios.put(`${config.api_url}/api/user/update/${key_id}`, datas, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}

export function updateUserPict(datas, key_id) {
    return axios.put(`${config.api_url}/api/user/updatePict/${key_id}`, datas, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}

export function updateUserRole(datas, key_id) {
    return axios.put(`${config.api_url}/api/user/updateRole/${key_id}`, datas, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}

export function loadOneUser(key_id){
    return axios.get(`${config.api_url}/api/user/${key_id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function loadAllUser(){
    return axios.get(`${config.api_url}/api/users`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export function checkMyToken() {
    return axios.get(`${config.api_url}/api/checkUserToken`, {headers: {"x-access-token": token}})
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
}

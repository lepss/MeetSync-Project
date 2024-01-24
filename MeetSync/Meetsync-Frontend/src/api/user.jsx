import axios from "axios"
import {config} from "../config"
const token = window.localStorage.getItem("meetsync-token")

export function addOneUser(datas) {
    return axios.post(`${config.api_url}/api/user/save`, datas)
        .then((res)=>{
            return res.data
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

export function loginUser(datas) {
    return axios.post(`${config.api_url}/api/user/login`, datas)
        .then((res)=>{
            return res.data
        })
        .catch((err) => {
            return err
        })
}
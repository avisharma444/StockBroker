import axios from "axios";

export const makeReq = axios.create({
    baseURL : "http://localhost:8080/server",
    withCredentials : true,
})
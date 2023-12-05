import { isExpired, decodeToken } from "react-jwt";
import axios from 'axios';
const apiBaseURL = 'https://gp-ap-is.vercel.app/api/v1'

export const GET = url => {
    return axios.get(`${apiBaseURL}/${url}`);
}

// if need for headers etc.

export const POST = (url, data) => {
    return axios(`${apiBaseURL}/${url}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            
        },
        data,
    });
}

export const PUT = (url, data) => {
    return axios(`${apiBaseURL}/${url}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            
        },
        data,
    });
}

export const PATCH = (url, data) => {
    return axios(`${apiBaseURL}/${url}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            
        },
        data,
    });
}


const token = localStorage.getItem('token')
export const myDecodedToken = decodeToken(token);





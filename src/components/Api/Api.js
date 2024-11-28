import axios from "axios";
const url = process.env.REACT_APP_API_URL;
console.log(process.env.REACT_APP_API_URL);

export const loginApiConnection = async (body) => {
    try {
        return axios.post(`${url}/login`, body);
    } catch (error) {
        console.log(error);
    }
}


export const registerApiConnection = async (body) => {
    try {
        return axios.post(`${url}/register`, body);
    } catch (error) {
        console.log(error);
    }
}
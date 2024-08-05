import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export async function requestBag(bag) {
    return axios.post(`${apiUrl}/bags`, bag)
        .then(res => res.data);
}
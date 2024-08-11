import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export async function requestBag(bag) {
    return await axios.post(`${apiUrl}/bags`, bag, {
        headers: {'Content-Type': 'application/json'}
    })
        .then(res => res.data);
}
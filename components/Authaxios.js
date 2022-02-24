import axios from 'axios'

export default function Authaxios() {
    const BaseUrl = process.env.API_URL
    let Accessoken
    const data = localStorage.getItem('auth')
    if (data) {
        Accessoken = JSON.parse(data).token
    }

    let req = axios.create({
        baseURL: BaseUrl,
        headers: {
            Authorization:
                `Bearer ${Accessoken}`
        }
    })
    return req
}


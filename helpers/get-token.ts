import {API_SERVER} from './config'

export type TokenResponse = {
    access_token: string,
    token_type: string
}

const getToken = (username: string, password: string) => {
    const data = `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
    
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
    }

    return fetch(`${API_SERVER}/token`, options)
        .then(res => {
            if (res) return res.json()
        })
}

export default getToken
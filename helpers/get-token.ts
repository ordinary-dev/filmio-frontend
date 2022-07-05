import {get_backend_address} from './config'

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

    return fetch(`${get_backend_address()}/token`, options)
        .then(res => {
            if (res) return res.json()
        })
}

export default getToken
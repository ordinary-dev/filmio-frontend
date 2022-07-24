import Cookies from 'js-cookie'

export const advFetch = (res: RequestInfo, init: RequestInit) => {
    const token = Cookies.get('access_token')
    if (!token) throw new Error('No access token')
    
    const options = init ? init : {} as RequestInit

    const headers = options.headers ? new Headers(options.headers) : new Headers()
    headers.set('Authorization', `Bearer ${token}`)
    options.headers = headers

    return fetch(res, options).then(res => res.json())
}

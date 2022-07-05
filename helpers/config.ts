export const get_backend_address = () => {
    let backend_host = process.env.BACKEND_HOST ? process.env.BACKEND_HOST : 'filmio-backend'
    if (!backend_host.startsWith('http')) {
        backend_host = 'http://' + backend_host
    }
    const backend_port = process.env.BACKEND_PORT ? process.env.BACKEND_PORT : '8000'
    return `${backend_host}:${backend_port}`
}
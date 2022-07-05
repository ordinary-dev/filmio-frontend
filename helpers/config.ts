export const get_backend_address = () => {
    let backend_ip = process.env.BACKEND_IP ? process.env.BACKEND_IP : 'localhost'
    if (!backend_ip.startsWith('http')) {
        backend_ip = 'http://' + backend_ip
    }
    const backend_port = process.env.BACKEND_PORT ? process.env.BACKEND_PORT : '8000'
    return `${backend_ip}:${backend_port}`
}
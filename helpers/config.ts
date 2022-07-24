const getConfig = (envVar: string|undefined, defaultValue: string) => {
	if (envVar) return envVar
	return defaultValue
}

export const get_backend_address = () => {
    const backendScheme = getConfig(process.env.NEXT_PUBLIC_BACKEND_SCHEME, 'http')	
    const backendHost   = getConfig(process.env.NEXT_PUBLIC_BACKEND_HOST, 'localhost')
    const backendPort   = getConfig(process.env.NEXT_PUBLIC_BACKEND_PORT, '8000')
    return `${backendScheme}://${backendHost}:${backendPort}`
}

export const getURL = (endpoint: string) => {
    return `${get_backend_address()}${endpoint}`
}

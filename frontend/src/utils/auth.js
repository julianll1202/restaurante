import API from "./api"

export const login = async(username, password) => {
    const res = await API.post('users/login', {
        username: username, password: password
    })
    return res;
}

export const prueba = async () => {
    const res = await API.get('/')
    return res;
}
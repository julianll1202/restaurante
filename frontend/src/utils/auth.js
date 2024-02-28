import API from "./api"

export const login = async(username, password) => {
    const res = await API.post('users/login', {
        username: username, password: password
    })
    return res;
}
import API from "./api"

export const login = async(username, password) => {
    const { data, status } = await API.post('users/login', {
        username: username, password: password
    })
    console.log(data)
    console.log(status)
}
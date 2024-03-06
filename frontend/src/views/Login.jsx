import { Button, Group, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { login } from "../utils/auth";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "../contexts/AuthProvider";
import useAxiosClient from "../utils/createAxiosClient";

const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const API = useAxiosClient()

    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate();
    const handleLogin = async(values) => {
        const res = await API.post('users/login', {
        username: values.username, password: values.password
    })
        if (res.status === 200) {
            Cookies.set('accessToken', res.data.accessToken);
            setAuth({ user: res.data.user, accessToken: res.data.accessToken });
            navigate(from, { replace: true })
        }
    };

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
    })
    return (
        <Group justify="center" align="center" >
            <Title >Login</Title>
            <form onSubmit={form.onSubmit(handleLogin)}>
                <TextInput label="Username" withAsterisk required {...form.getInputProps('username')}/>
                <PasswordInput label="Password" withAsterisk required {...form.getInputProps('password')}/>
                <Button type="submit" mt={10} variant='filled' color='brown.9' >Iniciar sesión</Button>
            </form>
        </Group>
    );
};

export default Login;
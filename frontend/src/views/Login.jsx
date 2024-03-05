import { Button, Group, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { login } from "../utils/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";
import Cookies from "js-cookie";

const Login = () => {
    const setUser = useContext(UserContext).storeUser;
    const setLogState = useContext(UserContext).setLoggedState
    const navigate = useNavigate();
    const handleLogin = async(values) => {
        const res = await login(values.username, values.password);
        if (res.status === 200) {
            Cookies.set('accessToken', res.data.accessToken);
            setUser(res.data.user);
            setLogState(true);
            navigate('/')
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
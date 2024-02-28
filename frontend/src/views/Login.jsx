import { Button, Group, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { login } from "../utils/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";

const Login = () => {
    const setUser = useContext(UserContext).storeUser;
    const setLogState = useContext(UserContext).setLoggedState
    const navigate = useNavigate();
    const handleLogin = async(values) => {
        const res = await login(values.username, values.password);
        if (res.status === 200) {
            setUser(res.data);
            setLogState(true);
            navigate('/inicio')
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
            <Title>Login</Title>
            <form onSubmit={form.onSubmit(handleLogin)}>
                <TextInput label="Username" withAsterisk required {...form.getInputProps('username')}/>
                <PasswordInput label="Password" withAsterisk required {...form.getInputProps('password')}/>
                <Button type="submit" >Iniciar sesión</Button>
            </form>
        </Group>
    );
};

export default Login;
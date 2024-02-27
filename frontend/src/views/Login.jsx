import { Button, Group, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { login } from "../utils/auth";

const Login = () => {
    const handleLogin = async(values) => {
        const { error } = await login(values.username, values.password);
        if (error) {
            console.log(error);
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
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from './../hooks/useAuth';
import { ActionIcon, Anchor, AppShell, Button, Group, Menu, Title } from "@mantine/core";
import { Bell, Settings, Soup, UserCircle } from "tabler-icons-react";

const MainLayout = () => {
    const { auth } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    return (
        auth?.user ?
        <AppShell>
            <AppShell.Header>
                <Group justify="space-between" bg='orange' p={10}>
                    <Group>
                        <Group gap='xs'>
                            <Soup color="white" />
                            <Title c='white' order={3}><Link to='/'>AltaServe</Link></Title>
                        </Group>
                        <Group h="100%" px="md">
                            {/*<Anchor c="white">Comandas</Anchor>*/}
                            <Link to='/comandas'>Comandas</Link>
                            <Link to='/platillos'>Platillos</Link>
                            <Link to='/inventario'>Inventario</Link>
                            <Link to='/empleados'>Empleados</Link>
                        </Group>
                    </Group>
                    <Group>
                        <Button color="brown.9" onClick={async () => navigate('/mesas')}>Crear comanda</Button>
                        <ActionIcon>
                            <Settings />
                        </ActionIcon>
                        <ActionIcon>
                            <Bell />
                        </ActionIcon>
                        {/* Menu de usuario */}
                        <Menu trigger="hover" openDelay={100} closeDelay={400}>
                            <Menu.Target>
                                <ActionIcon variant="filled" mr={10}>
                                    <UserCircle size={70} />
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item>MI PERFIL</Menu.Item>
                                <Menu.Item>LISTA DE USUARIOS</Menu.Item>

                                <Menu.Item>CAMBIO DE CONTRASEÑA</Menu.Item>
                                <Menu.Item>CERRAR SESION</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Main mt={50} p={20} w='100vw'>
                <Outlet />
            </AppShell.Main>
        </AppShell>
        : <Navigate to="/iniciar-sesion"  state={{ from: location }} replace/>
    );
};

export default MainLayout;
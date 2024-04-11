import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from './../hooks/useAuth';
import { ActionIcon, AppShell, Button, Group, Menu, Title } from "@mantine/core";
import { Bell, Settings, Soup, UserCircle } from "tabler-icons-react";
import { getRol } from "../utils/auth";
import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import ModalLogout from "../components/ModalLogout";
import { useDisclosure } from '@mantine/hooks';

const MainLayout = () => {
    const { auth, persist, canEdit, setCanEdit } = useAuth()
    const [permisos, setPermisos] = useState([])
    const location = useLocation()
    const refresh = useRefreshToken();
    const [opened, {open, close}] = useDisclosure(false);

    const getUserRole = async () => {
        const userRole = JSON.parse(localStorage.getItem('user_role')) || 0
        if (userRole > 0) {
            const rol = await getRol(userRole)
            setPermisos(rol.permits)
        } else {
            setPermisos([])
        }
    }

    const isAuthorized = (permits) => {
        let valid = false
        let editable = false
        if (permits.length > 0) {
            if (location.pathname.split('/')[1] === '') {
                valid = true
            } else {
                for (let i = 0; i < permits.length; i++) {
                    if (i === (permits.length - 1))
                        editable = false
                    if (permits[i].permit.area === location.pathname.split('/')[1].toUpperCase()) {
                        valid = true
                        if (permits[i].permit.action === 'EDITAR') {
                            console.log(permits[i].permit.action)
                            editable = true
                        }
                    }
                }
            }
        }
        setCanEdit(editable)
        console.log(canEdit)
        return valid
    }
    const verifyRefreshToken = async () => {
        try {
            console.log('verifyRefreshToken')
            const res = await refresh();
            if (res === 'No refresh token available')
                navigate('/iniciar-sesion')
        }
        catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        if (persist === true) {
            console.log('persist is true')
            verifyRefreshToken()
        }
    })
    useEffect(() => {
        getUserRole()
    }, [location])

    const navigate = useNavigate()
    return (
        (auth?.user || persist === true) ? isAuthorized(permisos)  ?
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
                            <Link to='/productos'>Inventario</Link>
                            <Link to='/empleados'>Empleados</Link>
                            <Link to='/compras'>Compras</Link>
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
                                <Menu.Item onClick={open}>CERRAR SESION</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Main mt={50} p={20} w='100vw'>
            <ModalLogout opened={opened} close={close} />
                <Outlet />
            </AppShell.Main>
        </AppShell>
        : <Navigate to="/" /> : <Navigate to="/iniciar-sesion" state={{ from: location }} replace />
    );
};

export default MainLayout;
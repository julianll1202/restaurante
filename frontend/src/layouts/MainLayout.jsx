import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from './../hooks/useAuth';
import { ActionIcon, AppShell, Button, Group, Menu, Title } from "@mantine/core";
import { Bell, Settings, Soup, UserCircle } from "tabler-icons-react";
import { getRoles } from "../utils/auth";
import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";

const MainLayout = () => {
    const { auth, persist } = useAuth()
    const [roles, setRoles] = useState([])
    const location = useLocation()
    const refresh = useRefreshToken();

    const getRolesList = async () => {
        const rolesL = await getRoles()
        const r = getAllowedRoles(rolesL)
        setRoles(r)
    }
    const getAllowedRoles = (rolesL) => {
        const allowedRoles = []
        if (location.pathname.split('/')[1] === '')
            return rolesL
        for(let i = 0; i < rolesL.length; i++) {
            let valid = false
            for (let j = 0; j < rolesL[i].permits.length; j++) {
                if (rolesL[i].permits[j].permit.area === location.pathname.split('/')[1].toUpperCase()) {
                    if (location.pathname.split('/').length > 2) {
                        if (rolesL[i].permits[j].permit.area.action === 'EDITAR')
                            valid = true
                    } else {
                        valid = true
                    }
                }
            }
            if (valid)
                allowedRoles.push(rolesL[i])
        }
        return allowedRoles
    }

    const isAuthorized = (rolesL) => {
        let valid = false
        console.log(auth)
        const userRole = JSON.parse(localStorage.getItem('user_role'))
        for (let i = 0; i < rolesL.length; i++) {
            if (rolesL[i].roleId === Number(userRole)) {
                valid = true
                break
            }
        }
        console.log(valid)
        return valid
    }
    const verifyRefreshToken = async () => {
        try {
            console.log('verifyRefreshToken')
            await refresh();
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
        console.log(persist)
        getRolesList()
    }, [location])

    const navigate = useNavigate()
    return (
        (auth?.user || persist === true) ? isAuthorized(roles)  ?
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
        : <Navigate to="/" /> : <Navigate to="/iniciar-sesion" state={{ from: location }} replace />
    );
};

export default MainLayout;
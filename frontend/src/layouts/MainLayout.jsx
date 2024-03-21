import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from './../hooks/useAuth';
import { ActionIcon, AppShell, Button, Group, Menu, Title } from "@mantine/core";
import { Bell, Settings, Soup, UserCircle } from "tabler-icons-react";
import { getRoles } from "../utils/auth";
import { useEffect, useState } from "react";
import { all } from "axios";

const MainLayout = () => {
    const { auth } = useAuth()
    const [roles, setRoles] = useState([])
    const location = useLocation()
    const getRolesList = async () => {
        const rolesL = await getRoles()
        setRoles(rolesL)
        console.log(rolesL)
        console.log(location.pathname.split('/'))
    }
    const getAllowedRoles = () => {
        const allowedRoles = []
        if (location.pathname.split('/')[1] === '')
            return roles
        for(let i = 0; i < roles.length; i++) {
            let valid = false
            for (let j = 0; j < roles[i].permits.length; j++) {
                if (roles[i].permits[j].area === location.pathname.split('/')[1].toUpperCase()) {
                    if (location.pathname.split('/').length > 2) {
                        if (roles[i].permits[j].area.action === 'EDITAR')
                            valid = true
                    } else {
                        valid = true
                    }
                }
            }
            if (valid)
                allowedRoles.push(roles[i])
        }
    }
    const isAuthorized = () => {
        // auth.user.roleId
        getRolesList()
        const allowedRoles = getAllowedRoles()
        console.log(allowedRoles)
        let valid = false
        if (auth.user) {
            for (let i = 0; i < allowedRoles.length; i++) {
                console.log(allowedRoles[i])
                if (allowedRoles[i].roleId === auth.user.roleId) {
                    valid = true
                    break
                }
            }
        }
        console.log(valid)
        return valid
    }
    useEffect(() => {
        getRolesList()
    }, [auth])
    const navigate = useNavigate()
    return (
        roles.length > 0 ? isAuthorized()  ?
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
        : <Navigate to="/iniciar-sesion" state={{ from: location }} replace /> : null
    );
};

export default MainLayout;
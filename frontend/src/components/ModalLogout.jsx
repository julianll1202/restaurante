import { Button, Group, Modal } from "@mantine/core";
import { Logout } from "tabler-icons-react";
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { logout } from "../utils/auth";


const ModalLogout = ({opened, close}) => {
    const navigate = useNavigate();
    const handleLogout = async() => {
        await logout();
        navigate('/iniciar-sesion');
      };

    return (
        <Modal.Root opened={opened} close={close}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title><b>Cerrar Sesión</b></Modal.Title>
                    <Modal.CloseButton onClick={close} bg="gris" color="negro"/>
                </Modal.Header>
                <Modal.Body>
                    ¿Estas seguro de que deseas cerrar sesión? Todos los cambios no guardados serán descartados.
                    <Group position="center" mt={16}>
                        <Button leftIcon={<Logout />} onClick={handleLogout} color="orange">Cerrar Sesión</Button>
                        <Button color="light-brown" onClick={close}>Cancelar</Button>
                    </Group>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

ModalLogout.propTypes = {
    opened: PropTypes.bool,
    close: PropTypes.func
};
export default ModalLogout;
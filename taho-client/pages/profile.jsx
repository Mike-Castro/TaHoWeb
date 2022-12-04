import React, {useState} from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import { apiServer } from '../config/index.js';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';

export const getServerSideProps = async (ctx) => {
    const res = await fetch(`${apiServer}/user/auth`, {
        credentials: 'include',
        headers: ctx.req.headers,
    });
    if (res.status !== 201) {
        return {
            redirect: {
                permanent: false,
                destination: '/login',
            },
        };
    }
    const body = await res.json();
    return { props: { user: body.user, isWorker: body.isWorker } };
};

export default function Profile({ user, isWorker }) {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    };
    const logout = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${apiServer}/user/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            location.assign('/');
        } catch (err) {
            console.log(err);
        }
        document.cookie = 'authcookie=;expires=' + new Date().toUTCString();
    };
    return (
        <>
            <link
                href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'
                rel='stylesheet'
            ></link>
            <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'></script>
            <link
                rel='stylesheet'
                href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
            ></link>
            <Header user={user} />
            <br></br>
            <br></br>
            <br></br>
            <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Button className='btn btn-primary' variant='primary' onClick={handleShow}>Mi Perfil</Button>
            </Box>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{isWorker ? 'Trabajador' : 'Usuario'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>Nombre: {user.firstName}</div> <hr/>
                        <div className='row'>Apellido: {user.lastName}</div> <hr/>
                        <div className='row'>Teléfono: {user.phone}</div><hr/>
                        {isWorker ? <><div className='row'>Servicios: {user.services}</div><hr/></> : null}
                        {isWorker ? <div className='row'>Descripción: {user.description}</div> : null}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Guardar cambios
                    </Button>
                    </Modal.Footer>
                </Modal>

                <br></br>
                <Box
                    m={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Button onClick={logout}>Cerrar Sesión</Button>
                </Box>
            <Footer />
        </>
    );
}

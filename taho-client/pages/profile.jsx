import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import { apiServer } from '../config/index.js';

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

            <Button
                className='btn btn-primary'
                data-bs-toggle='modal'
                data-bs-target='#myModal'
            >
                Mi Perfil
            </Button>

            <div className='modal fade' id='myModal'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='modal-title'>
                                {isWorker ? 'Trabajador' : 'Usuario'}
                            </h4>
                            <Button
                                className='btn-close'
                                data-bs-dismiss='modal'
                            ></Button>
                        </div>

                        <div className='modal-body'>
                            <div className='row'>
                                <div className='col-md-4'>Nombre</div>
                                <div className='col-md-4 ms-auto'>
                                    {user.firstName}
                                </div>
                            </div>
                            <hr />
                            <div className='row'>
                                <div className='col-md-4'>Apellido</div>
                                <div className='col-md-4 ms-auto'>
                                    {user.lastName}
                                </div>
                            </div>
                            <hr />
                            <div className='row'>
                                <div className='col-md-4'>Telefono</div>
                                <div className='col-md-4 ms-auto'>
                                    {user.phone}
                                </div>
                            </div>
                        </div>

                        <div className='modal-footer'>
                            <Button
                                className='btn btn-secondary'
                                data-bs-dismiss='modal'
                            >
                                Cerrar
                            </Button>
                            <Button className='btn btn-primary'>
                                Guardar cambios
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

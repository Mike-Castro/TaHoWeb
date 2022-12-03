import React from 'react';
import Header from '../components/Header';
import Image from 'next/image';
import Footer from '../components/Footer';
import { apiServer } from '../config/index.js';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import albanil from '../images/albanil.png';
import carpintero from '../images/carpintero.png';
import cerrajero from '../images/cerrajero.png';
import electricista from '../images/electricista.png';
import jardinero from '../images/jardinero.png';
import limpieza from '../images/limpieza.png';
import ninera from '../images/ninera.png';
import pintor from '../images/pintor.png';
import plomero from '../images/plomero.png';

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
    if (body.isWorker) {
        return {
            redirect: {
                permanent: false,
                destination: '/calls',
            },
        };
    }
    return { props: { user: body.user } };
};

const jobs = ['Albañil', 'Carpintero', 'Cerrajero', 'Electricista', 'Jardinero', 'Limpieza', 'Niñera', 'Pintor', 'Plomero'];
const jobsImg = [albanil.src, carpintero.src, cerrajero.src, electricista.src, jardinero.src, limpieza.src, ninera.src, pintor.src, plomero.src];


export default function Home({ user }) {
    return (
        <>
            <Header user={user} />
            <main>
                <div className='icons'>
                    <h1>¿Qué estas buscando?</h1>
                    <Row xs={2} md={4} className="g-4">{Array.from({ length: 1  }).map((_, idx) => (
                    <Col>
                        {jobsImg.map((value, index) => {
                            return (
                            <div className='row'>
                            <Link href={'/find/' + jobs[index]}>
                                <div className='icon'>
                                    <Image
                                        id={jobs[index]}
                                        src={value}
                                        width='50px'
                                        height='50px'
                                    />
                                    <br />
                                    <span>{jobs[index]}</span>
                                </div>
                            </Link>
                            </div>)
                        })}
                    </Col>
                    ))}
                    </Row>
                </div>
            </main>
            <Footer />
        </>
    );
}

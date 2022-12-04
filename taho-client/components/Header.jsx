import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import taho_logo from '../images/taho_logo.png';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { apiServer } from '../config';
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

export default function Header({ user, isWorker }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const seeProfile = () => {
        location.assign('/profile');
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

    const [show, setShow] = React.useState(false);
    const handleClose = () => {
        setAnchorEl(null);
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    };
    const handleUnshow = () => {
        setAnchorEl(null);
        setShow(false);
    };
    const [isModalOpen, setIsModalOpen] = React.useState(false);

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
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Link href='/home'>
                <Button>
                    <Image
                        id='taho_logo'
                        src={taho_logo}
                        width={202}
                        height={88}
                    />
                </Button>
            </Link>

            <Button
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={seeProfile}
                sx={{
                    backgroundColor: '#4cd5ff',
                    borderRadius: '20px',
                    textTransform: 'none',
                }}
            >
                <Typography
                    variant='h6'
                    noWrap
                    component='div'
                    sx={{ padding: '5px' }}
                >
                    {user.username}
                </Typography>
            </Button>
        </Toolbar>
        </>
    );
}

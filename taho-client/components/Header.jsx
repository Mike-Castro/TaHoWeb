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

    const handleClose = () => {
        setAnchorEl(null);
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
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    return (
        <>
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
                onClick={handleClick}
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
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={seeProfile}>Mi cuenta</MenuItem>
                <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
            </Menu>
        </Toolbar>
        </>
    );
}

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
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

const WorkerTile = ({
    workerService,
    firstName,
    lastName,
    services,
    phone,
    certificates,
    description,
}) => {
    const workerImage = {
        Albañil: albanil,
        Carpintero: carpintero,
        Cerrajero: cerrajero,
        Electricista: electricista,
        Jardinero: jardinero,
        Limpieza: limpieza,
        Niñera: ninera,
        Pintor: pintor,
        Plomero: plomero,
    };

    function getWorkerImage() {
        switch (services) {
            case 'Albañil':
                return albanil;
            case 'Carpintero':
                return carpintero;
            case 'Cerrajero':
                return cerrajero;
            case 'Electricista':
                return electricista;
            case 'Jardinero':
                return jardinero;
            case 'Limpieza':
                return limpieza;
            case 'Niñera':
                return ninera;
            case 'Pintor':
                return pintor;
            case 'Plomero':
                return plomero;
            default:
                return workerService ? workerService.split(',')[0] : albanil;
        }
    }

    return (
        <Row xs={2} md={2} className="g-4">{Array.from({ length: 1  }).map((_, idx) => (
        <Col>
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                margin: '8px',
                width: '500px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 180,
                    fontSize: '72px',
                }}
            >
                <Image
                    className='card-img-top'
                    src={getWorkerImage()}
                    alt='Card image cap'
                    width={150}
                    height={85}
                />
            </Box>
            <Divider />
            <Box
                sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}
            >
                <Typography noWrap sx={{ flex: 1, marginLeft: '8px' }}>
                    Nombre: {firstName} {lastName}
                </Typography>
            </Box>
            <Box
                sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}
            >
                <Typography noWrap sx={{ flex: 1, marginLeft: '8px' }}>
                    Servicios: {services}
                </Typography>
            </Box>
            <Box
                sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}
            >
                <Typography noWrap sx={{ flex: 1, marginLeft: '8px' }}>
                    Teléfono: {phone}
                </Typography>
            </Box>
            <Box
                sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}
            >
                <Typography noWrap sx={{ flex: 1, marginLeft: '8px' }}>
                    Certificados: {certificates}
                </Typography>
            </Box>
            <Box
                sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}
            >
                <Typography style={{wordWrap:"break-word"}} >
                    Descripción: {description}
                </Typography>
            </Box>
        </Card>
        </Col>
        ))}
        </Row>
    );
};

export default WorkerTile;

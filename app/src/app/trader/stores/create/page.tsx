"use client";
import dynamic from 'next/dynamic';
import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";

import MyLocationIcon from '@mui/icons-material/MyLocation';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Checkbox, FormControl, FormGroup, InputLabel, MenuItem, Paper, Select, FormControlLabel, Box } from "@mui/material";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/constants";
import { toast } from "react-toastify";
import mensajes from "@/app/components/Mensajes";
// import MapWithDrawNodes from '@/app/components/MapWithDrawNodes';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { LatLngExpression } from "leaflet";
import { MapContainerProps } from 'react-leaflet';
import { getProductsByName } from '@/services/product.service';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { createStore } from '@/services/store.service';

// Dinamicamente importar MapContainer
// const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const MapContainer = dynamic<MapContainerProps>(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
  );
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
// Dinamicamente importar MapContainer y TileLayer
const MapWithDrawNodes = dynamic(() => import('@/app/components/MapWithDrawNodes'), { ssr: false });

const storeInitialState = {
    name: "",
    latitude: (DEFAULT_MAP_CENTER as [number, number])[0].toString(),
    longitude: (DEFAULT_MAP_CENTER as [number, number])[1].toString(),
    address: null,
    photos: [],
    reference: "",
    campus: "",
    block: null,
    floor: null,
    enviroment: null,
    subEnviroment: null,
    status: true,
};

export default function StoreWithProducts() {
    // const [area, setArea] = useState('');
    const [name, setName] = useState('');
    const { getToken, getUser } = useAuth();
    const [token, setToken] = useState( () => getToken());
    const [user, setUser] = useState(() => getUser());
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        vision: "",
        mision: "",
        logo: ""
    });
    const [store, setStore] = useState(storeInitialState);
    const router = useRouter();

    const markerRef = useRef();

    const handleMarkerDrawn = (markerCoordinates : any) => {
        const coordinates = markerCoordinates.geometry.coordinates;
        setStore((prevState) => ({
            ...prevState,
            latitude: coordinates[1],
            longitude: coordinates[0],
        }));
    };
    const handleCreateStore = async (event : any) => {
        event.preventDefault();
        console.log('INICIOOOO');
        const data = new FormData(event.currentTarget);
        const body = {
            name: data.get("name"),
            description: data.get("description"),
            vision: data.get("vision"),
            mision: data.get("mision"),
            logo: data.get("logo"),
            views: "cero",
            ubication: `${store.latitude}, ${store.longitude}`,
            traderId: user?.rolId
        }

        console.log(body)
        try {
            await createStore(body);
            mensajes("Éxito", "Tienda creada");
            router.push('/trader/stores');
        } catch (error : any) {
            console.log('ERROR');
            console.log(error);
            mensajes("No se pudo realizar la búsqueda", error?.response?.data?.customMessage || "No se ha podido realizar la búsqueda", "error");
        }
    }
    const handleBlur = (event:any) => {
        const { name, value } = event.target;
        // Validación básica de campos requeridos
        switch (name) {
            case "name":
                setErrors((prevErrors) => ({
                ...prevErrors,
                name: value ? "" : "El nombre es requerido",
                }));
                break;
            case "description":
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  description: value ? "" : "La descripción es requerida",
                }));
                break;

            case "vision":
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  vision: value ? "" : "La visión es requerida",
                }));
                break;

            case "mision":
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  mision: value ? "" : "La misión es requerida",
                }));
                break;
            
            case "logo":
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  logo: value ? "" : "El logo es requerido",
                }));
                break;
            // Agregar más validaciones según sea necesario para los demás campos
          default:
            break;
        }
      };


    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
                // elevation={3}
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}

            >
                {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <MyLocationIcon />
                </Avatar> */}
                <Typography component="h1" variant="h4">
                    Crear Tienda
                </Typography>
                <Box component="form" noValidate onSubmit={handleCreateStore} sx={{ mt: 3 }} >

                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {/* Información básica */}
                            <Grid item xs={12} sm={6}>
                                <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="name"
                                mb="5px"
                                id="name"

                                >
                                Nombre
                                </Typography>
                                <CustomTextField 
                                onBlur={handleBlur}
                                error={!!errors.name}
                                helperText={errors.name}
                                autoComplete="given-name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                autoFocus 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="name"
                                mb="5px"
                                id="name"

                                >
                                Descripción
                                </Typography>
                                <CustomTextField 
                                    onBlur={handleBlur}
                                    error={!!errors.description}
                                    helperText={errors.description}
                                    autoComplete="given-name"
                                    name="description"
                                    required
                                    fullWidth
                                    id="description"
                                    autoFocus 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="vision"
                                mb="5px"
                                id="name"

                                >
                                Vision
                                </Typography>
                                <CustomTextField 
                                    onBlur={handleBlur}
                                    error={!!errors.vision}
                                    helperText={errors.vision}
                                    autoComplete="given-name"
                                    name="vision"
                                    required
                                    fullWidth
                                    id="vision"
                                    autoFocus 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="name"
                                mb="5px"
                                id="name"

                                >
                                Misión
                                </Typography>
                                <CustomTextField 
                                    onBlur={handleBlur}
                                    error={!!errors.mision}
                                    helperText={errors.mision}
                                    autoComplete="given-name"
                                    name="mision"
                                    required
                                    fullWidth
                                    id="mision"
                                    autoFocus 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                component="label"
                                htmlFor="logo"
                                mb="5px"
                                id="name"

                                >
                                Logo
                                </Typography>
                                <CustomTextField 
                                    onBlur={handleBlur}
                                    error={!!errors.logo}
                                    helperText={errors.logo}
                                    autoComplete="given-name"
                                    name="logo"
                                    required
                                    fullWidth
                                    id="logo"
                                    autoFocus 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6">
                                    Coordenadas
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={6}>
                                <TextField
                                    fullWidth
                                    disabled
                                    id="latitude"
                                    value={store.latitude}
                                    label="Latitud"
                                    name="latitude"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="longitude"
                                    required
                                    disabled
                                    fullWidth
                                    id="longitude"
                                    label="Longitud"
                                    autoFocus
                                    value={store.longitude}
                                />
                            </Grid>
                            
                        </Grid>

                        <MapContainer
                            style={{ width: "100%", height: "60vh", marginTop: 20 }}
                            center={DEFAULT_MAP_CENTER}
                            zoom={DEFAULT_MAP_ZOOM}
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <MapWithDrawNodes
                                onMarkerDrawn={handleMarkerDrawn}
                                markerRef={markerRef}
                                latitude={store.latitude}
                                longitude={store.longitude}
                            />
                        </MapContainer>
                        <Grid item xs={12} sm={12} mt={4} container alignItems={'center'} justifyContent={'center'}>
                                <Button variant="contained" type='submit' sx={{
                                    padding: "15px",
                                    paddingLeft: "25px",
                                    paddingRight: "25px"
                                }}>
                                    Crear
                                </Button>
                        </Grid>
                    </Box>
                </Box>

            </Box>
        </Container>
    );
}

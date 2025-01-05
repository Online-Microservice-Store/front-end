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
    const { token } = useAuth();
    const [errors, setErrors] = useState({
        name: "",
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
    const handleReseach = async (e : any) => {
        e.preventDefault();

        try {
            const products = await getProductsByName(name);
            console.log(products);
            mensajes("Éxito", "Búsqueda exitosa");
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
                    Buscar productos
                </Typography>
                <Paper elevation={3} sx={{ p: 4, mt: 4, width: '100%' }}>

                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {/* Información básica */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onBlur={handleBlur}
                                    error={!!errors.name}
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nombre"
                                    autoFocus
                                    onChange={ (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" onClick={handleReseach} sx={{
                                    padding: "15px",
                                    paddingLeft: "25px",
                                    paddingRight: "25px"
                                }}>
                                    Buscar
                                </Button>
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

                    </Box>
                </Paper>

            </Box>
        </Container>
    );
}

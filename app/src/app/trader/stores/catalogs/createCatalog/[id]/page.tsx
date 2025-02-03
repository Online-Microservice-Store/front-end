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
import { useParams, useRouter } from 'next/navigation';
import { LatLngExpression } from "leaflet";
import { MapContainerProps } from 'react-leaflet';
import { getProductsByName } from '@/services/product.service';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { createStore } from '@/services/store.service';
import { createCatalogs } from '@/services/catalog.service';

// Dinamicamente importar MapContainer
// const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });

export default function CreateCatalog() {
    // const [area, setArea] = useState('');
    const { getToken, getUser } = useAuth();
    const [token, setToken] = useState( () => getToken());
    const [user, setUser] = useState(() => getUser());
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        discount: "",
    });
    const {id} = useParams();
    const router = useRouter();

    const handleCreateCatalog = async (event : any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            name: data.get("name"),
            description: data.get("description"),
            discount: Number(data.get("discount")),
            storeId: id,
        }

        console.log(body)
        try {
            await createCatalogs(body);
            mensajes("Éxito", "Calagolo creado");
            router.push('/trader/stores');
        } catch (error : any) {
            console.log('ERROR');
            console.log(error);
            mensajes("No se pudo crear", error?.response?.data?.customMessage || "No se pudo crear", "error");
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

            case "discount":
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  discount: value ? "" : "El descuento es requerido",
                }));
                break;
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
                    Crear Catalogo
                </Typography>
                <Box component="form" noValidate onSubmit={handleCreateCatalog} sx={{ mt: 3 }} >

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
                                Descuento
                                </Typography>
                                <CustomTextField 
                                    onBlur={handleBlur}
                                    error={!!errors.discount}
                                    helperText={errors.discount}
                                    type="number"
                                    autoComplete="given-name"
                                    name="discount"
                                    required
                                    fullWidth
                                    id="discount"
                                    autoFocus 
                                    inputProps={{ min: 0 }}
                                />
                            </Grid>
                        </Grid>

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

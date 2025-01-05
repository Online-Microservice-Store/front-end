import React, { useRef } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import mensajes from "@/app/components/Mensajes";
import { MapContainer, TileLayer } from "react-leaflet";
import MapWithDrawNodes from "./MapWithDrawNodes";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/constants";
import { createInvoice } from "@/services/invoice.service";

interface RegisterType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export default function PaymentRegister ({ title, subtitle, subtext }: RegisterType) {
  const [area, setArea] = useState();
  const markerRef = useRef();
  const [direction, setDirection] = useState<any>({
    latitude: (DEFAULT_MAP_CENTER as [number, number])[0].toString(),
    longitude: (DEFAULT_MAP_CENTER as [number, number])[1].toString()
  });

  const [errors, setErrors] = useState({
    //order
    address: "",
    coordinate: "",
    identification: "",
    deliveryTime: "",
    status: "DELIVERED"
  });

  const router = useRouter();


  const handleMarkerDrawn = (markerCoordinates : any) => {
    const coordinates = markerCoordinates.geometry.coordinates;
    setDirection({ 
        latitude: coordinates[1],
        longitude: coordinates[0],
      });
    console.log(direction);
  };


  const handleSubmit = async (event : any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      address: data.get("address"),
      deliveryTime: data.get("deliveryTime"),
      coordinate: direction
    }
    console.log(body);
    try {
      await createInvoice(body);
      mensajes("Orden creada", "Se ha registrado exitosamente.");

      router.push("/")
    } catch (error:any) {
      console.log(error?.response?.data || error.message);
      console.log(error.response.data.message);
      if(Array.isArray(error.response.data.message)){
        mensajes("Error al crear la orden", error.response.data.message[0] || "No se ha podido crear la orden", "error");
      }else{
        mensajes("Error al crear la orden", error.response.data.message || error.response.data.message[0] || "No se ha podido crear la orden", "error");
      }

    }
  }

  const handleBlur = (event:any) => {
    const { name, value } = event.target;
    // Validación básica de campos requeridos
    switch (name) {
        case "adrress":
            setErrors((prevErrors) => ({
                ...prevErrors,
                adrress: value ? "" : "La dirección es requerida",
            }));
            break;
        case "coordinate":
            setErrors((prevErrors) => ({
                ...prevErrors,
                coordinate: value ? "" : "Las coordenadas son requeridas",
            }));
            break;
        case "deliveryTime":
            setErrors((prevErrors) => ({
              ...prevErrors,
              deliveryTime: value ? "" : "El tiempo de entrega es requerido",
            }));
            break;
        // Agregar más validaciones según sea necesario para los demás campos
        default:
            break;
    }
};

  return( 
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 6 }} >
        {/* Grid para organizar las entradas */}
        <Grid container spacing={2} mb={4}>
          {/* Nombre */}
          <Grid item xs={12} sm={12}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
              id="name"

            >
              Dirección
            </Typography>
            <CustomTextField 
              onBlur={handleBlur}
              error={!!errors.address}
              helperText={errors.address}
              autoComplete="given-name"
              name="address"
              required
              fullWidth
              id="address"
              autoFocus 
              />
          </Grid>

          {/* Apellido */}
          <Grid item xs={12} sm={12}>
            
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
                      latitude={direction.latitude}
                      longitude={direction.longitude}
                  />
              </MapContainer>

          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="apellido"
              mb="5px"
            >
              Fecha de entrega
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.deliveryTime}
              helperText={errors.deliveryTime}
              autoComplete="given-name"
              type="date"
              name="deliveryTime"
              required
              fullWidth
              id="deliveryTime"
              autoFocus 
            />
          </Grid>
        </Grid>

        {/* Botón de envío */}
        <Button
          color="success"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Comprar
        </Button>
      </Box>

      {subtitle}
    </>
  )
}


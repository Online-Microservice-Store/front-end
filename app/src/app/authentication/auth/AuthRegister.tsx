import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useState } from "react";
import { createClient } from "@/services/client.service";
import { useRouter } from "next/navigation";
import mensajes from "@/app/components/Mensajes";
interface RegisterType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export default function AuthRegister ({ title, subtitle, subtext }: RegisterType) {
  const [area, setArea] = useState();
  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    identification: "",
    username: "",
    email: "",
    password: "",
    ocupation: ""
  });

  const router = useRouter();

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    console.log('INICIOOOO');
    const data = new FormData(event.currentTarget);
    const body = {
      name: data.get("name"),
      lastname: data.get("lastname"),
      identification: data.get("identification"),
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      ocupation: data.get("ocupation")
    }
    console.log(body);
    try {
      await createClient(body);
      mensajes("Bienvenido usuario", "Se ha registrado exitosamente, ingrese con sus credenciales.");

      router.push("/")
    } catch (error:any) {
      console.log(error?.response?.data || error.message);
      console.log(error.response.data.message);
      if(Array.isArray(error.response.data.message)){
        mensajes("Error en inicio de sesion", error.response.data.message[0] || "No se ha podido iniciar sesión", "error");
      }else{
        mensajes("Error en inicio de sesion", error.response.data.message || error.response.data.message[0] || "No se ha podido iniciar sesión", "error");
      }

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
        case "lastname":
            setErrors((prevErrors) => ({
                ...prevErrors,
                lastname: value ? "" : "El apellido es requerido",
            }));
            break;
        case "identification":
            setErrors((prevErrors) => ({
              ...prevErrors,
              identification: value ? "" : "El número de cedula es requerido",
            }));
            break;   
        case "username":
            setErrors((prevErrors) => ({
              ...prevErrors,
              username: value ? "" : "El nombre de usuario es requerido",
            }));
            break; 
        case "email":
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? ""
                    : "Correo electrónico inválido",
            }));
            break;
        case "password":
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: value.length >= 8
                    ? ""
                    : "La contraseña debe tener al menos 8 caracteres",
            }));
            break;
        case "ocupation":
            setErrors((prevErrors) => ({
              ...prevErrors,
              ocupation: value ? "" : "La ocupación es requerida",
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

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
        {/* Grid para organizar las entradas */}
        <Grid container spacing={2} mb={4}>
          {/* Nombre */}
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
              onChange={event =>  {
                console.log(event.name);
              }}
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              autoFocus 
              />
          </Grid>

          {/* Apellido */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="apellido"
              mb="5px"
            >
              Apellido
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.lastname}
              helperText={errors.lastname}
              autoComplete="given-name"
              name="lastname"
              required
              fullWidth
              id="lastname"
              autoFocus 
            />
          </Grid>

          {/* CI */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="ci"
              mb="5px"
            >
              CI
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.identification}
              helperText={errors.identification}
              autoComplete="given-name"
              name="identification"
              required
              fullWidth
              id="identification"
              autoFocus 
            />
          </Grid>

          {/* Nombre de usuario */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              Nombre de usuario
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.username}
              helperText={errors.username}
              autoComplete="given-name"
              name="username"
              required
              fullWidth
              id="username"
              autoFocus
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="email"
              mb="5px"
            >
              Email
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.email}
              helperText={errors.email}
              autoComplete="given-email"
              name="email"
              required
              fullWidth
              id="email"
              autoFocus
            />
          </Grid>

          {/* Contraseña */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Contraseña
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.password}
              helperText={errors.password}
              type="password"
              autoComplete="given-email"
              name="password"
              required
              fullWidth
              id="password"
              autoFocus
            />
          </Grid>

          {/* Ocupación */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="ocupacion"
              mb="5px"
            >
              Ocupación
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.ocupation}
              helperText={errors.ocupation}
              autoComplete="given-email"
              name="ocupation"
              required
              fullWidth
              id="ocupation"
              autoFocus
            />
          </Grid>
        </Grid>

        {/* Botón de envío */}
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Sign Up
        </Button>
      </Box>

      {subtitle}
    </>
  )
}


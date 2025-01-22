import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import mensajes from "@/app/components/Mensajes";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export default function AuthLogin ({ title, subtitle, subtext }: loginType) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { loginUser } = useAuth();

  // useEffect(() => {
  //   if (!user) {
  //       if (global?.window !== undefined) {
  //           const userData = window?.localStorage?.getItem("user");
  //           const token = window?.localStorage?.getItem("token");
  //           const rolss : any= window?.localStorage?.getItem("rols");
  //           if (userData && token && rolss) {
  //               // loginUser(JSON.parse(userData), token, rolss);
  //               router.push("/");
  //           }
  //       }
  //       // Si ya hay sesión, logueo al usuario, sino, lo mando al login
        
  //   }
  // }, []);

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get("email"),
      password: data.get("password"),
    }
    console.log(body);
    try {
      const res = await login(body);
      loginUser(res.user, res.token, res.rols)
      mensajes("Bienvenido usuario", "Se ha registrado exitosamente, ingrese con sus credenciales.");
      router.push("/products")
    } catch (error:any) {
      console.log(error?.response?.data || error.message);
      console.log(error.response.data.message);
      if(Array.isArray(error.response.data.message)){
        mensajes("Error en inicio de sesion", error.response.data.message[0] || "No se ha podido iniciar sesión", "error");
      }else{
        mensajes("Error en inicio de sesion", error.response.data.message || error.response.data.message[0] || "No se ha podido iniciar sesión", "error");
      }

    }
  };

  const handleBlur = (event:any) => {
    const { name, value } = event.target;
    // Validación básica de campos requeridos
    switch (name) {
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
          password: 'La contraseña es requerida',
        }));
        break;
        // Agregar más validaciones según sea necesario para los demás campos
      default:
        break;
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
        <Stack >
          <Box>
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
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
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
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remeber this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
        </Stack>
        {/* <Box> */}
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        {/* </Box> */}
      </Box>
      {subtitle}
    </>
  );
}

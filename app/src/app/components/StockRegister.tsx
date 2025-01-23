import React, { useEffect } from "react";
import { Box, Typography, Button, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useState } from "react";
import { createClient } from "@/services/client.service";
import { useParams, useRouter } from "next/navigation";
import mensajes from "@/app/components/Mensajes";
import { createTrader } from "@/services/trader.service";
import { getCatalogsByStoreId } from "@/services/catalog.service";
import { createProduct } from "@/services/product.service";
import { createStock } from "@/services/stock.service";
interface RegisterType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export default function StockRegister ({ title, subtitle, subtext }: RegisterType) {
  const { id }  = useParams();
  const [errors, setErrors] = useState({
    name: "",
    amount: "",
    description: "",
    color: ""
  });


  const handleSubmit = async (event : any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      name: data.get("name"),
      amount: Number(data.get("amount")),
      description: data.get("description"),
      color: data.get("color"),
      productId: id,
    }
    console.log(body);
    try {
      const stock = await createStock(body);
      console.log(stock);
      mensajes("Éxito", "Stock creado exitosamente", "success");

      // router.push("/")
    } catch (error:any) {
      console.log(error?.response?.data || error.message);
      console.log(error.response.data.message);
      if(Array.isArray(error.response.data.message)){
        mensajes("Error al crear stock", error.response.data.message[0] || "No se ha podido creat stock", "error");
      }else{
        mensajes("Error al crear stock", error.response.data.message || error.response.data.message[0] || "No se ha podido creat stock", "error");
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
        case "amount":
            setErrors((prevErrors) => ({
                ...prevErrors,
                amount: value ? "" : "La cantidad es requerida",
            }));
            break;
        case "description":
            setErrors((prevErrors) => ({
              ...prevErrors,
              description: value ? "" : "La descripción es requerida",
            }));
            break;   
        case "color":
            setErrors((prevErrors) => ({
              ...prevErrors,
              color: value ? "" : "El color es requerido",
            }));
            break; 
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
              htmlFor="brand"
              mb="5px"
            >
              Cantidad
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.amount}
              helperText={errors.amount}
              autoComplete="given-name"
              name="amount"
              required
              fullWidth
              id="amount"
              autoFocus 
            />
          </Grid>

          {/* CI */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="description"
              mb="5px"
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

          {/* Nombre de usuario */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="price"
              mb="5px"
            >
              Color
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.color}
              helperText={errors.color}
              autoComplete="given-name"
              name="color"
              type="color"
              required
              fullWidth
              id="color"
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
          Crear
        </Button>
      </Box>

      {subtitle}
    </>
  )
}


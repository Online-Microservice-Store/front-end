import React, { useEffect } from "react";
import { Box, Typography, Button, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import mensajes from "@/app/components/Mensajes";
import { getCatalogsByStoreId } from "@/services/catalog.service";
import { createProduct } from "@/services/product.service";
interface RegisterType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export default function ProductRegister ({ title, subtitle, subtext }: RegisterType) {
  const [catalog, setCatalog] = useState("");
  const [catalogs, setCatalogs] = useState<any>([]);
  const { id }  = useParams();
  const [errors, setErrors] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    code: "",
    discount: "",
    catalog: "",
    image: ""
  });

  const router = useRouter();
  const getCatalogsOfOneStore = async () => {
    try {
        // const { totalCount, results } = await getAllClients(token, skip, limit);
        if(typeof id == 'string'){
          //  TODO: Change to get all catalogs
            const {data, meta} = await getCatalogsByStoreId(id);
            setCatalogs(data);
            console.log('catalogos')
            console.log(data);
        }

    } catch (error:any) {
        mensajes("Error", error.response?.data?.customMessage || "No se ha podido obtener los productos", "error");
    }
  }
  useEffect( () => {
    getCatalogsOfOneStore();
  },[])

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      name: data.get("name"),
      brand: data.get("brand"),
      description: data.get("description"),
      price: Number(data.get("price")),
      code: data.get("code"),
      discount: Number(data.get("discount")),
      image: data.get("image"),
      catalogId: catalog,
      available: true
    }
    console.log(body);
    try {
      const product = await createProduct(body);
      console.log(product);
      mensajes("Éxito", "Product creado exitosamente", "success");

      // router.push("/")
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
        case "brand":
            setErrors((prevErrors) => ({
                ...prevErrors,
                brand: value ? "" : "La marca es requerida",
            }));
            break;
        case "description":
            setErrors((prevErrors) => ({
              ...prevErrors,
              description: value ? "" : "La descripción es requerida",
            }));
            break;   
        case "price":
            setErrors((prevErrors) => ({
              ...prevErrors,
              price: value ? "" : "El precio es requerido",
            }));
            break; 
        case "code":
          setErrors((prevErrors) => ({
            ...prevErrors,
            code: value ? "" : "El código es requerido",
          }));
          break;
        case "discount":
          setErrors((prevErrors) => ({
            ...prevErrors,
            discount: value ? "" : "El descuento es requerido",
          }));
          break;
        case "image":
          setErrors((prevErrors) => ({
            ...prevErrors,
            image: value ? "" : "La url de la img es requerido",
          }));
          break;
        case "catalog":
          setErrors((prevErrors) => ({
            ...prevErrors,
            catalog: value ? "" : "El catalogo es requerido",
          }));
          break;
        // Agregar más validaciones según sea necesario para los demás campos
        default:
            break;
    }
};
const handleChange = (event: SelectChangeEvent) => {
  setCatalog(event.target.value as string);
  console.log(catalog);
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
              Marca
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.brand}
              helperText={errors.brand}
              autoComplete="given-name"
              name="brand"
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
              Price
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.price}
              helperText={errors.price}
              autoComplete="given-name"
              type="number"
              name="price"
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
              htmlFor="code"
              mb="5px"
            >
              Código
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.code}
              helperText={errors.code}
              autoComplete="given-email"
              name="code"
              required
              fullWidth
              id="code"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="code"
              mb="5px"
            >
              Url de la imagen
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.image}
              helperText={errors.image}
              autoComplete="given-email"
              name="image"
              required
              fullWidth
              id="image"
              autoFocus
            />
          </Grid>


          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="ocupacion"
              mb="5px"
            >
              Descuento
            </Typography>
            <CustomTextField
              onBlur={handleBlur}
              error={!!errors.discount}
              helperText={errors.discount}
              autoComplete="given-email"
              name="discount"
              type="number"
              required
              fullWidth
              id="discount"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="rol"
              mb="5px"
            >
              Catalogo
            </Typography>
            <FormControl fullWidth>
              {/* <InputLabel id="catalog-select-label">Catálogo</InputLabel> */}
              <Select
                labelId="catalog-select-label"
                id="catalog"
                name="catalog"
                value={catalog}
                label="Catálogo"
                onChange={handleChange}
              >
                {catalogs.map((item:any, index:number) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
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


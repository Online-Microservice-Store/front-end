  'use client';
  import { Paper, Box, Grid, Avatar, Typography, Button } from '@mui/material';
  import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
  import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
  import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
  import { useEffect, useState } from 'react';
  import {
    IconPlus,
    IconMinus
  } from "@tabler/icons-react";
  import { getProductById } from '@/services/product.service';
  import { useParams, useRouter } from 'next/navigation';
  import mensajes from '@/app/components/Mensajes';
  import { useInvoice } from '@/context/InvoiceContext';
import { sizeHeight, sizeWidth } from '@mui/system';

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));

  const darkTheme = createTheme({ palette: { mode: 'dark' } });
  const lightTheme = createTheme({ palette: { mode: 'light' } });
  interface product {
    id : string;
    available : boolean;
    brand : string;
    catalogId : string;
    code : string;
    description : string;
    discount : number;
    name : string
    price : number;
    image?: string;
    Stock: {
      id: string;
      name: string;
      amount: number;
      description: string;
      color: string;
    }[]
    Catalog: {
      name: string,
      storeId: string,
      discount: number,
    }
  }
  const productDefault = {
    id : "",
    available : false,
    brand : "",
    catalogId : "",
    code : "",
    description : "",
    discount : 0,
    name : "",
    price : 0,
    image: "",
    Stock: [{
      id: "",
      name: "",
      amount: 0,
      description: "",
      color: "",
    }],
    Catalog: {
      name: "",
      storeId: "",
      discount: 0,
    }
  }

  const Product = () => {
    const router = useRouter();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [leftBg, setLeftBg] = useState("transparent"); // Fondo izquierdo
    const [rightBg, setRightBg] = useState("transparent"); // Fondo derecho
    const [iconColor, setIconColor] = useState("black"); 

    const [stockSelectedId, setStockSelectedId] = useState("");
    const[product, setProduct] = useState<product>(
      productDefault
    );
    const { addProduct, products } = useInvoice();
    
    // const[detailProduct, setDetailProduct] = useState<detailProduct>({
    //   amount: 0
    // });

    useEffect( () => {
      const getProduct = async()  => {
      try {
        const response = await getProductById(`${id}`);
        setProduct(response);
        console.log(response);
      } catch (error) {
          console.log(`error interno  ${error}`);
      }
      }
      getProduct();
    }, [id]);

    const handleQuantity = (type :any) => {
      // setQuantity(quantity +1);
      if (stockSelectedId == ""){
        return mensajes("Error", "Seleccione el color", "error");
      }
      if(type == "dec" ){
          quantity > 1 && setQuantity(quantity-1)
      }else{
        // if (product?.stock?.amount != undefined){
          const stockAmount : number | undefined = product.Stock.find((stock) => stock.id == stockSelectedId)?.amount;
          if(stockAmount != undefined){
            quantity < stockAmount  && setQuantity(quantity+1);
          }
        // }
      }
      // alert(quantity);

    }

    const AddProductToCart = (e:any) => {
      e.preventDefault();
      if (stockSelectedId == ""){
        return mensajes("Error", "Seleccione el color", "error");
      }
      const productNew = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        code: product.code,
        discount: product.discount,
        quantity: quantity,
        stockId: stockSelectedId,
        discountCatalogo: product.Catalog.discount,
        storeId: product.Catalog.storeId
      }

      addProduct(productNew);

    }
    return (
      <PageContainer title="Product" description="this is Shadow">

        <DashboardCard>
          <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
            <Typography variant="subtitle1" sx={{ fontSize: "40px", fontWeight: "bold" }}>
              {product?.name}
            </Typography>
          </Grid>
            <Grid item xs={6} 
              display={'flex'} // Activa el contexto flexbox
              justifyContent={'center'} // Centra horizontalmente
              alignItems={'center'} // Centra verticalmente
              bgcolor={'background.default'} >
                <ThemeProvider theme={lightTheme}>
                  <Box
                    sx={{
                      p: 1,
                      bgcolor: 'background.default',
                      display: 'grid',
                      // gridTemplateColumns: { md: '1fr 1fr' },
                      gap: 1,
                    }}
                  >
                  <Box
                    component="img"
                    src={product?.image}
                    alt={product?.name}
                    sx={{
                      width: 400, // ancho fijo en píxeles
                      height: 400, // alto fijo en píxeles
                      objectFit: 'cover', // o 'contain' según lo que prefieras
                      borderRadius: 4, // opcional, para esquinas redondeadas
                    }}
                  />
                  </Box>
                </ThemeProvider>
              </Grid>
              <Grid item xs={6} >
              <ThemeProvider theme={lightTheme}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    // gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  <DashboardCard title="Información del producto:" >
                   <Typography fontSize={"18px"} fontWeight={"600"} marginTop={3}>Nombre: </Typography>
                    <Typography fontSize={"16px"}>{product?.name}</Typography>
                    <Typography fontSize={"18px"} fontWeight={"600"} marginTop={3}>Precio: </Typography>
                    <Typography fontSize={"16px"}>${product?.price} c/u</Typography>
                    <Typography fontSize={"18px"} fontWeight={"600"} marginTop={3}>Colores disponibles: </Typography>
                    
                    <Box sx={{ display: "flex" }}>
                    {product.Stock.map((stock) => (
                      <Box
                        key={stock.color}
                        onClick={() => setStockSelectedId(stock.id)}
                        sx={{
                          margin: "10px",
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: stock.color,
                          cursor: "pointer",
                          // border: stockSelectedId === stock.id ? "1px solid black" : "0px solid transparent",
                          boxShadow: stockSelectedId === stock.id ? ` 0px 0px 3px 3px ${stock.color}` : "none",
                          transition: "all 0.3s ease-in-out",
                        }}
                      />
                    ))}
                  </Box>
                  <Typography fontSize={"18px"} fontWeight={"600"} marginTop={3}>Cantidad a comprar: </Typography>

                  <Box>
                      {/* <Typography>Carrito de compras</Typography> */}
                    {/* <AddContainer> */}
                          {/* <AmountContainer> */}
                          <Box 
                            sx={{ 
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center",
                              padding: "10px",
                              borderRadius: "10px",
                            }}
                          >
                            {/* Botón de Restar */}
                            <Box 
                              sx={{
                                backgroundColor: leftBg,
                                padding: "10px",
                                borderRadius: "10px",
                                transition: "background-color 0.3s ease-in-out",
                              }}
                              onMouseEnter={() => setLeftBg("#ffdddd")} // Fondo rojo claro
                              onMouseLeave={() => setLeftBg("transparent")} 
                            >
                              <IconMinus 
                                fontSize="20"
                                style={{
                                  cursor: "pointer",
                                  transition: "color 0.3s ease-in-out",
                                  color: iconColor,
                                }}
                                onMouseEnter={() => setIconColor("red")} 
                                onMouseLeave={() => setIconColor("black")} 
                                onClick={() => handleQuantity("dec")}
                              />
                            </Box>

                            {/* Cantidad */}
                            <Typography fontSize={20} margin={2}> {quantity} </Typography>  

                            {/* Botón de Sumar */}
                            <Box 
                              sx={{
                                backgroundColor: rightBg,
                                padding: "10px",
                                borderRadius: "10px",
                                transition: "background-color 0.3s ease-in-out",
                              }}
                              onMouseEnter={() => setRightBg("#ddffdd")} // Fondo verde claro
                              onMouseLeave={() => setRightBg("transparent")} 
                            >
                              <IconPlus 
                                fontSize="20"
                                style={{
                                  cursor: "pointer",
                                  transition: "color 0.3s ease-in-out",
                                  color: iconColor,
                                }}
                                onMouseEnter={() => setIconColor("green")} 
                                onMouseLeave={() => setIconColor("black")} 
                                onClick={() => handleQuantity("inc")}
                              />
                            </Box>
                          </Box>
                          
                    </Box>
                    
                  </DashboardCard>       

                  {/* <DashboardCard title="Cantidad:">
                    
                  </DashboardCard>  */}
                  <Box 
                            sx={{ 
                              display: "flex", 
                              justifyContent: "center", // Centrar horizontalmente
                              alignItems: "center", // Centrar verticalmente (si es necesario)
                              width: "100%", // Asegurar que el Box ocupe todo el ancho disponible
                              marginTop: "5px" // Espaciado opcional
                            }}
                          >
                            <Button 
                              variant="contained"
                              color="error"
                              style={{ 
                                padding: "10px", 
                                fontSize: "16px" // Opcional, para mejor legibilidad
                              }}
                              onClick={(e) => AddProductToCart(e)}
                            > 
                              Añadir al carrito 
                            </Button>
                          </Box>
                </Box>
              </ThemeProvider>
            </Grid>
          </Grid>
        </DashboardCard>
      </PageContainer>
    );
  };

  export default Product;

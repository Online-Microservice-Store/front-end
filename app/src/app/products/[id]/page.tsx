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

        <DashboardCard title="Product">
          <Grid container spacing={2}>
              <Grid item xs={6} 
              display={'flex'} // Activa el contexto flexbox
              justifyContent={'center'} // Centra horizontalmente
              alignItems={'center'} // Centra verticalmente
              bgcolor={'background.default'} >
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
                  <Box
                    component="img"
                    src={product?.image}
                    alt={product?.name}
                    sx={{
                      width: 450, // ancho fijo en píxeles
                      height: 450, // alto fijo en píxeles
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
                  <DashboardCard title="Nombre del articulo">
                    <Typography>{product?.name}</Typography>
                  </DashboardCard>
                  <DashboardCard title="Precio">
                    <Typography>{product?.price}</Typography>
                  </DashboardCard>
                  
                  <DashboardCard title="Color" >
                    <Box sx={{display: "flex"}}>
                      {product.Stock.map( (stock) => (
                        <option
                        color={stock.color} key={stock.color} onClick={() => setStockSelectedId(stock.id)}
                        style={{
                          margin: "10px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: stock.color,
                          cursor: "pointer",
                        }}
                      >
                      </option>
                      ))}
                    </Box>
                  </DashboardCard>
                  <DashboardCard title="Carrito de compras">
                    <Box>
                      <Typography>Carrito de compras</Typography>
                    {/* <AddContainer> */}
                          {/* <AmountContainer> */}
                          <Box sx={{display: 'flex', fontSize: '1000' }}>
                              <IconMinus style={{ marginTop: '15px'}} fontSize={20} onClick={() => handleQuantity("dec") }/>
                              <Typography fontSize={20} margin={2}> {quantity} </Typography>  
                              <IconPlus style={{ marginTop: '15px'}} fontSize={20} onClick={() => handleQuantity("inc")}/>
                          {/* </AmountContainer> */}
                          </Box>
                          <Button 
                              disableElevation color="primary"
                              variant="contained"
                              style={{ padding: '15px'}}

                              onClick={(e) => AddProductToCart(e)}
                            > ADD TO CART 
                          </Button>
                    </Box>
                      {/* </AddContainer> */}
                  </DashboardCard>
                </Box>
              </ThemeProvider>
            </Grid>
          </Grid>
        </DashboardCard>
      </PageContainer>
    );
  };

  export default Product;

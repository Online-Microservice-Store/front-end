'use client';
import { useInvoice } from '@/context/InvoiceContext';
import { Avatar, Box, Button, Paper, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Stack, styled } from '@mui/system';
import { IconBucket, IconDashboard, IconShoppingCart } from '@tabler/icons-react';
import { PageContainer, PageHeader, PageHeaderToolbar } from '@toolpad/core/PageContainer';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { title } from 'process';

const NAVIGATION: Navigation = [
    {
        // title: "Holaa",
      segment: 'orders',
      title: (
        <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>
          Items
        </span>
      ),
      icon: <IconDashboard />,
    },
];
function useDemoRouter(initialPath: string): Router {
    const [pathname, setPathname] = useState(initialPath);
  
    const router = useMemo(() => {
      return {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path: string | URL) => setPathname(String(path)),
      };
    }, [pathname]);
  
    return router;
}

function CustomPageToolbar() {
    return (
        <>
        <Typography variant="h1" marginLeft={0} marginTop={3}>Productos </Typography>        
        <PageHeaderToolbar>
            <Stack direction="row" spacing={1} alignItems="center">
            <Button
                variant="contained"
                size="medium"
                color="success"
                startIcon={<IconShoppingCart fontSize="inherit" />}
            >
                Buy
            </Button>
            <Button
                variant="contained"
                size="medium"
                color="error"
                startIcon={<IconBucket fontSize="inherit" />}
            >
                Erase all
            </Button>
            </Stack>
        </PageHeaderToolbar>
      </>

    );
  }

function CustomPageHeader(props: any) {
    return <PageHeader slots={{ toolbar: CustomPageToolbar }} />;
}
const Cart = (props: any) => {
  const router = useDemoRouter('/orders');
  const [productsAll, setProductsAll] = useState<any[]>([]);
  const { addProduct, products, getProducts } = useInvoice();
  const theme = useTheme();


  useEffect( () => {
    const products = getProducts();
    // console.log(products);
    setProductsAll(products)
  },[]);

    // console.log(products);
    return (
    <AppProvider    
    //   navigation={NAVIGATION}
      router={router}
      theme={theme}
      window={undefined}
    //   branding={{
    //     title: 'ACME Inc.',
    //   }}
    >
      <Paper sx={{ p: 2, width: '100%' }}>
        <PageContainer
            slots={{
                header: CustomPageHeader,
            }}
        >
            <Grid container spacing={1}>
            {/* <Grid size={5} />
            <Grid size={12}>
                <Skeleton height={14} />
            </Grid>
            <Grid size={12}>
                <Skeleton height={14} />
            </Grid> */}
            
            {productsAll.map((product:any) => (
                <>
                <Grid size={4}>
                    {/* <Skeleton height={100} /> */}
                        <Box
                            component="img"
                            src={product?.image}
                            alt={product?.name}
                            sx={{
                                maxWidth: '100%',
                                maxHeight: 200,
                                objectFit: 'contain', // para mantener la proporción
                            }}
                        />
                    </Grid>
                    <Grid size={8}>
                        {/* <Skeleton height={100} /> */}
                        
                        {/* Nombre del producto */}
                        <Typography variant="h3" marginBottom={3} marginTop={3}>
                            <span style={{ fontWeight: 700 }}>{product.name}:</span> 
                            <span style={{ fontWeight: 400 }}> {product.description}</span>
                        </Typography>
                        
                        {/* Marca */}
                        <Typography variant="h6">
                            <span style={{ fontWeight: 700 }}>Marca:</span> 
                            <span style={{ fontWeight: 400 }}> {product.brand}</span>
                        </Typography>
                        
                        {/* Precio */}
                        <Typography variant="h6">
                            <span style={{ fontWeight: 700 }}>Precio:</span> 
                            <span style={{ fontWeight: 400 }}> {product.price}</span>
                        </Typography>
                        
                        {/* Descuento */}
                        <Typography variant="h6">
                            <span style={{ fontWeight: 700 }}>Descuento:</span> 
                            <span style={{ fontWeight: 400 }}> {product.discount} %</span>
                        </Typography>
                        
                        {/* Cantidad */}
                        <Typography variant="h6">
                            <span style={{ fontWeight: 700 }}>Cantidad:</span> 
                            <span style={{ fontWeight: 400 }}> {product.quantity}</span>
                        </Typography>
                        </Grid>
                </>
            ))}

                    
            </Grid>
        </PageContainer>
      </Paper>
    </AppProvider>
        
    );
}

export default Cart;

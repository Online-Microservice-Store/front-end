'use client';
import mensajes from "@/app/components/Mensajes";
import { useAuth } from "@/context/AuthContext";
import { CssBaseline, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Container, Box, Grid, Paper, TableBody, Avatar, Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MensajeConfirmacion from "@/app/components/MensajeConfirmacion";
import CustomPagination from "@/app/components/CustomPagination";
import { ACTIVE_USER_STATUS, AVAILABLE_PRODUCT, BLOQUED_USER_STATUS, NOT_AVAILABLE_PRODUCT } from "@/constants";
import { getProductsByCatalogId } from "@/services/product.service";

const SamplePage = () => {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(null);
    const { getToken, getUser } = useAuth();
    const router = useRouter();
    const [token, setToken] = useState(() => getToken());
    const [user, setUser] = useState( () => getUser());
    const { id } = useParams();

    const getProductsByCatalogID = async () => {
        try {
            // const { totalCount, results } = await getAllClients(token, skip, limit);
            if(typeof id == 'string'){
                const {data, meta} = await getProductsByCatalogId(id);
                setTotalCount(meta.total);
                setProducts(data);
                console.log(data)
            }

        } catch (error:any) {
            mensajes("Error", error.response?.data?.customMessage || "No se ha podido obtener los productos", "error");
        }
    }

    useEffect(() => {
        getProductsByCatalogID();
        // setResearchers(mockResearchers);
    }, [token, skip, limit]);
  
    const handleViewStore = (id:string) => {
        // Lógica para actualizar el investigador researcheristrador
        router.push(`/stores/view/${id}`);
    };

    const handleUpdateProductAvailable = async (id :string, state :any) => {
        try {
            alert('falta de implementar')
            // TODO:FALTA HACE METODO DE ACTUALIZAR
            // await updateStore(id, { state }, token);
            // await getProductsByCatalogId();

            mensajes("Éxito", "Product actualizado exitosamente", "success");
        } catch (error : any) {
            console.log(error)
            console.log(error?.response?.data || error.message);

            mensajes("Error en actualización", error.response?.data?.customMessage || "No se ha podido actualizar el producto", "error");
        }
    }
    const handleCreateProduct = () => {
        // alert('no implementado')
        router.push("/trader/stores/catalogs/products/create");
    };


    const handleViewStocks = (id:string) => {
        router.push(`/trader/stores/catalogs/products/stocks/${id}`);
    }
    const handleDeleteStore = async (id:string) => {
        // Lógica para dar de baja al investigador researcheristrador
        console.log(`Dando de baja la tienda con ID: ${id}`);

        // setResearchers(researchers.filter(researcher => researcher_.id !== id));
        MensajeConfirmacion("Esta acción es irreversible. ¿Desea continuar?", "Confirmación", "warning").then(async () => {
            try {
                alert('falta de implementar');
                // await deleteStoreById(token, id);
                // await getProductsByCatalogId();

                mensajes("Éxito", "Tienda eliminada exitosamente", "info");
            } catch (error : any) {
                console.log(error)
                console.log(error?.response?.data || error.message);

                mensajes("Error en eliminación", error.response?.data?.customMessage || "No se ha podido eliminar el producto", "error");
            }
        }).catch((error : any) => {
            console.error(error);
        })
    };

    const handlePageChange = (newSkip : any) => {
        setSkip(newSkip);
    }
    return (
    <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography component="h1" variant="h5">
                            Productos
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleCreateProduct}>
                            Crear producto
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Imagen</TableCell>
                                <TableCell>Marca</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Código</TableCell>
                                <TableCell>Descuento</TableCell>
                                <TableCell>Disponible</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product :any) => (
                                <TableRow key={product.id}>
                                    {/* <TableCell>
                                        <Avatar src={client.avatar} alt={client.firstName} />
                                    </TableCell> */}
                                    <TableCell>{product.name}</TableCell>
                                    {/* <TableCell>{product.image}</TableCell> */}
                                    <TableCell>
                                        <Avatar
                                            src={product.image}
                                            variant="square"
                                            sx={{
                                                height: 'auto', // Ajusta la altura automáticamente según el ancho
                                                width: '90%',  // Ocupa el ancho completo del contenedor
                                                marginTop: '10px',
                                                padding: '10px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.description}</TableCell>  
                                    <TableCell>{product.price}</TableCell>  
                                    <TableCell>{product.code}</TableCell>  
                                    <TableCell>{product.discount}</TableCell>  
                                    <TableCell>{product.available == 'TRUE' ? "SI" : "NO"}</TableCell>  
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleViewStore(product.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Ver
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleUpdateProductAvailable(product.id, product.available === AVAILABLE_PRODUCT ? NOT_AVAILABLE_PRODUCT : AVAILABLE_PRODUCT)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            {product.available === AVAILABLE_PRODUCT ? "Disponible" : "No disponible"}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteStore(product.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Dar de baja
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleViewStocks(product.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Stocks
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <CustomPagination
                    skip={skip}
                    limit={limit}
                    totalCount={totalCount}
                    onPageChange={handlePageChange}
                />
            </Box>
        </Container>
    // <PageContainer title="Sample Page" description="this is Sample page">
    //   <DashboardCard title="Sample Page">
    //     <Typography>This is a sample page</Typography>
    //   </DashboardCard>
    // </PageContainer>
  );
};

export default SamplePage;


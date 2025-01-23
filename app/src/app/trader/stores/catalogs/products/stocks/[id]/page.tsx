'use client';
import mensajes from "@/app/components/Mensajes";
import { useAuth } from "@/context/AuthContext";
import { CssBaseline, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Container, Box, Grid, Paper, TableBody, Avatar, Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MensajeConfirmacion from "@/app/components/MensajeConfirmacion";
import CustomPagination from "@/app/components/CustomPagination";
import { ACTIVE_USER_STATUS, AVAILABLE_PRODUCT, BLOQUED_USER_STATUS, NOT_AVAILABLE_PRODUCT } from "@/constants";
import { getCatalogsByStoreId } from "@/services/catalog.service";
import { getProductsByCatalogId } from "@/services/product.service";
import { getStocksByProductId } from "@/services/stock.service";

const SamplePage = () => {
    const [stocks, setStocks] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(null);
    const { getToken, getUser } = useAuth();
    const router = useRouter();
    const [token, setToken] = useState(() => getToken());
    const [user, setUser] = useState( () => getUser());
    const { id } = useParams();

    const getStocksByProductID = async () => {
        try {
            // const { totalCount, results } = await getAllClients(token, skip, limit);
            if(typeof id == 'string'){
                const {data, meta} = await getStocksByProductId(id);
                setTotalCount(meta.total);
                setStocks(data);
                console.log(data)
            }

        } catch (error:any) {
            mensajes("Error", error.response?.data?.customMessage || "No se ha podido obtener los stocks", "error");
        }
    }

    useEffect(() => {
        getStocksByProductID();
        // setResearchers(mockResearchers);
    }, [token, skip, limit]);
  
    const handleViewStock = (id:string) => {
        // Lógica para actualizar el investigador researcheristrador
        router.push(`/stores/view/${id}`);
    };

    const handleUpdateProductAvailable = async (id :string, state :any) => {
        try {
            alert('falta de implementar')
            // TODO:FALTA HACE METODO DE ACTUALIZAR
            // await updateStore(id, { state }, token);
            // await getProductsByCatalogId();

            mensajes("Éxito", "Stock actualizado exitosamente", "success");
        } catch (error : any) {
            console.log(error)
            console.log(error?.response?.data || error.message);

            mensajes("Error en actualización", error.response?.data?.customMessage || "No se ha podido actualizar el stock", "error");
        }
    }
    const handleCreateProduct = () => {
        router.push(`/trader/stores/catalogs/products/stocks/createStock/${id}`);
    };

    const handleDeleteStock = async (id:string) => {
        // Lógica para dar de baja al investigador researcheristrador
        console.log(`Dando de baja la tienda con ID: ${id}`);

        // setResearchers(researchers.filter(researcher => researcher_.id !== id));
        MensajeConfirmacion("Esta acción es irreversible. ¿Desea continuar?", "Confirmación", "warning").then(async () => {
            try {
                alert('falta de implementar');
                // await deleteStoreById(token, id);
                // await getProductsByCatalogId();

                mensajes("Éxito", "Stock eliminada exitosamente", "info");
            } catch (error : any) {
                console.log(error)
                console.log(error?.response?.data || error.message);

                mensajes("Error en eliminación", error.response?.data?.customMessage || "No se ha podido eliminar el stock", "error");
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
                            Stocks
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleCreateProduct}>
                            Crear stock
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Color</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stocks.map((stock :any) => (
                                <TableRow key={stock.id}>
                                    {/* <TableCell>
                                        <Avatar src={client.avatar} alt={client.firstName} />
                                    </TableCell> */}
                                    <TableCell>{stock.name}</TableCell>
                                    {/* <TableCell>{product.image}</TableCell> */}
                                    <TableCell>{stock.amount}</TableCell>
                                    <TableCell>{stock.description}</TableCell>  
                                    <TableCell>{stock.color}</TableCell>  
                                        {/* <TableCell>{stock.available == 'TRUE' ? "SI" : "NO"}</TableCell>   */}
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleViewStock(stock.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Ver
                                        </Button>
                                        {/* <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleUpdateProductAvailable(stock.id, stock.available === AVAILABLE_PRODUCT ? NOT_AVAILABLE_PRODUCT : AVAILABLE_PRODUCT)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            {stock.available === AVAILABLE_PRODUCT ? "Disponible" : "No disponible"}
                                        </Button> */}
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteStock(stock.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Dar de baja
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


'use client';
import mensajes from "@/app/components/Mensajes";
import { useAuth } from "@/context/AuthContext";
import { CssBaseline, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Container, Box, Grid, Paper, TableBody, Avatar, Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MensajeConfirmacion from "@/app/components/MensajeConfirmacion";
import CustomPagination from "@/app/components/CustomPagination";
import { ACTIVE_USER_STATUS, BLOQUED_USER_STATUS } from "@/constants";
import { getCatalogsByStoreId } from "@/services/catalog.service";
import { updateProduct } from "@/services/product.service";

const SamplePage = () => {
    const [catalogs, setCatalogs] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(null);
    const { getToken, getUser } = useAuth();
    const router = useRouter();
    const [token, setToken] = useState(() => getToken());
    const [user, setUser] = useState( () => getUser());
    const { id } = useParams();

    const getCatalogs = async () => {
        try {
            // const { totalCount, results } = await getAllClients(token, skip, limit);
            if(typeof id == 'string'){
                const {data, meta} = await getCatalogsByStoreId(id);
                setTotalCount(meta.total);
                setCatalogs(data);
                console.log(data)
            }

        } catch (error:any) {
            mensajes("Error", error.response?.data?.customMessage || "No se ha podido obtener las tiendas", "error");
        }
    }

    useEffect(() => {
        getCatalogs();
    }, [token, skip, limit]);
  
    const handleViewStore = (id:string) => {
        // Lógica para actualizar el investigador researcheristrador
        alert('no implementado')
        // router.push(`/stores/view/${id}`);
    };

    const handleUpdateStoreStatus = async (id :string, state :any) => {
        try {
            // TODO:FALTA HACE METODO DE ACTUALIZAR
            await updateProduct(id, { state }, token);
            await getCatalogs();

            mensajes("Éxito", "Tienda actualizada exitosamente", "info");
        } catch (error : any) {
            console.log(error)
            console.log(error?.response?.data || error.message);

            mensajes("Error en actualización", error.response?.data?.customMessage || "No se ha podido actualizar la tienda", "error");
        }
    }
    const handleCreateCatalog = () => {
        alert('no implementado');
        // router.push("/trader/stores/create");
    };

    const handleEditCatalog = (id: string) => {
        // router.push(`/trader/stores/catalogs/${id}`)
        alert('no implementado');
    }

    const handleViewProductos = (id:string) => {
        // alert('no implementado')
        router.push(`/trader/stores/catalogs/products/${id}`);
    }
    const handleAddProduct = (id:string) => {
        // alert('no implementado')
        router.push(`/trader/stores/catalogs/createProduct/${id}`);
    }

    const handleDeleteCatalog = async (id:string) => {
        // Lógica para dar de baja al investigador researcheristrador
        console.log(`Dando de baja la tienda con ID: ${id}`);

        // setResearchers(researchers.filter(researcher => researcher_.id !== id));
        MensajeConfirmacion("Esta acción es irreversible. ¿Desea continuar?", "Confirmación", "warning").then(async () => {
            try {
                // await deleteStoreById(token, id);
                await getCatalogs();

                mensajes("Éxito", "Tienda eliminada exitosamente", "info");
            } catch (error : any) {
                console.log(error)
                console.log(error?.response?.data || error.message);

                mensajes("Error en eliminación", error.response?.data?.customMessage || "No se ha podido eliminar la tienda", "error");
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
                            Catalogos
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleCreateCatalog}>
                            Crear catalogo
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Descuento</TableCell>
                                <TableCell>Cantidad de productos</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {catalogs.map((catalog :any) => (
                                <TableRow key={catalog.id}>
                                    {/* <TableCell>
                                        <Avatar src={client.avatar} alt={client.firstName} />
                                    </TableCell> */}
                                    <TableCell>{catalog.name}</TableCell>
                                    <TableCell>{catalog.description}</TableCell>
                                    <TableCell>{catalog.discount}</TableCell>
                                    <TableCell>{catalog.productsAmount}</TableCell>  
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleViewStore(catalog.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Ver
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteCatalog(catalog.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Dar de baja
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleEditCatalog(catalog.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Editar
                                        </Button>
                                        
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleViewProductos(catalog.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Productos
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleAddProduct(catalog.storeId)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Añadir producto
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


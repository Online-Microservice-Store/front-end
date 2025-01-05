'use client';
import mensajes from "@/app/components/Mensajes";
import { useAuth } from "@/context/AuthContext";
import { CssBaseline, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Container, Box, Grid, Paper, TableBody, Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MensajeConfirmacion from "@/app/components/MensajeConfirmacion";
import CustomPagination from "@/app/components/CustomPagination";
import { ACTIVE_USER_STATUS, BLOQUED_USER_STATUS } from "@/constants";
import { deleteStoreById, getAllStores, updateStore } from "@/services/store.service";

const SamplePage = () => {
    const [stores, setStores] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(null);
    const { token } = useAuth();
    const router = useRouter();

    const getStores = async () => {
        try {
            // const { totalCount, results } = await getAllClients(token, skip, limit);
            const {data, meta} = await getAllStores();
            setTotalCount(meta.total);
            setStores(data);
        } catch (error:any) {
            mensajes("Error", error.response?.data?.customMessage || "No se ha podido obtener las tiendas", "error");
        }
    }

    useEffect(() => {
        console.log('EN USE EEFECT');
        console.log(token);
        // Llamada a backend
        if (token) {
            getStores();
        }
        // setResearchers(mockResearchers);
    }, [token, skip, limit]);
  
    const handleViewStore = (id:string) => {
        // Lógica para actualizar el investigador researcheristrador
        router.push(`/stores/view/${id}`);
    };

    const handleUpdateStoreStatus = async (id :string, state :any) => {
        try {
            // TODO:FALTA HACE METODO DE ACTUALIZAR
            await updateStore(id, { state }, token);
            await getStores();

            mensajes("Éxito", "Tienda actualizada exitosamente", "info");
        } catch (error : any) {
            console.log(error)
            console.log(error?.response?.data || error.message);

            mensajes("Error en actualización", error.response?.data?.customMessage || "No se ha podido actualizar la tienda", "error");
        }
    }
    const handleCreateStore = () => {
        router.push("/stores/create");
    };

    const handleDeleteStore = async (id:string) => {
        // Lógica para dar de baja al investigador researcheristrador
        console.log(`Dando de baja la tienda con ID: ${id}`);

        // setResearchers(researchers.filter(researcher => researcher_.id !== id));
        MensajeConfirmacion("Esta acción es irreversible. ¿Desea continuar?", "Confirmación", "warning").then(async () => {
            try {
                await deleteStoreById(token, id);
                await getStores();

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
                            Tiendas
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleCreateStore}>
                            Crear Tienda
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Logo</TableCell>
                                <TableCell>Vistas</TableCell>
                                <TableCell>Ubicación</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stores.map((store :any) => (
                                <TableRow key={store.id}>
                                    {/* <TableCell>
                                        <Avatar src={client.avatar} alt={client.firstName} />
                                    </TableCell> */}
                                    <TableCell>{store.name}</TableCell>
                                    <TableCell>{store.logo}</TableCell>
                                    <TableCell>{store.views}</TableCell>
                                    <TableCell>{store.ubication}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleViewStore(store.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Ver
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleUpdateStoreStatus(store.id, store.user.state === BLOQUED_USER_STATUS ? ACTIVE_USER_STATUS : BLOQUED_USER_STATUS)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            BLOQUEAR
                                            {/* {client.user.state === BLOQUED_USER_STATUS ? "Desbloquear" : "Bloquear"} */}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteStore(store.id)}
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


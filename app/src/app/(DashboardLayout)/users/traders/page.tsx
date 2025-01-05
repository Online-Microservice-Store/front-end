'use client';
import mensajes from "@/app/components/Mensajes";
import { useAuth } from "@/context/AuthContext";
import { CssBaseline, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Container, Box, Grid, Paper, TableBody, Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MensajeConfirmacion from "@/app/components/MensajeConfirmacion";
import CustomPagination from "@/app/components/CustomPagination";
import { ACTIVE_USER_STATUS, BLOQUED_USER_STATUS } from "@/constants";
import { deleteTraderById, getAllTraders, updateTrader } from "@/services/trader.service";

const SamplePage = () => {
    const [traders, setTraders] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(null);
    const { token } = useAuth();
    const router = useRouter();

    const getTraders = async () => {
        try {
            // const { totalCount, results } = await getAllClients(token, skip, limit);
            const {data, meta} = await getAllTraders();
            setTotalCount(meta.total);
            setTraders(data);
        } catch (error:any) {
            mensajes("Error", error.response?.data?.customMessage || "No se ha podido obtener los comerciantes", "error");
        }
    }

    useEffect(() => {
        console.log('EN USE EEFECT');
        console.log(token);
        // Llamada a backend
        if (token) {
            getTraders();
        }
        // setResearchers(mockResearchers);
    }, [token, skip, limit]);
  
    const handleViewTrader = (id:string) => {
        // Lógica para actualizar el investigador researcheristrador
        router.push(`/traders/view/${id}`);
    };

    const handleUpdateTraderStatus = async (id :string, state :any) => {
        try {
            // TODO:FALTA HACE METODO DE ACTUALIZAR
            await updateTrader(id, { state }, token);
            await getTraders();

            mensajes("Éxito", "Comerciante actualizado exitosamente", "info");
        } catch (error:any) {
            console.log(error)
            console.log(error?.response?.data || error.message);

            mensajes("Error en actualización", error.response?.data?.customMessage || "No se ha podido actualizar el comerciante", "error");
        }
    }

    const handleDeleteTrader = async (id:string) => {
        // Lógica para dar de baja al investigador researcheristrador
        console.log(`Dando de baja al comerciante con ID: ${id}`);

        // setResearchers(researchers.filter(researcher => researcher_.id !== id));
        MensajeConfirmacion("Esta acción es irreversible. ¿Desea continuar?", "Confirmación", "warning").then(async () => {
            try {
                await deleteTraderById(token, id);
                await getTraders();

                mensajes("Éxito", "Comerciante eliminado exitosamente", "info");
            } catch (error : any) {
                console.log(error)
                console.log(error?.response?.data || error.message);

                mensajes("Error en eliminación", error.response?.data?.customMessage || "No se ha podido eliminar el comerciante", "error");
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
                            Comerciantes
                        </Typography>
                    </Grid>
                    {/* <Grid item>
                        <Button variant="contained" onClick={handleCreateResearcher}>
                            Crear Investigador
                        </Button>
                    </Grid> */}
                </Grid>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Apellido</TableCell>
                                <TableCell>IC</TableCell>
                                <TableCell>Nombre de usuario</TableCell>
                                <TableCell>Ocupacion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {traders.map((trader :any) => (
                                <TableRow key={trader.id}>
                                    {/* <TableCell>
                                        <Avatar src={client.avatar} alt={client.firstName} />
                                    </TableCell> */}
                                    <TableCell>{trader.person.name}</TableCell>
                                    <TableCell>{trader.person.lastname}</TableCell>
                                    <TableCell>{trader.person.identification}</TableCell>
                                    <TableCell>{trader.profile.username}</TableCell>
                                    <TableCell>{trader.profile.ocupation}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleViewTrader(trader.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Ver
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleUpdateTraderStatus(trader.id, trader.user.state === BLOQUED_USER_STATUS ? ACTIVE_USER_STATUS : BLOQUED_USER_STATUS)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            BLOQUEAR
                                            {/* {client.user.state === BLOQUED_USER_STATUS ? "Desbloquear" : "Bloquear"} */}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteTrader(trader.id)}
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
  );
};

export default SamplePage;


'use client';
import mensajes from "@/app/components/Mensajes";
import { useAuth } from "@/context/AuthContext";
import { CssBaseline, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Container, Box, Grid, Paper, TableBody, Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MensajeConfirmacion from "@/app/components/MensajeConfirmacion";
import CustomPagination from "@/app/components/CustomPagination";
import { ACTIVE_USER_STATUS, BLOQUED_USER_STATUS } from "@/constants";
import { deleteSuscriptionById, getAllSuscription, updateSuscription } from "@/services/suscription.service";

const SamplePage = () => {
    const [suscriptions, setSuscriptions] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(null);
    const { token } = useAuth();
    const router = useRouter();

    const getSuscriptions = async () => {
        try {
            // const { totalCount, results } = await getAllClients(token, skip, limit);
            const {data, meta} = await getAllSuscription();
            console.log(data);
            setTotalCount(meta.total);
            setSuscriptions(data);
        } catch (error:any) {
            mensajes("Error", error.response?.data?.customMessage || "No se ha podido obtener las suscripciones", "error");
        }
    }

    useEffect(() => {
        console.log('EN USE EEFECT');
        console.log(token);
        // Llamada a backend
        if (token) {
            getSuscriptions();
        }
        // setResearchers(mockResearchers);
    }, [token, skip, limit]);
  
    const handleViewSuscription = (id:string) => {
        // Lógica para actualizar el investigador researcheristrador
        router.push(`/suscriptions/view/${id}`);
    };

    const handleUpdateSuscriptionStatus = async (id :string, state :any) => {
        try {
            // TODO:FALTA HACE METODO DE ACTUALIZAR
            await updateSuscription(id, { state }, token);
            await getSuscriptions();

            mensajes("Éxito", "Suscripción actualizada exitosamente", "info");
        } catch (error : any) {
            console.log(error)
            console.log(error?.response?.data || error.message);

            mensajes("Error en actualización", error.response?.data?.customMessage || "No se ha podido actualizar la suscripción", "error");
        }
    }
    const handleCreateSuscription = () => {
        router.push("/suscriptions/create");
    };

    const handleDeleteSuscription = async (id:string) => {
        // Lógica para dar de baja al investigador researcheristrador
        console.log(`Dando de baja la suscripcion con ID: ${id}`);

        // setResearchers(researchers.filter(researcher => researcher_.id !== id));
        MensajeConfirmacion("Esta acción es irreversible. ¿Desea continuar?", "Confirmación", "warning").then(async () => {
            try {
                await deleteSuscriptionById(token, id);
                await getSuscriptions();

                mensajes("Éxito", "Suscripción eliminada exitosamente", "info");
            } catch (error : any) {
                console.log(error)
                console.log(error?.response?.data || error.message);

                mensajes("Error en eliminación", error.response?.data?.customMessage || "No se ha podido eliminar la suscripción", "error");
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
                            Suscripciones
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleCreateSuscription}>
                            Crear suscripción
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {suscriptions.map((suscription :any) => (
                                <TableRow key={suscription.id}>
                                    {/* <TableCell>
                                        <Avatar src={client.avatar} alt={client.firstName} />
                                    </TableCell> */}
                                    <TableCell>{suscription.name}</TableCell>
                                    <TableCell>{suscription.price}</TableCell>
                                    <TableCell>{suscription.type}</TableCell>
                                    <TableCell>{suscription.description}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleViewSuscription(suscription.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Ver
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteSuscription(suscription.id)}
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


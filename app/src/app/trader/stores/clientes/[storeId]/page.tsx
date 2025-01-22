'use client';
import mensajes from "@/app/components/Mensajes";
import { useAuth } from "@/context/AuthContext";
import { deleteClientById, getAllClients, updateClient } from "@/services/client.service";
import { CssBaseline, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Container, Box, Grid, Paper, TableBody, Avatar, Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MensajeConfirmacion from "@/app/components/MensajeConfirmacion";
import CustomPagination from "@/app/components/CustomPagination";
import { ACTIVE_USER_STATUS, BLOQUED_USER_STATUS } from "@/constants";
import { getClientsByStoreId } from "@/services/store.service";

const SamplePage = () => {
    const [clients, setClients] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(null);
    const { getToken } = useAuth();
    const router = useRouter();
    const [token, setToken] = useState(getToken())
    const {storeId} = useParams();


    const getClients = async () => {
        try {
            if(typeof storeId  == 'string'){
                console.log(storeId)
                const {clients, meta} = await getClientsByStoreId(storeId);
                console.log(clients);
                setTotalCount(meta.total);
                setClients(clients);
            }
            
            
        } catch (error:any) {
            mensajes("Error", error.response?.data?.customMessage || "No se ha podido obtener los investigadores", "error");
        }
    }

    useEffect(() => {
        getClients();
        // setResearchers(mockResearchers);
    }, [token, skip, limit]);
  
    const handleViewClient = (id:string) => {
        // Lógica para actualizar el investigador researcheristrador
        router.push(`/researchers/view/${id}`);
    };

    const handleUpdateClientStatus = async (id :string, state :any) => {
        try {
            // TODO:FALTA HACE METODO DE ACTUALIZAR
            await updateClient(id, { state }, token);
            await getClients();

            mensajes("Éxito", "Cliente actualizado exitosamente", "info");
        } catch (error : any) {
            console.log(error)
            console.log(error?.response?.data || error.message);

            mensajes("Error en actualización", error.response?.data?.customMessage || "No se ha podido actualizar el investigador", "error");
        }
    }

    const handleDeleteClient = async (id:string) => {
        // Lógica para dar de baja al investigador researcheristrador
        console.log(`Dando de baja al researcheristrador con ID: ${id}`);

        // setResearchers(researchers.filter(researcher => researcher_.id !== id));
        MensajeConfirmacion("Esta acción es irreversible. ¿Desea continuar?", "Confirmación", "warning").then(async () => {
            try {
                await deleteClientById(token, id);
                await getClients();

                mensajes("Éxito", "Cliente eliminado exitosamente", "info");
            } catch (error : any) {
                console.log(error)
                console.log(error?.response?.data || error.message);

                mensajes("Error en eliminación", error.response?.data?.customMessage || "No se ha podido eliminar el investigador", "error");
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
                            Clientes
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
                                <TableCell>Puntos de lealtad</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.map((client :any) => (
                                <TableRow key={client.id}>
                                    {/* <TableCell>
                                        <Avatar src={client.avatar} alt={client.firstName} />
                                    </TableCell> */}
                                    <TableCell>{client.person.name}</TableCell>
                                    <TableCell>{client.person.lastname}</TableCell>
                                    <TableCell>{client.person.identification}</TableCell>
                                    <TableCell>{client.profile.username}</TableCell>
                                    <TableCell>{client.profile.ocupation}</TableCell>
                                    <TableCell>{client.client.loyaltyPoints}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleViewClient(client.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Ver
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


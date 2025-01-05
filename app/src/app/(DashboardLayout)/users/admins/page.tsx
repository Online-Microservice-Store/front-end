'use client';
import mensajes from "@/app/components/Mensajes";
import { useAuth } from "@/context/AuthContext";
import { CssBaseline, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Container, Box, Grid, Paper, TableBody, Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MensajeConfirmacion from "@/app/components/MensajeConfirmacion";
import CustomPagination from "@/app/components/CustomPagination";
import { ACTIVE_USER_STATUS, BLOQUED_USER_STATUS } from "@/constants";
import { deleteAdminById, getAllAdmins, updateAdmin } from "@/services/admin.service";

const SamplePage = () => {
    const [admins, setAdmins] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(null);
    const { token } = useAuth();
    const router = useRouter();

    const getAdmins = async () => {
        try {
            // const { totalCount, results } = await getAllClients(token, skip, limit);
            const {data, meta} = await getAllAdmins();
            setTotalCount(meta.total);
            setAdmins(data);
        } catch (error:any) {
            mensajes("Error", error.response?.data?.customMessage || "No se ha podido obtener los administradores", "error");
        }
    }

    useEffect(() => {
        console.log('EN USE EEFECT');
        console.log(token);
        // Llamada a backend
        if (token) {
            getAdmins();
        }
        // setResearchers(mockResearchers);
    }, [token, skip, limit]);
  
    const handleCreateAdmin = () => {
        router.push("/admins/create");
    };

    const handleUpdateAdminStatus = async (id :string, state :any) => {
        try {
            // TODO:FALTA HACE METODO DE ACTUALIZAR
            await updateAdmin(id, { state }, token);
            await getAdmins();

            mensajes("Éxito", "Administrador actualizado exitosamente", "info");
        } catch (error:any) {
            console.log(error)
            console.log(error?.response?.data || error.message);

            mensajes("Error en actualización", error.response?.data?.customMessage || "No se ha podido actualizar el administrador", "error");
        }
    }

    const handleDeleteClient = async (id:string) => {
        // Lógica para dar de baja al investigador researcheristrador
        console.log(`Dando de baja al administrador con ID: ${id}`);

        // setResearchers(researchers.filter(researcher => researcher_.id !== id));
        MensajeConfirmacion("Esta acción es irreversible. ¿Desea continuar?", "Confirmación", "warning").then(async () => {
            try {
                await deleteAdminById(token, id);
                await getAdmins();

                mensajes("Éxito", "Administrador eliminado exitosamente", "info");
            } catch (error : any) {
                console.log(error)
                console.log(error?.response?.data || error.message);

                mensajes("Error en eliminación", error.response?.data?.customMessage || "No se ha podido eliminar el administrador", "error");
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
                            Administradores
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleCreateAdmin}>
                            Crear administrador
                        </Button>
                    </Grid>
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
                                <TableCell>Permisos</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {admins.map((admin :any) => (
                                <TableRow key={admin.id}>
                                    {/* <TableCell>
                                        <Avatar src={client.avatar} alt={client.firstName} />
                                    </TableCell> */}
                                    <TableCell>{admin.person.name}</TableCell>
                                    <TableCell>{admin.person.lastname}</TableCell>
                                    <TableCell>{admin.person.identification}</TableCell>
                                    <TableCell>{admin.profile.username}</TableCell>
                                    <TableCell>{admin.profile.ocupation}</TableCell>
                                    <TableCell>{admin.permissions}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleViewAdmin(admin.id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Ver
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleUpdateAdminStatus(admin.id, admin.user.state === BLOQUED_USER_STATUS ? ACTIVE_USER_STATUS : BLOQUED_USER_STATUS)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            BLOQUEAR
                                            {/* {client.user.state === BLOQUED_USER_STATUS ? "Desbloquear" : "Bloquear"} */}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteClient(admin.id)}
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


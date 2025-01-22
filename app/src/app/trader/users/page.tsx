'use client';
import { CssBaseline, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Container, Box, Grid, Paper } from "@mui/material";



const SamplePage = () => {
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
                            Investigadores
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
                                <TableCell>Avatar</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Apellido</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Ocupación</TableCell>
                                <TableCell>Area</TableCell>
                                <TableCell>Cargo</TableCell>
                                <TableCell>Institución</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        {/* <TableBody>
                            {researchers.map((researcher) => (
                                <TableRow key={researcher._id}>
                                    <TableCell>
                                        <Avatar src={researcher.avatar} alt={researcher.firstName} />
                                    </TableCell>
                                    <TableCell>{researcher.user.name}</TableCell>
                                    <TableCell>{researcher.user.lastname}</TableCell>
                                    <TableCell>{researcher.user.state}</TableCell>
                                    <TableCell>{researcher.user.email}</TableCell>
                                    <TableCell>{researcher.occupation}</TableCell>
                                    <TableCell>{researcher.area}</TableCell>
                                    <TableCell>{researcher.position}</TableCell>
                                    <TableCell>{researcher.institution}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleViewResearcher(researcher._id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Ver
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleUpdateResearcherStatus(researcher._id, researcher.user.state === BLOQUED_USER_STATUS ? ACTIVE_USER_STATUS : BLOQUED_USER_STATUS)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            {researcher.user.state === BLOQUED_USER_STATUS ? "Desbloquear" : "Bloquear"}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDeleteResearcher(researcher._id)}
                                            sx={{ mr: 1, mb: 1, textTransform: 'none', fontSize: '0.875rem' }}
                                        >
                                            Dar de baja
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody> */}
                    </Table>
                </TableContainer>
                {/* <CustomPagination
                    skip={skip}
                    limit={limit}
                    totalCount={totalCount}
                    onPageChange={handlePageChange}
                /> */}
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


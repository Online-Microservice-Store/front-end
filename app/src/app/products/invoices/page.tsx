'use client';
import mensajes from "@/app/components/Mensajes";
import { useAuth } from "@/context/AuthContext";
import { CssBaseline, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Container, Box, Grid, Paper, TableBody, Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomPagination from "@/app/components/CustomPagination";
import { getInvoiceByClientId } from "@/services/invoice.service";

const SamplePage = () => {
    const [invoices, setInvoices] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(null);
    const { getToken } = useAuth();
    const router = useRouter();
    const [token, setToken] = useState(getToken);
    const {getUser} = useAuth();
    const [user, setUser] = useState(getUser);

    const getInvoices = async () => {
        try {
            // const { totalCount, results } = await getAllClients(token, skip, limit);
            const {data, meta} = await getInvoiceByClientId(user.rolId);
            setTotalCount(meta.total);
            setInvoices(data);
            console.log(data);
        } catch (error:any) {
            mensajes("Error", error.response?.data?.customMessage || "No se ha podido obtener las facturas", "error");
        }
    }

    useEffect(() => {
        console.log(token);
        // Llamada a backend
        if (token) {
            getInvoices();
        }
        // setResearchers(mockResearchers);
    }, [token, skip, limit]);
  
    const handleViewInvoice = (id:string) => {
        // Lógica para actualizar el investigador researcheristrador
        router.push(`/products/invoices/invoicesStore/${id}`);
    };

    const handlePageChange = (newSkip : any) => {
        setSkip(newSkip);
    }
    return (
    <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginLeft: '16%'
                }}
            >
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography component="h1" variant="h5">
                            Facturas
                        </Typography>
                    </Grid>
                </Grid>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Iva</TableCell>
                                <TableCell>Descuento</TableCell>
                                <TableCell>Subtotal</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices.map((invoice:any) => (
                                <TableRow key={invoice.id}>
                                    {/* <TableCell>
                                        <Avatar src={client.avatar} alt={client.firstName} />
                                    </TableCell> */}
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>{invoice.tax}</TableCell>
                                    <TableCell>{invoice.discount}</TableCell>
                                    <TableCell>{invoice.subtotal}</TableCell>
                                    <TableCell>{invoice.total}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleViewInvoice(invoice.id)}
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


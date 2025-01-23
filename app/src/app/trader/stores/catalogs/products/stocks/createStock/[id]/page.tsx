"use client";
import { Grid, Box, Card, Typography, Stack } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import StockRegister from "@/app/components/StockRegister";


export default function CreateStock() { 
  
  return(
    <PageContainer title="Register" description="this is Register page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df,rgb(233, 234, 248),rgb(234, 239, 244))",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
          
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={12}
            xl={12}
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "100%"}}
            >
              {/* <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box> */}
              <StockRegister
                
                subtext={
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    color="textPrimary"
                    fontSize={30}
                    mb={1}
                  >
                    Crear Stock
                  </Typography>
                }
                subtitle={
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={1}
                    mt={3}
                  >
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

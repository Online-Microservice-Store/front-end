'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import SalesOverview from '../(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '../(DashboardLayout)/components/dashboard/YearlyBreakup';
import MonthlyEarnings from '../(DashboardLayout)/components/dashboard/MonthlyEarnings';
import RecentTransactions from '../(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '../(DashboardLayout)/components/dashboard/ProductPerformance';
// components

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup/>
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;

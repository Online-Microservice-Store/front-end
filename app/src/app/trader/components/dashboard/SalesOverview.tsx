import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


const SalesOverview = () => {

    // select
    const [month, setMonth] = React.useState('1');

    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart
    const optionscolumnchart: any = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
          },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: ['12/24', '01/25', '02/25'],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };
    const seriescolumnchart: any = [
        {
            name: 'Ganancias en este mes',
            data: [355, 390, 300],
        },
        {
            name: 'Gastos en este mes',
            data: [280, 250, 325],
        },
    ];

    return (

        <DashboardCard title="Ventas realizadas" action={
            <Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={handleChange}
            >
                <MenuItem value={1}>Diciembre 2024</MenuItem>
                <MenuItem value={2}>Enero 2025</MenuItem>
                <MenuItem value={3}>Febrero 2025</MenuItem>
            </Select>
        }>
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height={370} width={"100%"}
            />
        </DashboardCard>
    );
};

export default SalesOverview;

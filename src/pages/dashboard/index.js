import { useState } from 'react';

// material-ui
import {
    Grid,

    TextField,
    Typography
} from '@mui/material';

//api import
import { useGetAllCropsQuery } from 'api/cropApi';

// project import
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';



// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const {data}= useGetAllCropsQuery();

    console.log(data);
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography cursor="pointer" variant="h5">Home</Typography>
            </Grid>
            <Grid item xs={16} sm={6} md={4} lg={3}>
                <AnalyticEcommerce count="Insect" />
            </Grid>
            <Grid item xs={16} sm={6} md={4} lg={3}>
                <AnalyticEcommerce count="Weed" />
            </Grid>
            <Grid item xs={16} sm={6} md={4} lg={3}>
                <AnalyticEcommerce count="Diseases" />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        </Grid>
    );
};

export default DashboardDefault;

import { useState } from 'react';

// material-ui
import {
    Grid,
    TextField,
    Typography
} from '@mui/material';

//api import
import { useGetAllCropsQuery } from 'api/cropApi';
import { useGetAllUsersQuery } from 'api/userApi';


// project import
import MainCard from 'components/MainCard';
import UsersTable from './UsersTables';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

const AdminDashboard = () => {
    const { data } = useGetAllUsersQuery();

    console.log(data);
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Manage Users</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <UsersTable />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default AdminDashboard;

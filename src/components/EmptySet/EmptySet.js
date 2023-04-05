import React from 'react'

// material-ui
import {
    Grid,
    Typography,
    Box,
} from '@mui/material';


import {
    Empty
} from 'antd'

import MainCard from 'components/MainCard';

const EmptySet = ({ componentName }) => {
    return (
        <Grid item xs={12} lg={12}>
            <MainCard>
                <Empty description={`There are no ${componentName.toLowerCase()}s to display.`} />
            </MainCard>
        </Grid>
    )
}

export default EmptySet
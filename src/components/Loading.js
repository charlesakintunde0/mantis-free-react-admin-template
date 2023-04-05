import React from 'react'

//antd
import { Space, Spin } from 'antd'

// material-ui
import {
    Box,
    Grid
} from '@mui/material';

const Loading = () => {
    return (
        <Grid item xs={12} lg={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Space size="middle">
                    <Spin tip={'Loading content...'} size="large" />
                </Space>

            </Box>
        </Grid>
    )
}

export default Loading
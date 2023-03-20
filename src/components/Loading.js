import React from 'react'

//antd
import { Space, Spin } from 'antd'

// material-ui
import {
    Box
} from '@mui/material';

const Loading = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Space size="middle">
                <Spin tip={'Loading content...'} size="large" />
            </Space>

        </Box>
    )
}

export default Loading
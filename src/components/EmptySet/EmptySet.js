import React from 'react'

// material-ui
import {
    Grid,
    Typography,
    Box,
} from '@mui/material';

import MainCard from 'components/MainCard';

const EmptySet = ({ componentName, parentName }) => {
    return (
        <MainCard>
            <Typography>
                {`No ${componentName} is available currently...`}
            </Typography>
        </MainCard>
    )
}

export default EmptySet
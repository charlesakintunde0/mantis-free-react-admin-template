import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color, title, count, percentage, isLoss }) => (
    <MainCard contentSX={{ p: 2.25 }}>
        <Stack spacing={0.5}>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h4" color="inherit">
                        {count}
                    </Typography>
                </Grid>
            </Grid>
        </Stack>
    </MainCard>
);

AnalyticEcommerce.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
    color: 'primary'
};

export default AnalyticEcommerce;

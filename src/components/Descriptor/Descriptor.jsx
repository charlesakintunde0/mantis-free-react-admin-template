import MainCard from 'components/MainCard'
import React from 'react'
// material-ui
import {
    Grid,
    Typography
} from '@mui/material';


// antd
import { Carousel } from 'antd';


const Descriptor = ({ title, content }) => {

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <MainCard>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography>{title.toUpperCase()}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>
                </Grid>

                <Grid item xs={12}>
                    <Typography>{content}</Typography>
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default Descriptor
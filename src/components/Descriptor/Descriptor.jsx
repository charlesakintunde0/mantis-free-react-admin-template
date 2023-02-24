import MainCard from 'components/MainCard'
import React from 'react'
// material-ui
import {
    Grid,
    Typography
} from '@mui/material';


// antd
import { Carousel } from 'antd';


const Descriptor = ({ description }) => {

    // console.log(description)


    const contentStyle = {
        width: '100%',
        height: '250px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        objectFit: 'cover',

    };
    return (
        <MainCard>
            <Grid spacing={3}>
                <Grid item xs={12}>

                    <Typography variant='h6'>{description.descriptionTitle ? description.descriptionTitle.toUpperCase() : 'TITLE HERE'}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Carousel>
                        {description.peiPestInfoDescriptionImages.map((img) => (<>
                            <img key={img.id} style={contentStyle} src={img.peiPestDescriptionInfoImageUrl} />
                        </>))}

                    </Carousel>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='p'>{description.peiPestInfoDescriptionContent
                    }</Typography>
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default Descriptor
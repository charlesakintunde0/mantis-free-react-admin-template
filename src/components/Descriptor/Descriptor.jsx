import MainCard from 'components/MainCard'
import React from 'react'
// material-ui
import {
    Grid,
    Typography,
    Box
} from '@mui/material';

// react redux
import { useDispatch, useSelector } from 'react-redux'


//reducers
import { storedDescriptionCardData } from 'store/reducers/descriptionModal';

// api

import { useDeletePestInfoDescriptionMutation, useUpdatePestInfoDescriptionMutation } from '../../api/pestApi'

// antd
import {
    Carousel,
    Button,
    Tooltip,
} from 'antd';
import {
    DeleteFilled,
    EditOutlined
} from '@ant-design/icons';


const Descriptor = ({ description }) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state.descriptionModal);

    const [deletePestInfoDescription] = useDeletePestInfoDescriptionMutation();
    const handleDeleteDescription = () => {
        deletePestInfoDescription(description.id);
    }


    const handleEditDescription = () => {
        dispatch(storedDescriptionCardData({
            componentData: description,
            isOpen: true
        }));
    }


    const contentStyle = {
        width: '100%',
        height: '250px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        objectFit: 'cover',


    };

    const carouselStyle = {
        maxWidth: '80%',
        margin: '0 auto',
    }
    return (
        <MainCard>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Typography variant='h5'>{description.descriptionTitle ? description.descriptionTitle.toUpperCase() : ''}</Typography>
                        </Box>
                        <Box alignSelf="flex-end">
                            <Tooltip placement="top" title={'Edit'}>
                                <Button onClick={handleEditDescription} type="primary" ghost icon={<EditOutlined />} />
                            </Tooltip>

                            <Tooltip placement="top" title={'Delete'}>
                                <Button onClick={handleDeleteDescription} type="primary" ghost danger icon={<DeleteFilled />} />
                            </Tooltip>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" style={carouselStyle} justifyContent="center">
                        <Carousel >
                            {description.peiPestInfoDescriptionImages.map((img) => (<>

                                <img key={img.id} style={contentStyle} src={img.peiPestDescriptionInfoImageUrl} />
                            </>))}

                        </Carousel>
                    </Box>
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
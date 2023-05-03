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

// notifications
import { Notification, handleDeleteConfirmation } from 'components/Notifications/Notification';


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


const Descriptor = ({ description, useDeleteInfoDescriptionMutation, storedDescriptionCardData, isEditable }) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state.descriptionModal);

    const [deleteInfoDescription] = useDeleteInfoDescriptionMutation();
    const handleDeleteDescription = () => {
        deleteInfoDescription(description.id)
            .then((response) => {
                // handle successful response
                console.log('Delete')
                Notification('success', 'Operation successful', 'Description Deleted Successfully');
            })
            .catch((error) => {
                // handle error
                Notification('error', 'Error deleting description', error);
            });
    }



    console.log(description)
    const handleEditDescription = () => {
        dispatch(storedDescriptionCardData({
            descriptionComponentData: description,
            desricptionModalIsOpen: true
        }));


    }


    const contentStyle = {
        width: '100%',
        height: '350px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        objectFit: 'cover',
    };
    return (
        <MainCard>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Box display="flex">
                        <Box flexGrow={1}>
                            <Typography variant='h5'>{description.descriptionTitle ? description.descriptionTitle.toUpperCase() : ''}</Typography>
                        </Box>
                        {isEditable ?
                            <Box alignSelf="flex-end">
                                <Tooltip placement="top" title={'Edit'}>
                                    <Button onClick={handleEditDescription} type="primary" ghost icon={<EditOutlined />} />
                                </Tooltip>

                                <Tooltip placement="top" title={'Delete'}>
                                    <Button onClick={() => { handleDeleteConfirmation(handleDeleteDescription) }} type="primary" ghost danger icon={<DeleteFilled />} />
                                </Tooltip>
                            </Box> : ''}
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box >
                        <Carousel >
                            {description.peiInfoDescriptionImages.map((img) => (<>

                                <img key={img.id} style={contentStyle} src={img.peiDescriptionInfoImageUrl} />
                            </>))}

                        </Carousel>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box style={{ height: '200px', overflow: 'auto' }}>
                        <Typography variant='p'>
                            {description.peiInfoDescriptionContent}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default Descriptor
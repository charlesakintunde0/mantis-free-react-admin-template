import { useState, useEffect } from 'react'
import './insects.css'
import { Link } from "react-router-dom";
import './insects.css'
import './Crops.css'


// api
import { useDeleteCropMutation } from 'api/cropApi';

import { setUser } from 'store/reducers/user';

// material-ui
import {
    Grid,
    Typography,
    Box
} from '@mui/material';
// antd
import {
    Button,
    Tooltip,
    Card
} from 'antd';


// components
import CropManager from 'components/contentManager/CropManager/CropManager';
import Loading from 'components/Loading';
import EmptySet from 'components/EmptySet/EmptySet';
import { Notification, handleDeleteWithIdConfirmation } from 'components/Notifications/Notification';

// constants
import userRole from 'Constants/userRole';

//antd icons
import { PlusOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { openCropModal, storedCropCardData } from 'store/reducers/cropModal';

// api 
import { useGetUserQuery } from 'api/userApi';
import { useGetAllCropsQuery } from 'api/cropApi';

import MainCard from 'components/MainCard';

const contentStyle = {
    width: '100%',
    height: '250px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    objectFit: 'cover',

};

function CropsDisease() {

    const currentlyLoggedInUserData = useGetUserQuery();
    const drawerOpen = useSelector(state => state.menu.drawerOpen);
    const [deleteCrop] = useDeleteCropMutation();
    const [isCropLoading, setIsCropLoading] = useState(false)
    const allStoredCrops = useGetAllCropsQuery(null);
    const [allCrops, setAllCrop] = useState([]);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));
    const [role, setRole] = useState();

    const [isEditable, setIsEditable] = useState(false)

    useEffect(() => {
        setRole(user ? user.uRole : null)

        setIsEditable(role == userRole.ADMIN ? true : false);
    }, [user])


    const handleAddButtonClick = () => {
        dispatch(openCropModal({
            isOpen: true,
        }));
    }

    const handleEditCrop = (crop) => {
        dispatch(storedCropCardData({
            componentData: crop,
            isOpen: true,
            cropId: crop.id,
        }));


    }



    const handleDeleteCrop = (cropId) => {

        deleteCrop(cropId)
            .then(res => {
                Notification('success', 'Operation successful', 'Crop deleted successfully')
            }).catch(err => {
                Notification('error', 'Operation failed', err)
            })

    }



    useEffect(() => {
        setIsCropLoading(allStoredCrops.isLoading)
        if (currentlyLoggedInUserData.data) {
            // setCurentlyLoggedInUser(currentlyLoggedInUserData.data[0])
            dispatch(setUser(currentlyLoggedInUserData.data[0]));
        }
        if (allStoredCrops.data) {
            setAllCrop(allStoredCrops.data)
        }
    }, [currentlyLoggedInUserData.status, allStoredCrops.status]);
    return (
        <>
            <Grid
                container
                spacing={5}>
                <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                    <MainCard>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box flexGrow={2}>
                                <Typography variant='h5' style={{ textTransform: 'uppercase' }}>{'Select Crop'}</Typography>
                            </Box>
                            <Box alignSelf="flex-end">
                                {isEditable
                                    ?
                                    <Button onClick={handleAddButtonClick} type="primary"
                                        icon={<PlusOutlined />} >
                                        {'Add Crop'}
                                    </Button>
                                    : ''}

                            </Box>
                        </Box>
                        <CropManager />
                    </MainCard>
                </Grid>

                <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                    <Grid container spacing={5}>
                        {isCropLoading ?
                            <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                                <Loading />
                            </Grid> :
                            allCrops.length === 0 ?

                                <EmptySet componentName={'crop'} parentName={''} />
                                : <>{
                                    allCrops.map(crop => (

                                        <Grid item xs={6} sm={4} md={4} lg={3}>
                                            <Card
                                                hoverable
                                                cover={
                                                    <Link to={`/diseases/${crop.id}`} key={crop.id}>
                                                        <img
                                                            alt="Loading Images"
                                                            src={crop.image}
                                                            style={contentStyle}
                                                        />
                                                    </Link>
                                                }
                                                actions={
                                                    isEditable ?
                                                        [

                                                            <Button type="primary" ghost style={{ outline: 'none' }} icon={<EditOutlined />} onClick={() => handleEditCrop(crop)} />,
                                                            <Button type="primary" danger ghost style={{ outline: 'none' }} icon={<DeleteOutlined />} onClick={() => handleDeleteWithIdConfirmation(handleDeleteCrop, crop.id)} />

                                                        ] : ''
                                                }
                                            >
                                                <Link to={`/diseases/${crop.id}`} key={crop.id}><Typography variant={'h5'}> {crop.crop}</Typography></Link>
                                            </Card>


                                        </Grid>

                                    )
                                    )
                                }

                                </>}
                    </Grid>

                </Grid>
            </Grid>
        </>
    )

}

export default CropsDisease

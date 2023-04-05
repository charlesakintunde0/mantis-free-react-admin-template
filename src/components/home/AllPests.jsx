import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from "react-router-dom";

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

// card
import MainCard from 'components/MainCard';

//antd icons
import { PlusOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

//component
import PestManager from 'components/contentManager/PestManager/PestManager';

// api 
import { useGetUserQuery } from 'api/userApi';
import { useGetCropsPestQuery, useDeletePestMutation, } from 'api/pestApi';


import { useDispatch, useSelector } from 'react-redux';
import { openPestModal, storedPestCardData } from 'store/reducers/pestModal';

//constant 
import userRole from 'Constants/userRole';
import EmptySet from 'components/EmptySet/EmptySet';
import Loader from 'components/Loader';
import { handleDeleteWithIdConfirmation, Notification } from 'components/Notifications/Notification';

const contentStyle = {
    width: '100%',
    height: '250px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    objectFit: 'cover',

};


function AllPests() {
    const cropID = useParams().cropID;
    const currentlyLoggedInUserData = useGetUserQuery();
    const getCropsPest = useGetCropsPestQuery(cropID);
    const [deleteCropsPest] = useDeletePestMutation();
    const drawerOpen = useSelector(state => state.menu.drawerOpen);
    const dispatch = useDispatch();
    const [pest, setPest] = useState([]);
    const [cropName, setCropName] = useState([]);
    const [isPestLoading, setIsPestLoading] = useState(false);
    const [curentlyLoggedInUser, setCurentlyLoggedInUser] = useState(null);

    const handleAddButtonClick = () => {
        dispatch(openPestModal({
            isOpen: true,
            cropId: cropID,
        }));
    }


    useEffect(() => {

        const fetchPests = async () => {
            try {
                setIsPestLoading(getCropsPest.isLoading)
                if (getCropsPest.data) {
                    setCropName(getCropsPest.data[0].cropName);
                    setPest(getCropsPest.data[0].pests);
                }
            }
            catch (e) { }
        }
        fetchPests();

    }, [getCropsPest.status]);

    console.log(getCropsPest)

    const handleEditPest = (pest) => {

        dispatch(storedPestCardData({
            componentData: pest,
            isOpen: true,
            pestId: pest.pId,
        }));


    }

    const handleDeletePest = (pestId) => {
        deleteCropsPest(pestId)
            .then(res => {
                Notification('success', 'Operation successful', 'Disease deleted successfully')
            }).catch(err => {
                Notification('error', 'Operation failed', err)
            })
    }

    return (
        <>
            <Grid
                container
                spacing={5}>
                <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                    <MainCard>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box flexGrow={2}>
                                <Typography variant='h5' style={{ textTransform: 'uppercase' }}> {cropName} PEST</Typography>
                            </Box>
                            <Box alignSelf="flex-end">
                                <Tooltip placement="bottom" title={'Add Pest'}>
                                    <Button onClick={handleAddButtonClick} type="primary"
                                        icon={<PlusOutlined />} />
                                </Tooltip>
                            </Box>
                        </Box>
                        <PestManager />
                    </MainCard>

                </Grid>


                <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                    <Grid container spacing={5}>
                        {
                            pest.length == 0 ?
                                <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                                    <EmptySet componentName={'pest'} />
                                </Grid>
                                : isPestLoading ?
                                    <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                                        <Loader />
                                    </Grid>
                                    : <> {
                                        pest.map(p => (

                                            <Grid item xs={12} sm={3} md={3} lg={3}>
                                                <Card
                                                    hoverable
                                                    cover={
                                                        <Link to={`/Pest/Description/${p.pName}/${p.pId}`}>
                                                            <img
                                                                alt="Loading Images"
                                                                src={p.image}
                                                                style={contentStyle}
                                                            />
                                                        </Link>
                                                    }
                                                    actions={[
                                                        <Button type="primary" ghost style={{ outline: 'none' }} icon={<EditOutlined />} onClick={() => handleEditPest(p)} />,
                                                        <Button type="primary" danger ghost style={{ outline: 'none' }} icon={<DeleteOutlined />} onClick={() => handleDeleteWithIdConfirmation(handleDeletePest, p.pId)} />

                                                    ]}
                                                >
                                                    <Link to={`/Pest/Description/${p.pName}/${p.pId}`}><Typography variant={'h5'}> {p.pName}</Typography></Link>
                                                </Card>


                                            </Grid>

                                        )
                                        )
                                    } </>}

                    </Grid>

                </Grid>
            </Grid>

        </>

    )
}

export default AllPests

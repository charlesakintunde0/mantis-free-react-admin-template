import React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import "./allDiseases.css";
import Config from "./../../config.json"

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

// react-redux
import { useDispatch, useSelector } from 'react-redux';

//api
import { useGetCropsDiseaseQuery, useCreateDiseaseMutation, useUpdateDiseaseMutation, useDeleteDiseaseMutation, useGetDiseaseInfoDescriptionQuery, useCreateDiseaseInfoDescription } from 'api/diseasesApi';

import MainCard from 'components/MainCard';

//antd icons
import { PlusOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// components
import Loading from 'components/Loading';
import EmptySet from 'components/EmptySet/EmptySet';
import { Notification, handleDeleteWithIdConfirmation } from 'components/Notifications/Notification';
import DiseaseManager from 'components/contentManager/DiseaseManager/DiseaseManager';

import { openDiseaseModal, closeDiseaseModal, storedDiseaseCardData } from 'store/reducers/diseaseModal';


const contentStyle = {
    width: '100%',
    height: '250px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    objectFit: 'cover',

};

function AllDiseases() {
    const dispatch = useDispatch();
    const cropId = useParams().cropID;
    const drawerOpen = useSelector(state => state.menu.drawerOpen);
    const [disease, setDisease] = useState([]);
    const [cropName, setCropName] = useState([]);
    const getCropDiseases = useGetCropsDiseaseQuery(cropId);
    const [deleteDisease] = useDeleteDiseaseMutation();


    useEffect(() => {
        const fetchDiseases = async () => {
            try {
                if (getCropDiseases.data) {
                    setCropName(getCropDiseases.data[0].cropName);
                    setDisease(getCropDiseases.data[0].diseases);
                }
                console.log(getCropDiseases)

            } catch (err) {
                console.log(err);
            }
        }
        fetchDiseases();

    }, [getCropDiseases.status])



    const handleAddButtonClick = () => {
        dispatch(openDiseaseModal({
            isOpen: true,
            cropId: cropId,
        }));
    }

    const handleEditCrop = (disease) => {

        dispatch(storedDiseaseCardData({
            componentData: disease,
            isOpen: true,
            cropId: cropId,
        }));
    }

    const handleDeleteCrop = (diseaseId) => {
        deleteDisease(diseaseId)
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
                                <Typography variant='h5' style={{ textTransform: 'uppercase' }}>{'Select Disease'}</Typography>
                            </Box>
                            <Box alignSelf="flex-end">
                                <Tooltip placement="bottom" title={'Add Disease'}>
                                    <Button onClick={handleAddButtonClick} type="primary"
                                        icon={<PlusOutlined />} />
                                </Tooltip>
                            </Box>
                        </Box>
                        <DiseaseManager />
                    </MainCard>
                </Grid>

                <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                    <Grid container spacing={5}>
                        {getCropDiseases.isLoading &&
                            getCropDiseases.status === 'fulfilled' ? <Loading /> : !getCropDiseases.isLoading && !getCropDiseases.status !== 'fulfilled' && disease.length === 0 ? <Grid item xs={12} lg={drawerOpen ? 10 : 12}><EmptySet componentName={'disease'} parentName={''} /> </Grid> : <>{
                                disease.map(disease => (

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card
                                            hoverable
                                            cover={
                                                <Link to={`/disease/description/${disease.dName}/${disease.dId}`} key={disease.dId}>
                                                    <img
                                                        alt="Loading Images"
                                                        src={disease.image}
                                                        style={contentStyle}
                                                    />
                                                </Link>
                                            }
                                            actions={[

                                                <Button type="primary" ghost style={{ outline: 'none' }} icon={<EditOutlined />} onClick={() => handleEditCrop(disease)} />,
                                                <Button type="primary" danger ghost style={{ outline: 'none' }} icon={<DeleteOutlined />} onClick={() => handleDeleteWithIdConfirmation(handleDeleteCrop, disease.dId)} />

                                            ]}
                                        >
                                            <Link to={`/disease/description/${disease.dName}/${disease.dId}`} key={disease.dId}><Typography variant={'h5'}> {disease.dName}</Typography></Link>
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

export default AllDiseases

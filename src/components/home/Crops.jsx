import { useState, useEffect } from 'react'
import { setUser } from 'store/reducers/user';

import { Link } from "react-router-dom";
import './insects.css'
import './Crops.css'
import Config from "./../../config.json";

//toast
import { toast } from 'react-toastify';

// axios
import axios from 'axios'

// material-ui
import {
    Grid,
    Typography,
    Box
} from '@mui/material';


// antd
import {
    Space,
    Spin,
    Button,
    Tooltip,
    Card
} from 'antd';


// components
import CropManager from 'components/contentManager/CropManager/CropManager';



//antd icons
import { PlusOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { openCropModal, storedCropCardData } from 'store/reducers/cropModal';

import MainCard from 'components/MainCard';



// constants
import userRole from 'Constants/userRole';

// api 
import { useGetUserQuery } from 'api/userApi';
import { useGetAllCropsQuery } from 'api/cropApi';

const contentStyle = {
    width: '100%',
    height: '250px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    objectFit: 'cover',

};

function Crops() {
    const currentlyLoggedInUserData = useGetUserQuery();
    const drawerOpen = useSelector(state => state.menu.drawerOpen);
    const allStoredCrops = useGetAllCropsQuery(null);
    const [allCrops, setAllCrop] = useState(null);
    const dispatch = useDispatch();

    const [curentlyLoggedInUser, setCurentlyLoggedInUser] = useState(null);


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
        axios.delete(Config.DELETE_CROP + cropId)
            .then(res => {
                // toast.success('record has been deleted', { //THE SUCCESS NOTIFICATION
                //     position: toast.POSITION.TOP_RIGHT,
                //     hideProgressBar: false,
                //     autoClose: 2000,

                // });
            })

    }



    useEffect(() => {
        if (currentlyLoggedInUserData.data) {
            setCurentlyLoggedInUser(currentlyLoggedInUserData.data[0])
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
                                <Tooltip placement="bottom" title={'Add Crop'}>
                                    <Button onClick={handleAddButtonClick} type="primary"
                                        icon={<PlusOutlined />} />
                                </Tooltip>
                            </Box>
                        </Box>
                        <CropManager />
                    </MainCard>

                </Grid>

                <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                    <Grid container spacing={5}>
                        {
                            allCrops ? <> {
                                allCrops.map(crop => (

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card
                                            hoverable
                                            cover={
                                                <Link to={`/Crops/${crop.id}`} key={crop.id}>
                                                    <img
                                                        alt="Loading Images"
                                                        src={crop.image}
                                                        style={contentStyle}
                                                    />
                                                </Link>
                                            }
                                            actions={[

                                                <Button type="primary" ghost style={{ outline: 'none' }} icon={<EditOutlined />} onClick={() => handleEditCrop(crop)} />,
                                                <Button type="primary" danger ghost style={{ outline: 'none' }} icon={<DeleteOutlined />} onClick={() => handleDeleteCrop(crop.id)} />

                                            ]}
                                        >
                                            <Link to={`/Crops/${crop.id}`} key={crop.id}><Typography variant={'h5'}> {crop.crop}</Typography></Link>
                                        </Card>


                                    </Grid>

                                )
                                )
                            } </>
                                :
                                <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Space size="middle">
                                            <Spin tip={'Loading content...'} size="large" />
                                        </Space>

                                    </Box>
                                </Grid>

                        }
                    </Grid>

                </Grid>
            </Grid>
        </>
    )

}

export default Crops

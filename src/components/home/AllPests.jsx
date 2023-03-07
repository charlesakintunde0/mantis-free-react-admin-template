import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Link } from "react-router-dom";
import Config from "./../../config.json";

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


import MainCard from 'components/MainCard';

//antd icons
import { PlusOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

//component
import PestManager from 'components/contentManager/PestManager/PestManager';



// api 
import { useGetUserQuery } from 'api/userApi';

import { useDispatch, useSelector } from 'react-redux';
import { openPestModal } from 'store/reducers/pestModal';

//constant 
import userRole from 'Constants/userRole';

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
    //test comment
    const currentlyLoggedInUserData = useGetUserQuery();
    const cropID = useParams().cropID;
    const toAdmin = {
        pathname: "/AdminPests",
        param1: cropID,
    }
    const drawerOpen = useSelector(state => state.menu.drawerOpen);
    const dispatch = useDispatch();
    const [pest, setPest] = useState([]);
    const [cropName, setCropName] = useState([]);
    const [curentlyLoggedInUser, setCurentlyLoggedInUser] = useState(null);

    const [add, setAdd] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // for populating all the states until its false
    const [loading1, setLoading1] = useState(true);

    useEffect(() => {
        fetchUser();
        if (loading) {
            fetchUser();
        }
        fetchPests();
        if (loading1) {
            fetchPests();
        }

    }, [loading, loading1])

    const handleAddButtonClick = () => {
        dispatch(openPestModal({
            isOpen: true,
            cropId: cropID,
        }));
    }


    useEffect(() => {
        if (currentlyLoggedInUserData.data) {
            setCurentlyLoggedInUser(currentlyLoggedInUserData.data[0])
        }
        // if (allStoredCrops.data) {
        //     setAllCrop(allStoredCrops.data)
        // }
    }, [currentlyLoggedInUserData.status]);

    const fetchPests = async () => {
        try {
            const res = await axios.get(Config.FETCH_SPECIFIC_CROP + cropID);
            setCropName(res.data[0].cropName);
            setPest(res.data[0].pestDetails);
            console.log(res.data[0].pestDetails);

        } catch (err) {
            console.log(err);
        }

    }

    const fetchUser = async () => {
        try {
            const res = await fetch(Config.GET_USER, {
                headers: { "Content-Type": 'application/json;charset=UTF-8' },
                credentials: 'include',
            });

            const content = await res.json();
            setUser(content[0]);
            console.log(user);
            if (curentlyLoggedInUser && curentlyLoggedInUser.isAdmin == userRole.ADMIN) {
                setAdd(true);

            }
            setLoading(false);
        }
        catch (e) {
            console.log(e);
        }
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
            </Grid>

            <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                <Grid container spacing={5}>
                    {
                        pest ? <> {
                            pest.map(p => (

                                <Grid item xs={12} sm={6} md={3}>
                                    <Card
                                        hoverable
                                        cover={
                                            <Link to={`/Pest/Description/${p.pId}`}>
                                                <img
                                                    alt="Loading Images"
                                                    src={p.pUrl}
                                                    style={contentStyle}
                                                />
                                            </Link>
                                        }
                                        actions={[
                                            <EditOutlined key="edit" />,
                                            <DeleteOutlined key="delete" />,
                                        ]}
                                    >
                                        <Link to={`/Pest/Description/${p.pId}`}><Typography variant={'h5'}> {p.pName}</Typography></Link>
                                    </Card>


                                </Grid>

                            )
                            )
                        } </>
                            : <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Space size="middle">
                                        <Spin tip={'Loading content...'} size="large" />
                                    </Space>

                                </Box>
                            </Grid>

                    }
                </Grid>

            </Grid>

        </>

    )
}

export default AllPests

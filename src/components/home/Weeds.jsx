import { useState, useEffect } from 'react'
import { setUser } from 'store/reducers/user';

import { Link } from "react-router-dom";
import './insects.css'
// import './Weeds.css'


// api
import { useDeleteWeedMutation } from 'api/weedApi';

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
    Button,
    Tooltip,
    Card
} from 'antd';


// components
import WeedManager from 'components/contentManager/WeedManager/WeedManager';
import Loading from 'components/Loading';
import EmptySet from 'components/EmptySet/EmptySet';
import { Notification, handleDeleteWithIdConfirmation } from 'components/Notifications/Notification';



//antd icons
import { PlusOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { openWeedModal, storedWeedCardData } from 'store/reducers/weedModal';

import MainCard from 'components/MainCard';



// constants
import userRole from 'Constants/userRole';

// api 
import { useGetUserQuery } from 'api/userApi';
import { useGetAllWeedsQuery } from 'api/weedApi';

const contentStyle = {
    width: '100%',
    height: '250px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    objectFit: 'cover',

};

function Weeds() {
    const currentlyLoggedInUserData = useGetUserQuery();
    const drawerOpen = useSelector(state => state.menu.drawerOpen);
    const [deleteWeed] = useDeleteWeedMutation();
    const allStoredWeeds = useGetAllWeedsQuery();
    const [allWeeds, setAllWeed] = useState([]);
    const dispatch = useDispatch();

    const [curentlyLoggedInUser, setCurentlyLoggedInUser] = useState(null);


    const handleAddButtonClick = () => {
        dispatch(openWeedModal({
            isOpen: true,
        }));
    }

    const handleEditWeed = (weed) => {
        dispatch(storedWeedCardData({
            componentData: weed,
            isOpen: true,
            weedId: weed.id,
        }));


    }



    const handleDeleteWeed = (weedId) => {

        deleteWeed(weedId)
            .then(res => {
                Notification('success', 'Operation successful', 'Weed deleted successfully')
            }).catch(err => {
                Notification('error', 'Operation failed', err)
            })

    }



    useEffect(() => {
        if (currentlyLoggedInUserData.data) {
            setCurentlyLoggedInUser(currentlyLoggedInUserData.data[0])
            dispatch(setUser(currentlyLoggedInUserData.data[0]));
        }
        if (allStoredWeeds.data) {
            setAllWeed(allStoredWeeds.data)
        }
    }, [allStoredWeeds.status]);

    console.log(allWeeds)

    return (
        <>
            <Grid
                container
                spacing={5}>
                <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                    <MainCard>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box flexGrow={2}>
                                <Typography variant='h5' style={{ textTransform: 'uppercase' }}>{'Select Weed'}</Typography>
                            </Box>
                            <Box alignSelf="flex-end">
                                <Tooltip placement="bottom" title={'Add Weed'}>
                                    <Button onClick={handleAddButtonClick} type="primary"
                                        icon={<PlusOutlined />} />
                                </Tooltip>
                            </Box>
                        </Box>
                        <WeedManager />
                    </MainCard>

                </Grid>

                <Grid item xs={12} lg={drawerOpen ? 12 : 12}>
                    <Grid container spacing={5}>



                        {allStoredWeeds.isLoading &&
                            allStoredWeeds.status === 'fulfilled' ? <Loading /> : !allStoredWeeds.isLoading && !allStoredWeeds.status !== 'fulfilled' && allWeeds.length === 0 ? <Grid item xs={12} lg={drawerOpen ? 10 : 12}><EmptySet componentName={'Weed'} parentName={''} /> </Grid> : <>{
                                allWeeds.map(Weed => (

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card
                                            hoverable
                                            cover={
                                                <Link to={`/weed/description/${Weed.weed}/${Weed.id}`} key={Weed.id}>
                                                    <img
                                                        alt="Loading Images"
                                                        src={Weed.image}
                                                        style={contentStyle}
                                                    />
                                                </Link>
                                            }
                                            actions={[

                                                <Button type="primary" ghost style={{ outline: 'none' }} icon={<EditOutlined />} onClick={() => handleEditWeed(Weed)} />,
                                                <Button type="primary" danger ghost style={{ outline: 'none' }} icon={<DeleteOutlined />} onClick={() => handleDeleteWithIdConfirmation(handleDeleteWeed, Weed.id)} />

                                            ]}
                                        >
                                            <Link to={`/weed/description/${Weed.weed}/${Weed.id}`} key={Weed.id}><Typography variant={'h5'}> {Weed.weed}</Typography></Link>
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

export default Weeds


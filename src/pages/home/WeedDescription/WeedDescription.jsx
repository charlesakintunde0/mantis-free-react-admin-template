import React, { useState, useEffect, useRef } from 'react'


// material-ui
import {
    Grid,
    Typography,
    Box
} from '@mui/material';

//styles
import '../../../GenericStyles/styles.css';

// antd
import {
    Button,
} from 'antd';
//router
import { useParams } from 'react-router'

// react router
import { useNavigate } from 'react-router-dom';

//redux
import { setUser } from 'store/reducers/user';
import { useDispatch, useSelector } from 'react-redux';

// constants
import userRole from 'Constants/userRole';

// components
import Descriptor from 'components/Descriptor/Descriptor';
import DescriptionManager from 'components/contentManager/DescriptionManger/GenericDescriptorManager';
import EmptySet from 'components/EmptySet/EmptySet';
import MainCard from 'components/MainCard';
import Loading from 'components/Loading';

// notifications
import { Notification } from 'components/Notifications/Notification';

// antd
import { PlusOutlined } from '@ant-design/icons';

// redux reducers
import { closeDescriptionModal, openDescriptionModal, storedDescriptionCardData } from 'store/reducers/weedModal';

// api
import { useGetWeedInfoDescriptionQuery, useUpdateWeedInfoDescriptionMutation, useCreateWeedInfoDescriptionMutation, useDeleteUploadedImageInWeedInfoDescriptionMutation, useDeleteWeedInfoDescriptionMutation } from '../../../api/weedApi';
import { useCreateCoordinatesMutation } from 'api/coordinates';

import useGeoLocation from 'components/hooks/LeafletLocation';

import LeafletLocation from 'components/hooks/LeafletLocation';


const WeedDescription = () => {
    const dispatch = useDispatch();
    const { desricptionModalIsOpen, descriptionComponentData } = useSelector(state => state.weedModal);
    const [createUserCoordinates] = useCreateCoordinatesMutation();
    const drawerOpen = useSelector(state => state.menu.drawerOpen);
    const { weedId, weedName } = useParams(); //saves the pest ID from previous page
    const weedInfoDescriptionData = useGetWeedInfoDescriptionQuery(weedId);
    const currentlyLoggedInUser = JSON.parse(localStorage.getItem('user'));
    const userId = currentlyLoggedInUser.uId;
    const map = LeafletLocation(weedId, userId);
    const userLocation = useGeoLocation();
    const [weedInfoDescription, setWeedInfoDescription] = useState([]);
    const [isWeedInfoDescriptionLoading, setIsWeedInfoDescriptionLoading] = useState(false);
    const [informative, setinformative] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    const [role, setRole] = useState();

    useEffect(() => {
        setRole(user ? user.uRole : null)
    }, [user])

    useEffect(() => {
        setIsWeedInfoDescriptionLoading(weedInfoDescriptionData.isLoading)
        if (weedInfoDescriptionData.isSuccess) {
            setWeedInfoDescription(weedInfoDescriptionData.data)

        }

    }, [weedInfoDescriptionData])

    const handleAddButtonClick = () => {

        dispatch(openDescriptionModal({
            desricptionModalIsOpen: true,
            weedId: weedId
        }));
    }

    const saveUserCoordinataes = (e) => {
        e.preventDefault();
        setinformative(true);
        if (userLocation.loaded) {
            createUserCoordinates(
                JSON.stringify({
                    PId: weedId,
                    UId: userId,
                    CoordLat: userLocation.coordinates.lat,
                    CoordLng: userLocation.coordinates.lng
                })
            )
                .then(() => {

                    Notification('success', 'Operation successful', "Data saved successfully");
                })
        }
    }


    return (
        <>

            <Grid
                container
                spacing={2}
            >

                <Grid item xs={12} sm={12} md={12} lg={drawerOpen ? 10 : 11}>
                    <MainCard>
                        <Grid
                            container
                            spacing={3}>
                            <Grid
                                item xs={12}
                            >

                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box flexGrow={2}>
                                        <Typography variant='h5'>{weedName ? weedName.toUpperCase() : "PEST NAME"} {'DESCRIPTION'}</Typography>
                                    </Box>
                                    <Box alignSelf="flex-end">
                                        {role == userRole.ADMIN
                                            ?
                                            <Button onClick={handleAddButtonClick} type="primary"
                                                icon={<PlusOutlined />} >
                                                {'Add Description'}
                                            </Button>
                                            : ''}

                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <DescriptionManager
                            Id={weedId}
                            componentData={descriptionComponentData}
                            isOpen={desricptionModalIsOpen}
                            useDeleteUploadedImageMutation={useDeleteUploadedImageInWeedInfoDescriptionMutation}
                            closeDescriptionModal={closeDescriptionModal}
                            useUpdateInfoDescriptionMutation={useUpdateWeedInfoDescriptionMutation}
                            useCreateInfoDescriptionMutation={useCreateWeedInfoDescriptionMutation} />
                    </MainCard>

                </Grid>
                {isWeedInfoDescriptionLoading ?
                    <Grid item xs={12} sm={12} md={12} lg={drawerOpen ? 10 : 11}>
                        <Loading />
                    </Grid>

                    : weedInfoDescription.length === 0 ?
                        <Grid item xs={12} sm={12} md={12} lg={drawerOpen ? 10 : 11}>
                            <EmptySet componentName={'description'} />
                        </Grid>
                        :
                        <> {weedInfoDescription.map((description) =>
                        (
                            <Grid
                                item
                                xs={12}
                                lg={drawerOpen ? 5 : 5.5}>
                                <Descriptor
                                    key={description.id}
                                    storedDescriptionCardData={storedDescriptionCardData}
                                    description={description}
                                    useDeleteInfoDescriptionMutation={useDeleteWeedInfoDescriptionMutation} />
                            </Grid>

                        )
                        )
                        }

                        </>}



                {
                    weedInfoDescription.length === 0
                        ? '' :
                        <Grid item xs={12} sm={12} md={12} lg={drawerOpen ? 10 : 11}>
                            {!informative ? <Box sx={{ display: 'flex', justifyContent: 'center' }} className="helpful">
                                <p>Was this information helpful? </p>
                                <button onClick={saveUserCoordinataes}>Yes</button>
                                <button>No</button>
                            </Box>
                                : <Box className="helpful">
                                    <p>Was this information helpful? </p>
                                    <button disabled>Yes</button>
                                    <button disabled>No</button>
                                </Box>}
                        </Grid>
                }



                {
                    weedInfoDescription.length !== 0
                        ?
                        <Grid item xs={12} sm={12} md={12} lg={drawerOpen ? 10 : 11}>
                            <Box className="location child1"> {/* The Map DIv will be shown in the end of the description */}
                                <Box className="helpImprove">
                                    <h4>Help us improve</h4>
                                    <p>Drag the marker on the map to the location where you saw this pest</p>
                                </Box>


                                <Box>
                                    {map}
                                </Box>

                            </Box>
                        </Grid> : ''}

            </Grid>

        </>
    )
}

export default WeedDescription
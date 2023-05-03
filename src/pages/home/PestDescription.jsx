
import React, { useState, useEffect, useRef } from 'react'
import "./PestDescription.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useGeoLocation from 'components/hooks/useGeoLocation';

import LeafletLocation from 'components/hooks/LeafletLocation';



// material-ui
import {
    Grid,
    Typography,
    Box
} from '@mui/material';

// react redux
import { useSelector } from 'react-redux';


// antd
import {
    Button,
} from 'antd';
//router
import { useParams } from 'react-router'

// react router
import { Link, useNavigate } from 'react-router-dom';

// constants
import userRole from 'Constants/userRole';

//redux
import { setUser } from 'store/reducers/user';
import { useDispatch, } from 'react-redux';
import { closeDescriptionModal, openDescriptionModal, storedDescriptionCardData } from 'store/reducers/pestModal';

// components
import Descriptor from 'components/Descriptor/Descriptor';
import DescriptionManager from 'components/contentManager/DescriptionManger/GenericDescriptorManager';
import EmptySet from 'components/EmptySet/EmptySet';

// notifications
import { Notification } from 'components/Notifications/Notification';

// antd
import { PlusOutlined } from '@ant-design/icons';

// api
import { useGetUserQuery } from 'api/userApi';
import { useGetPestInfoDescriptionQuery, useCreatePestInfoDescriptionMutation, useUpdatePestInfoDescriptionMutation, useDeleteUploadedImageInPestInfoDescriptionMutation, useDeletePestInfoDescriptionMutation } from 'api/pestApi';
import { useCreateCoordinatesMutation } from 'api/coordinates';
import MainCard from 'components/MainCard';
import Loading from 'components/Loading';

toast.configure()

function PestDescription() {
    const dispatch = useDispatch();
    const { desricptionModalIsOpen, descriptionComponentData } = useSelector(state => state.weedModal); const [createUserCoordinates] = useCreateCoordinatesMutation();
    const drawerOpen = useSelector(state => state.menu.drawerOpen);
    const { pestId, pestName } = useParams(); //saves the pest ID from previous page
    const pestInfoDescriptionData = useGetPestInfoDescriptionQuery(pestId);
    const currentlyLoggedInUser = JSON.parse(localStorage.getItem('user'));
    const userId = currentlyLoggedInUser.uId;
    const map = LeafletLocation(pestId, userId);
    const userLocation = useGeoLocation();
    const [pestInfoDescription, setPestInfoDescription] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const [role, setRole] = useState();
    const [isEditable, setIsEditable] = useState(false)

    useEffect(() => {
        setRole(user ? user.uRole : null)

        setIsEditable(role == userRole.ADMIN ? true : false);
    }, [user])




    const [informative, setinformative] = useState(false);

    // useEffect(() => {

    // },[user])



    useEffect(() => {
        setIsLoading(pestInfoDescriptionData.isLoading);
        // setIsFulfilled(pestInfoDescriptionData.status === 'fulfilled' ? true : false);
        if (pestInfoDescriptionData.isSuccess) {
            setPestInfoDescription(pestInfoDescriptionData.data)
        }

    }, [pestInfoDescriptionData])

    const handleAddButtonClick = () => {

        console.log(pestId)

        dispatch(openDescriptionModal({
            desricptionModalIsOpen: true,
            pestId: pestId
        }));
    }




    const saveUserCoordinataes = (e) => {
        e.preventDefault();
        setinformative(true);
        if (userLocation.loaded) {
            createUserCoordinates(
                JSON.stringify({
                    PId: pestId,
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
            <div >
                <Grid
                    container
                    spacing={2}
                >

                    <Grid item xs={12} lg={drawerOpen ? 10 : 11}>
                        <MainCard>
                            <Grid
                                container
                                spacing={3}>
                                <Grid
                                    item xs={12}
                                >

                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Box flexGrow={2}>
                                            <Typography variant='h5'>{pestName ? pestName.toUpperCase() : "PEST NAME"}</Typography>
                                        </Box>
                                        <Box alignSelf="flex-end">
                                            {
                                                role === userRole.ADMIN ?
                                                    <Button onClick={handleAddButtonClick} type="primary"
                                                        icon={<PlusOutlined />} >
                                                        {'Add Description'}
                                                    </Button> : ''
                                            }


                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                            <DescriptionManager
                                Id={pestId}
                                isEditable={isEditable}
                                componentData={descriptionComponentData}
                                isOpen={desricptionModalIsOpen}
                                useDeleteUploadedImageMutation={useDeleteUploadedImageInPestInfoDescriptionMutation}
                                closeDescriptionModal={closeDescriptionModal}
                                useUpdateInfoDescriptionMutation={useUpdatePestInfoDescriptionMutation}
                                useCreateInfoDescriptionMutation={useCreatePestInfoDescriptionMutation} />
                        </MainCard>

                    </Grid>




                    {isLoading ?
                        <Grid item xs={12} lg={drawerOpen ? 10 : 11}>
                            <Loading />
                        </Grid>
                        : pestInfoDescription.length === 0 ?
                            <Grid item xs={12} lg={drawerOpen ? 10 : 11}>
                                <EmptySet componentName={'description'} />
                            </Grid> : <> {pestInfoDescription.map((description) =>
                            (
                                <Grid item xs={12} lg={drawerOpen ? 5 : 5.5}>
                                    <Descriptor
                                        key={description.id}
                                        storedDescriptionCardData={storedDescriptionCardData}
                                        description={description}
                                        isEditable={isEditable}
                                        useDeleteInfoDescriptionMutation={useDeletePestInfoDescriptionMutation} />
                                </Grid>

                            )
                            )
                            }

                            </>}

                    {
                        pestInfoDescription.length === 0
                            ? ''
                            :
                            <Grid item xs={12} lg={drawerOpen ? 10 : 11}>
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





                    {pestInfoDescription.length !== 0 ?
                        <Grid item xs={12} lg={drawerOpen ? 10 : 11}>
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
            </div>
        </>
    )
}

export default PestDescription

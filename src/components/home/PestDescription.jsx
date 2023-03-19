
import React, { useState, useEffect, useRef } from 'react'
import "./PestDescription.css";
import LeafletLocation from '../hooks/LeafletLocation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGeoLocation from '../hooks/useGeoLocation';
import Footer from '../Footer/Footer';
import Config from "./../../config.json"

// material-ui
import {
    Grid,
    Typography,
    Box
} from '@mui/material';




// antd
import {
    Carousel,
    Button,
    Tooltip,
} from 'antd';
//router
import { useParams } from 'react-router'

// react router
import { Link, useNavigate } from 'react-router-dom';

//redux
import { setUser } from 'store/reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { openDescriptionModal } from 'store/reducers/descriptionModal';

// components
import Descriptor from 'components/Descriptor/Descriptor';
import DescriptionManager from 'components/contentManager/DescriptionManger/DescriptionManager';

// antd
import { PlusOutlined } from '@ant-design/icons';

// api
import { useGetUserQuery } from 'api/userApi';
import { useGetPestInfoDescriptionQuery, useCreatePestInfoDescriptionMutation } from 'api/pestApi';
import MainCard from 'components/MainCard';

toast.configure()

function PestDescription() {
    const dispatch = useDispatch();
    const anchorRef = useRef(null);
    const [createPestInfoDescription] = useCreatePestInfoDescriptionMutation();

    const drawerOpen = useSelector(state => state.menu.drawerOpen);
    const { pestId, pestName } = useParams(); //saves the pest ID from previous page
    const pestInfoDescriptionData = useGetPestInfoDescriptionQuery(pestId);
    const currentlyLoggedInUser = JSON.parse(localStorage.getItem('user'));
    const userId = currentlyLoggedInUser.uId;
    const map = LeafletLocation(pestId, userId);
    console.log(pestInfoDescriptionData)
    const userLocation = useGeoLocation();
    const [loading, setLoading] = useState(true); // for populating all the states until its false
    const [loading1, setLoading1] = useState(true);
    const [saving, setSaving] = useState(false); //for changing the button to "saving" and disabled after clicking save
    const [show, setShow] = useState(true);
    const [pestInfoDescription, setPestInfoDescription] = useState([])



    // const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null);
    const [edit, setEdit] = useState(false);
    const [informative, setinformative] = useState(false);
    const navigate = useNavigate(); // to keep track of the history. Might use later to navigate to different pages


    console.log(pestInfoDescriptionData.data)
    useEffect(() => {
        if (pestInfoDescriptionData.isSuccess) {
            setPestInfoDescription(pestInfoDescriptionData.data)

        }

    }, [pestInfoDescriptionData])

    const handleAddButtonClick = () => {

        console.log(pestId)

        dispatch(openDescriptionModal({
            isOpen: true,
            pestId: pestId
        }));

        console.log('clicked')
    }



    console.log(pestInfoDescriptionData)

    console.log(pestInfoDescription)



    const saveGeo = (e) => {
        e.preventDefault();
        setinformative(true);
        if (userLocation.loaded) {
            fetch(Config.CREATE_COORDINATE, {
                method: 'POST',
                headers: { "Content-Type": 'application/json;charset=UTF-8' },
                body: JSON.stringify({
                    PId: pestId,
                    UId: userId,
                    CoordLat: userLocation.coordinates.lat,
                    CoordLng: userLocation.coordinates.lng
                })
            }).then(() => {
                toast.success('Data has been recorded', {
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: false,
                    autoClose: 2000,

                });

                //window.location.reload();
            })
        }

        //console.log(position.lat + " " + position.lng);
    }
    // useEffect(() => {
    //     getRole();
    //     if (loading1) {
    //         getRole();
    //     }
    //     load();
    //     if (loading) {
    //         load();
    //     }

    // }, [loading, loading1])


    /* THE BELOW GETROLE() METHOD WILL REQUEST THE USERS DATA BY THE ACCESS TOKEN
    IF HE/SHE IS AN ADMIN THE EDIT BUTTON WILL BE SHOWN  */
    const getRole = async () => {

        try {
            const res = await fetch(Config.GET_USER, {
                headers: { "Content-Type": 'application/json;charset=UTF-8' },
                credentials: 'include',
            });
            const content = await res.json();
            //console.log(content);
            setRole(content[0].uAuthLevel);
            // setUserId(content[0].uId);
            if (role === 'Admin') {
                // console.log("dhumse");
                setEdit(true);
                setShow(true);
            }
            setLoading1(false);
        } catch (err) {
            console.log(err);
        }
    }

    const toggle = () => {
        console.log(role)
        if (role === 'Admin') {
            setShow(false);
        }
    }
    console.log(edit);

    return (
        <>
            <div className="container">
                <Grid
                    container
                    spacing={2}
                >

                    <Grid item xs={12} lg={drawerOpen ? 10 : 12}>
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
                                            <Tooltip placement="bottom" title={'Add Description'}>
                                                <Button onClick={handleAddButtonClick} type="primary"
                                                    icon={<PlusOutlined />} />
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                            <DescriptionManager />
                        </MainCard>

                    </Grid>



                    <Grid item xs={12} lg={drawerOpen ? 10 : 12}>
                        <Grid container spacing={5}>
                            {pestInfoDescription.map((description) =>
                            (
                                <Grid item xs={12} lg={drawerOpen ? 10 : 12}>
                                    <Descriptor key={description.id} description={description} />
                                </Grid>

                            )
                            )
                            }     </Grid>
                    </Grid>

                    <Grid item xs={12} lg={drawerOpen ? 10 : 12}>
                        {!informative ? <Box sx={{ display: 'flex', justifyContent: 'center' }} className="helpful">
                            <p>Was this information helpful? </p>
                            <button onClick={saveGeo}>Yes</button>
                            <button>No</button>
                        </Box>
                            : <Box className="helpful">
                                <p>Was this information helpful? </p>
                                <button disabled>Yes</button>
                                <button disabled>No</button>
                            </Box>}
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={drawerOpen ? 10 : 12}>
                        <Box className="location child1"> {/* The Map DIv will be shown in the end of the description */}
                            <Box className="helpImprove">
                                <h4>Help us improve</h4>
                                <p>Drag the marker on the map to the location where you saw this pest</p>
                            </Box>


                            <Box>
                                {map}
                            </Box>

                        </Box>
                    </Grid>

                </Grid>
            </div>
        </>
    )
}

export default PestDescription

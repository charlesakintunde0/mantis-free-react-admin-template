
import React, { useState, useEffect, useRef } from 'react'
import "./PestDescription.css";
import LeafletLocation from '../hooks/LeafletLocation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGeoLocation from '../hooks/useGeoLocation';
import Footer from '../Footer/Footer';
import Config from "./../../config.json"

//mui
import { IconButton } from '@mui/material';

//router
import { useParams } from 'react-router'

// react router
import { Link, useNavigate } from 'react-router-dom';

//redux
import { setUser } from 'store/reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from 'store/reducers/descriptionModal';

// components
import Descriptor from 'components/Descriptor/Descriptor';
import DescriptionManager from 'components/contentManager/DescriptionManager';

// antd
import { PlusCircleOutlined } from '@ant-design/icons';

// api
import { useGetUserQuery } from 'api/userApi';
import { useGetPestInfoDescriptionQuery } from 'api/pestApi';
import { Grid } from '../../../node_modules/@mui/material/index';
import MainCard from 'components/MainCard';

toast.configure()

function PestDescription() {
    const dispatch = useDispatch();
    const anchorRef = useRef(null);
    const drawerOpen = useSelector(state => state.menu.drawerOpen);
    const PId = useParams().pestID; //saves the pest ID from previous page
    const pestInfoDescriptionData = useGetPestInfoDescriptionQuery(PId);
    const currentlyLoggedInUser = JSON.parse(localStorage.getItem('user'));
    // const map = LeafletLocation(PId, currentlyLoggedInUser.uId);
    const userLocation = useGeoLocation();
    const [loading, setLoading] = useState(true); // for populating all the states until its false
    const [loading1, setLoading1] = useState(true);
    const [saving, setSaving] = useState(false); //for changing the button to "saving" and disabled after clicking save
    const [show, setShow] = useState(true);
    const [pestName, setPestName] = useState(null);
    const [PinBiologicalinfo, setBiologicalinfo] = useState(null);
    const [PinMonitoringMethod, setMonitoringMethod] = useState(null);
    const [PinControlThreshold, setControlThreshold] = useState(null);
    const [PinPhysicalControl, setPhysicalControl] = useState(null);
    const [PinBiologicalControl, setBiologicalControl] = useState(null);
    const [PinCulturalControl, setCulturalControl] = useState(null);
    const [PinChemicalControl, setChemicalControl] = useState(null);
    const [pestInfoDescription, setPestInfoDescription] = useState([]);




    const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null);
    const [edit, setEdit] = useState(false);
    const [informative, setinformative] = useState(false);
    const navigate = useNavigate(); // to keep track of the history. Might use later to navigate to different pages
    //const location = useGeoLocatioin();

    // console.log(pestInfoDescription)
    useEffect(() => {
        if (pestInfoDescriptionData.isSuccess) {
            setPestInfoDescription(pestInfoDescriptionData.data)

        }

    }, [pestInfoDescriptionData])

    const handleAddButtonClick = () => {
        dispatch(openModal());
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
                    PId: PId,
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
            setUserId(content[0].uId);
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
    /* SAVEDATA() FUNCTION SAVES THE DATA AFTER EDITING
    ONLY ACCESSIBLE BY ADMIN */
    const saveData = (e) => {
        e.preventDefault();
        const objToUpdate = { PId, PinBiologicalinfo, PinMonitoringMethod, PinControlThreshold, PinPhysicalControl, PinChemicalControl, PinBiologicalControl, PinCulturalControl };
        setSaving(true);
        fetch(Config.UPDATE_PEST_DESCRIPTION, {
            method: 'PUT',
            headers: { "Content-Type": 'application/json;charset=UTF-8' },
            body: JSON.stringify(objToUpdate)
        }).then(() => {
            setSaving(false);
            setShow(true);
            toast.success('Successfully updated', {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,

            });

            //window.location.reload();
        })

    }
    const toggle = () => {
        console.log(role)
        if (role === 'Admin') {
            setShow(false);
        }
    }
    console.log(edit);


    // const iconBackColorOpen = 'grey.300';
    // const iconBackColor = 'grey.100';

    // return (
    //     <Box sx={{ flexShrink: 0, ml: 0.75 }}>
    //         <IconButton
    //             disableRipple
    //             color="secondary"
    //             sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
    //             aria-label="open profile"
    //             ref={anchorRef}
    //             aria-controls={open ? 'profile-grow' : undefined}
    //             aria-haspopup="true"
    //             onClick={handleToggle}
    //         >
    //             <Badge badgeContent={4} color="primary">
    //                 <BellOutlined />
    //             </Badge>
    //         </IconButton>

    //console.log(userId);
    //saving false
    //show true


    return (
        <>
            <Grid
                container
                spacing={2}
            // alignItems="center"
            // justifyContent="center"
            >

                <Grid item xs={12} sm={12} md={12} lg={drawerOpen ? 10 : 12}>
                    <MainCard>
                        <Grid
                            container
                            spacing={2}>
                            <Grid
                                item
                                style={{ display: "flex", justifyContent: "flex-start" }}
                                alignItems="center"
                                jusity="left">
                                <IconButton
                                    color="secondary"
                                    sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
                                    ref={anchorRef}
                                    onClick={handleAddButtonClick}
                                >
                                    <PlusCircleOutlined />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <DescriptionManager />
                    </MainCard>

                </Grid>



                {pestInfoDescription.map((description) =>
                (
                    <Grid item xs={12} sm={12} md={12} lg={drawerOpen ? 10 : 12}>
                        <Descriptor key={description.id} description={description} />
                    </Grid>

                )
                )
                }



                {!informative ? <div className="helpful">
                    <p>Was this information helpful? </p>
                    <button onClick={saveGeo}>Yes</button>
                    <button>No</button>
                </div>
                    : <div className="helpful">
                        <p>Was this information helpful? </p>
                        <button disabled>Yes</button>
                        <button disabled>No</button>
                    </div>}
                <div className="location child1"> {/* The Map DIv will be shown in the end of the description */}
                    <div className="helpImprove">
                        <h4>Help us improve</h4>
                        <p>Drag the marker on the map to the location where you saw this pest</p>
                    </div>


                </div>

            </Grid>

        </>
    )
}

export default PestDescription

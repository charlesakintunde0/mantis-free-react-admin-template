
import React, { useState, useEffect, useRef } from 'react'
import LeafletLocation from '../../hooks/LeafletLocation';

import useGeoLocation from '../../hooks/useGeoLocation';

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
// import { openDescriptionModal } from 'store/reducers/descriptionModal';

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
import { closeDescriptionModal, openDescriptionModal, storedDescriptionCardData } from 'store/reducers/diseaseModal';

// api
import { useGetUserQuery } from 'api/userApi';
import { useGetPestInfoDescriptionQuery, useCreatePestInfoDescriptionMutation } from 'api/pestApi';
import { useGetDiseaseInfoDescriptionQuery, useUpdateDiseaseInfoDescriptionMutation, useCreateDiseaseInfoDescriptionMutation, useDeleteUploadedImageInDiseaseInfoDescriptionMutation } from '../../../api/diseasesApi';
import { useCreateCoordinatesMutation } from 'api/coordinates';
import { useDeleteDiseaseInfoDescriptionMutation } from '../../../api/diseasesApi';


const DiseaseDescription = () => {
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const [createPestInfoDescription] = useCreateDiseaseInfoDescriptionMutation();
  const { desricptionModalIsOpen, descriptionComponentData } = useSelector(state => state.diseaseModal);
  const [createUserCoordinates] = useCreateCoordinatesMutation();
  const drawerOpen = useSelector(state => state.menu.drawerOpen);
  const { diseaseId, diseaseName } = useParams(); //saves the pest ID from previous page
  const pestInfoDescriptionData = useGetDiseaseInfoDescriptionQuery(diseaseId);
  const currentlyLoggedInUser = JSON.parse(localStorage.getItem('user'));
  const userId = currentlyLoggedInUser.uId;
  const map = LeafletLocation(diseaseId, userId);
  const userLocation = useGeoLocation();
  const [pestInfoDescription, setPestInfoDescription] = useState([])

  const [role, setRole] = useState(null);
  const [edit, setEdit] = useState(false);
  const [informative, setinformative] = useState(false);
  const navigate = useNavigate(); // to keep track of the history. Might use later to navigate to different pages

  useEffect(() => {
    if (pestInfoDescriptionData.isSuccess) {
      setPestInfoDescription(pestInfoDescriptionData.data)

    }

  }, [pestInfoDescriptionData])

  const handleAddButtonClick = () => {

    dispatch(openDescriptionModal({
      desricptionModalIsOpen: true,
      diseaseId: diseaseId
    }));
  }

  const saveUserCoordinataes = (e) => {
    e.preventDefault();
    setinformative(true);
    if (userLocation.loaded) {
      createUserCoordinates(
        JSON.stringify({
          PId: diseaseId,
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
                        <Typography variant='h5'>{diseaseName ? diseaseName.toUpperCase() : "PEST NAME"}</Typography>
                      </Box>
                      <Box alignSelf="flex-end">

                        <Button onClick={handleAddButtonClick} type="primary"
                          icon={<PlusOutlined />} >
                          {'Add Description'}
                        </Button>

                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <DescriptionManager Id={diseaseId} componentData={descriptionComponentData} isOpen={desricptionModalIsOpen} useDeleteUploadedImageMutation={useDeleteUploadedImageInDiseaseInfoDescriptionMutation} closeDescriptionModal={closeDescriptionModal} useUpdateInfoDescriptionMutation={useUpdateDiseaseInfoDescriptionMutation} useCreateInfoDescriptionMutation={useCreateDiseaseInfoDescriptionMutation} />
              </MainCard>

            </Grid>
            {pestInfoDescriptionData.isLoading && pestInfoDescriptionData.status === 'fulfilled' ? <Loading /> : !pestInfoDescriptionData.isLoading && !pestInfoDescriptionData.status !== 'fulfilled' && pestInfoDescriptionData.data.length === 0 ? <Grid item xs={12} lg={drawerOpen ? 10 : 12}><EmptySet componentName={'description'} parentName={diseaseName.toUpperCase()} /> </Grid> : <> {pestInfoDescription.map((description) =>
            (
              <Grid key={description.id} item xs={12} lg={drawerOpen ? 10 : 12}>
                <Descriptor key={description.id} storedDescriptionCardData={storedDescriptionCardData} description={description} useDeleteDiseaseInfoDescriptionMutation={useDeleteDiseaseInfoDescriptionMutation} />
                <>{description.id}</>
              </Grid>

            )
            )
            }

            </>}


            {
              pestInfoDescriptionData.data.length === 0 ?
                ''
                :
                <Grid item xs={12} lg={drawerOpen ? 10 : 12}>
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
    </>
  )
}

export default DiseaseDescription
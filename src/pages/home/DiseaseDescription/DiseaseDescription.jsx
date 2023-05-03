
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

import { useDispatch, useSelector } from 'react-redux';
// import { openDescriptionModal } from 'store/reducers/descriptionModal';

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
import { closeDescriptionModal, openDescriptionModal, storedDescriptionCardData } from 'store/reducers/diseaseModal';

// api
import { useGetDiseaseInfoDescriptionQuery, useUpdateDiseaseInfoDescriptionMutation, useCreateDiseaseInfoDescriptionMutation, useDeleteUploadedImageInDiseaseInfoDescriptionMutation } from '../../../api/diseasesApi';
import { useCreateCoordinatesMutation } from 'api/coordinates';
import { useDeleteDiseaseInfoDescriptionMutation } from '../../../api/diseasesApi';

// import LeafletLocation from 'components/hooks/LeafletLocation';


// import useGeoLocation from 'components/hooks/LeafletLocation';


const DiseaseDescription = () => {
  const dispatch = useDispatch();
  const { desricptionModalIsOpen, descriptionComponentData } = useSelector(state => state.diseaseModal);
  const [createUserCoordinates] = useCreateCoordinatesMutation();
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);
  const drawerOpen = useSelector(state => state.menu.drawerOpen);
  const { diseaseId, diseaseName } = useParams(); //saves the pest ID from previous page
  const pestInfoDescriptionData = useGetDiseaseInfoDescriptionQuery(diseaseId);
  const pestId = diseaseId;
  const currentlyLoggedInUser = JSON.parse(localStorage.getItem('user'));
  const userId = currentlyLoggedInUser.uId;
  // const map = LeafletLocation(pestId, userId);
  // const userLocation = useGeoLocation();
  const [pestInfoDescription, setPestInfoDescription] = useState([])
  const [informative, setinformative] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [role, setRole] = useState();

  const [isEditable, setIsEditable] = useState(false)

  useEffect(() => {
    setRole(user ? user.uRole : null)

    setIsEditable(role == userRole.ADMIN ? true : false);
  }, [user])

  useEffect(() => {
    setIsLoadingDescription(pestInfoDescriptionData.isLoading)
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

  useEffect(() => {
    setRole(user ? user.uRole : null)
  }, [user])

  const saveUserCoordinataes = (e) => {
    // e.preventDefault();
    // setinformative(true);
    // if (userLocation.loaded) {
    //   createUserCoordinates(
    //     JSON.stringify({
    //       PId: diseaseId,
    //       UId: userId,
    //       CoordLat: userLocation.coordinates.lat,
    //       CoordLng: userLocation.coordinates.lng
    //     })
    //   )
    //     .then(() => {

    //       Notification('success', 'Operation successful', "Data saved successfully");
    //     })
    // }
  }
  return (
    <>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          lg={drawerOpen ? 10 : 11}>
          <MainCard>
            <Grid
              container
              spacing={3}>
              <Grid
                item xs={12}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box flexGrow={2}>
                    <Typography
                      variant='h5'>
                      {diseaseName ? diseaseName.toUpperCase() : "PEST NAME"}</Typography>
                  </Box>
                  <Box alignSelf="flex-end">
                    {role == userRole.ADMIN
                      ?
                      <Button
                        onClick={handleAddButtonClick}
                        type="primary"
                        icon={<PlusOutlined />} >
                        {'Add Description'}
                      </Button> : ''}

                  </Box>
                </Box>
              </Grid>
            </Grid>
            <DescriptionManager Id={diseaseId}
              componentData={descriptionComponentData}
              isOpen={desricptionModalIsOpen}
              useDeleteUploadedImageMutation=
              {useDeleteUploadedImageInDiseaseInfoDescriptionMutation}
              closeDescriptionModal={closeDescriptionModal}
              useUpdateInfoDescriptionMutation=
              {useUpdateDiseaseInfoDescriptionMutation}
              useCreateInfoDescriptionMutation=
              {useCreateDiseaseInfoDescriptionMutation} />
          </MainCard>

        </Grid>
        {isLoadingDescription ?
          <Loading /> :
          pestInfoDescription.length === 0 ?
            <Grid
              item
              xs={12}
              lg={drawerOpen ? 10 : 11}>
              <EmptySet
                componentName={'description'} />
            </Grid> : <>
              {pestInfoDescription.map((description) =>
              (
                <Grid key={description.id} item xs={12} lg={drawerOpen ? 5 : 5.5}>
                  <Descriptor
                    isEditable={isEditable}
                    key={description.id}
                    storedDescriptionCardData={storedDescriptionCardData}
                    description={description}
                    useDeleteInfoDescriptionMutation=
                    {useDeleteDiseaseInfoDescriptionMutation} />
                </Grid>

              )
              )
              }

            </>}


        {
          pestInfoDescription.length === 0 ?
            ''
            :
            <Grid
              item
              xs={12}
              lg={drawerOpen ? 10 : 11}>
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
          <Grid
            item
            xs={12}
            lg={drawerOpen ? 10 : 11}>
            <Box className="location child1"> {/* The Map DIv will be shown in the end of the description */}
              <Box className="helpImprove">
                <h4>Help us improve</h4>
                <p>Drag the marker on the map to the location where you saw this pest</p>
              </Box>


              <Box>
                {/* {map} */}
              </Box>

            </Box>
          </Grid> : ''}

      </Grid>
    </>
  )
}

export default DiseaseDescription
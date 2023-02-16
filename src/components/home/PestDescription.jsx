import React from 'react'
import {useParams} from 'react-router'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./PestDescription.css";
import LeafletLocation from '../hooks/LeafletLocation';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGeoLocation from '../hooks/useGeoLocation';
import Footer from '../Footer/Footer';
import Config from "./../../config.json"

toast.configure()

function PestDescription() {

    const PId = useParams().pestID; //saves the pest ID from previous page
    const map = LeafletLocation(PId,userId);
    const userLocation = useGeoLocation();

    const[loading,setLoading] = useState(true); // for populating all the states until its false
    const[loading1,setLoading1] = useState(true);
    const[saving,setSaving] = useState(false); //for changing the button to "saving" and disabled after clicking save
    const [show, setShow] = useState(true);
    const [pestName, setPestName] = useState(null);
    const [PinBiologicalinfo, setBio] = useState(null);
    const [PinMonitoringMethod, setMonitor] = useState(null);
    const [PinControlThreshold, setControl] = useState(null);
    const [PinPhysicalControl, setPhyCon] = useState(null);
    const [PinBiologicalControl, setBioCon] = useState(null);
    const [PinCulturalControl, setCulCon] = useState(null);
    const [PinChemicalControl, setChemCon] = useState(null);

    const[userId,setUserId] = useState(null);
    const [role, setRole] = useState(null);
    const[edit, setEdit] = useState(false);
    const[informative, setinformative] = useState(false);
    const navigate = useNavigate(); // to keep track of the history. Might use later to navigate to different pages
    //const location = useGeoLocatioin();
    
    const saveGeo = (e) => {
        e.preventDefault();
        setinformative(true);
        if(userLocation.loaded){
            fetch(Config.CREATE_COORDINATE, {
                method: 'POST',
                headers: {"Content-Type": 'application/json;charset=UTF-8'},
                body : JSON.stringify({
                    PId : PId,
                    UId : userId,
                    CoordLat: userLocation.coordinates.lat,
                    CoordLng: userLocation.coordinates.lng
                })
            }).then(()=> {
                toast.success('Data has been recorded',{
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: false,
                    autoClose: 2000,
    
                });
                
                //window.location.reload();
            })
        }

        //console.log(position.lat + " " + position.lng);
    }
    useEffect(()=>{
        getRole();
        if (loading1) {
            getRole();
        }
        load();
        if (loading) {
            load();
        }
        
    },[loading,loading1])

    const load = async () =>{
        
        try{
           const res =  await axios.get(Config.FETCH_SPECIFIC_PEST_DESCRIPTION + PId)
           .then((response) => {
               return response.data;
           });
           console.log(res[0]);
            setPestName(res[0].pestName);
            setBio(res[0].biologicalInfo);
            setMonitor(res[0].monitoringMethod);
            setControl(res[0].controlThreshold);
            setPhyCon(res[0].physicalControl);
            setBioCon(res[0].biologicalControl);
            setChemCon(res[0].chemicalControl);
            setCulCon(res[0].culturalControl);

            setLoading(false);
        }catch(err){
            console.log(err);
        }

    }
    /* THE BELOW GETROLE() METHOD WILL REQUEST THE USERS DATA BY THE ACCESS TOKEN
    IF HE/SHE IS AN ADMIN THE EDIT BUTTON WILL BE SHOWN  */
    const getRole = async () =>{
       
        try{
            const res = await fetch(Config.GET_USER, {
                headers: {"Content-Type": 'application/json;charset=UTF-8'},
                credentials: 'include',
            });
            const content = await res.json();
            //console.log(content);
            setRole(content[0].uAuthLevel);
            setUserId(content[0].uId);
            if(role === 'Admin') {
                // console.log("dhumse");
                setEdit(true);
                setShow(true);
            }
          setLoading1(false);
        }catch(err){
            console.log(err);
        }
    }
    /* SAVEDATA() FUNCTION SAVES THE DATA AFTER EDITING
    ONLY ACCESSIBLE BY ADMIN */
    const saveData = (e) => {
        e.preventDefault();
        const objToUpdate= {PId,PinBiologicalinfo,PinMonitoringMethod,PinControlThreshold,PinPhysicalControl,PinChemicalControl,PinBiologicalControl,PinCulturalControl};
        setSaving(true);
        fetch(Config.UPDATE_PEST_DESCRIPTION, {
            method: 'PUT',
            headers: {"Content-Type": 'application/json;charset=UTF-8'},
            body : JSON.stringify(objToUpdate)
        }).then(()=> {
            setSaving(false);
            setShow(true);
            toast.success('Successfully updated',{
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,

            });
            
            //window.location.reload();
        })
        
    }
    const toggle = () => {
        console.log(role)
        if(role === 'Admin'){
            setShow(false);
        }
    }
    console.log(edit);
    //console.log(userId);
    //saving false
    //show true
    return (
        <div className="con">
            
           {edit? <div className="editSaveCon">
                {show? <button className= "editSave edit" onClick={toggle}> edit </button>
               : 
                (saving? <button disabled className= "editSave save"> saving </button>
                : <button className= "editSave save" onClick={saveData}> save </button>)
              
                }
            </div> : null}
           {show? <div className="desc_container">
                <h1>{pestName}</h1>
                { PinBiologicalinfo? <div className="description child1">
                    <h3>Description</h3>
                    <p>{PinBiologicalinfo}</p>
                </div> : null}

                {PinMonitoringMethod? <div className="PinMonitoringMethod child1">
                    <h3>Monitoring Method</h3>
                    <p>{PinMonitoringMethod}</p>
                </div> : null}

               { PinControlThreshold? <div className="PinControlThreshold child1">
                    <h3>Control Threshold</h3>
                    <p>{PinControlThreshold}</p>
                </div> : null}

                { PinPhysicalControl? <div className="PinPhysicalControl child1" >
                    <h4 className="physicalHeader header1">Physical control measures: </h4>
                    <p className= "desc2">{PinPhysicalControl}</p>
                </div> : null}
                { PinBiologicalControl? <div className="PinBiologicalControl child1">
                    <h4 className="biologicalHeader header1">Biological control measures: </h4>
                    <p>{PinBiologicalControl}</p>
                </div> : null}

               { PinCulturalControl? <div className="PinCulturalControl child1">
                    <h4 className="culturalHeader header1">Cultural control measures: </h4>
                    <p>{PinCulturalControl}</p>
                </div> : null}

                { PinChemicalControl? <div className="PinChemicalControl child1">
                    <h4 className="chemicalHeader header1">Chemical control measures: </h4>
                    <p>{PinChemicalControl}</p>
                </div> : null}

                {(!PinBiologicalinfo && !PinChemicalControl && !PinCulturalControl && !PinBiologicalControl && !PinPhysicalControl && !PinControlThreshold && !PinMonitoringMethod)?
                <div id="noData">
                    <div className="error">
                        <h2>Not enough data</h2>
                        <p>Sorry, we do not have enough data about {pestName}. We will update once we have enough information</p>
                    </div>
                </div>: null}
               {!informative? <div className="helpful">
                    <p>Was this information helpful? </p>
                     <button onClick={saveGeo}>Yes</button>
                    <button>No</button>
                </div> 
                : <div className="helpful">
                    <p>Was this information helpful? </p>
                    <button disabled>Yes</button>
                    <button disabled>No</button>
                </div> }
                <div className="location child1"> {/* The Map DIv will be shown in the end of the description */}
                    <div className="helpImprove">
                        <h4>Help us improve</h4>
                        <p>Drag the marker on the map to the location where you saw this pest</p>
                    </div>
                    <div className="map"> {map} </div>
                   
                </div>
            </div>

            : /* if Edit button is pressed then the below div will show up */
            <div className="desc_container admin">
                <h1>{pestName}</h1>
               <div className="description child1 admin">
                    <h3>Description</h3>
                    <textarea name="Description" onChange={(event)=>{setBio(event.target.value)}} value={PinBiologicalinfo}></textarea>
                </div>

                <div className="PinMonitoringMethod child1 admin">
                    <h3>Monitoring Method</h3>
                    <textarea name="PinMonitoringMethod" onChange={(event)=>{setMonitor(event.target.value)}} value={PinMonitoringMethod}></textarea>
                </div>

                <div className="PinControlThreshold child1 admin">
                    <h3>Control Threshold</h3>
                    <textarea name="PinControlThreshold" onChange={(event)=>{setControl(event.target.value)}} value={PinControlThreshold}></textarea>
                    
                </div>

                <div className="PinPhysicalControl child1 admin" >
                    <p className="physicalHeader header1">Physical control measures: </p>
                    <textarea name="PinPhysicalControl" onChange={(event)=>{setPhyCon(event.target.value)}} value={PinPhysicalControl}></textarea>
                </div>

                <div className="PinBiologicalControl child1 admin">
                    <p className="biologicalHeader header1">Biological control measures: </p>
                    <textarea name="PinBiologicalControl" onChange={(event)=>{setBioCon(event.target.value)}} value={PinBiologicalControl}></textarea>
                </div>

                <div className="PinCulturalControl child1 admin">
                    <p className="culturalHeader header1">Cultural control measures: </p>
                    <textarea name="PinCulturalControl" onChange={(event)=>{setCulCon(event.target.value)}} value={PinCulturalControl}></textarea>
                </div>

                <div className="PinChemicalControl child1 admin">
                    <p className="chemicalHeader header1">Chemical control measures: </p>
                    <textarea name="PinChemicalControl" onChange={(event)=>{setChemCon(event.target.value)}} value={PinChemicalControl}></textarea>
                </div> 
                
            </div>}

            {/* <div className="userLocation">
               {
                   userLocation.loaded ? JSON.stringify(userLocation) : "Not Available"
               }
           </div> */}
        </div>
    )
}

export default PestDescription

import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios'
//import "./Admin_Crops.css";
import "./Admin_pests.css";
import DeleteIcon from './delete.svg';
import AddIcon from './add.svg';
import Minus from './minus.svg';
import {toast} from 'react-toastify';
import Crops from '../Crops';
import { useLocation, useParams } from 'react-router-dom';
import Config from "./../../../config.json"
toast.configure()

const initialImageValues = {
    imageName: '',
    imageSrc : '',
    imageFile : null
}
function Admin_Pests(props) {
    const [userAuth, SetUserAuth] = useState(props.user[0].uAuthLevel);
    //const location = useLocation(); // for getting the parameter through <Link>
    //const {cropId} = location.state;
    const cropId = useParams().cropID;
    const[cropName, setCropName] = useState("");
    const [allPest, setAllPest] = useState([]);
    const [pest, setPest] = useState([]);
    const[loading,setLoading] = useState(true);
    const[loading1,setLoading1] = useState(true);
    const [pestID, setPestID] = useState("");
    const [pestName, setPestName] = useState("");
    const [pestDesc, setPestDesc] = useState("");
    const[imgValues,setImgValues] = useState(initialImageValues);

    useEffect(()=>{
        
        fetchPests();
        if(loading){
            fetchPests();
        }

        fetchAllPests();
        if(loading1) {
            fetchAllPests();
        }
        
    }, [loading,loading1,pest])

    const fetchAllPests = async () =>{
        try{
            const res =  await axios.get(Config.FETCH_PESTS)
            .then(res=> {
                setAllPest(res.data);
                //console.log(allPest);
                setLoading1(false);
            })
             
         }catch(err){
             console.log(err);
         }
    }

    const fetchPests = async () =>{
        try{
            const res =  await axios.get(Config.FETCH_SPECIFIC_PEST + cropId)
            .then(res=> {
                setPest(res.data[0].pestDetails);
                setCropName(res.data[0].cropName);
                console.log(res);
                setLoading(false);
            })
             
         }catch(err){
             console.log(err);
         }
    }

    const editPests = (pestObj, e)=>{
        console.log(allPest);
        e.preventDefault();
        const formData = new FormData();
        formData.append('CId', cropId);
        formData.append('PId', pestObj.pId);
        console.log(pest);
        
        exampleAPI(Config.FETCH_CROPS_PESTS).create(formData)
        .then(res=> {
            console.log(res.data);
            
            if(res.status === 200 && res.data.message != "Check"){
                setPestID("");
                toast.success(res.data.message,{ //THE SUCCESS NOTIFICATION
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: false,
                    autoClose: 2000,

                });
            }
            else if(res.status === 200 && res.data.message === "Check") //Bad  request status code. That means Conflict : already exist some data 
            {
                toast.warning("Double check pest id",{ //THE SUCCESS NOTIFICATION
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: false,
                    autoClose: 2000,
    
                });
            }
            
        })
        .catch(err=> console.log(err))
        
    }
    
    const removePest = (e,pestId)=> {
        /* Needs to be edited */
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('PId', pestId);
        formData.append('CId', cropId);
        // console.log(pestId);
        // console.log(cropId);
        //exampleAPI("https://localhost:44361/api/CropsPests/DeletePest").delete(formData)
        if(window.confirm(`Are you sure you want to delete this pest from ${cropName}?`)) {
        axios.delete(Config.DELETE_PEST_FROM_CROP, {
            data: {
                PId : pestId,
                CId : cropId
            }
        })
        .then(res=>{
            toast.success('record has been deleted',{ //THE SUCCESS NOTIFICATION
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,

            });
        })
    }
        
    }

    const exampleAPI = (url) => {
        return {
            create : newRecord => axios.post(url,newRecord),
            delete: record => axios.delete(url,record)
        }
    }
    const showPreview = e =>{
        /* Needs to be edited */
        if(e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0];
            //console.log(imageFile);
            const reader = new FileReader();
            reader.onload = x =>{
                setImgValues({
                    ...imgValues,
                    imageFile,
                    imageSrc: x.target.result
                })
               // console.log(x.target.result);
            }
            reader.readAsDataURL(imageFile);
        }

        else{
            setImgValues({
                ...imgValues,
                imageFile:null,
                imageSrc: ""
            })
        }
    }

    const editPestsDB = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('PName', pestName);
        formData.append('PDescription', pestDesc);
        formData.append('PImageName', imgValues.imageName);
        formData.append('PImageFile', imgValues.imageFile);
        if(pestName && pestDesc && imgValues.imageFile){
            exampleAPI(Config.CREATE_PEST).create(formData)
            .then(res=> {
                console.log(res.data);
                
                if(res.status === 200 && res.data.message != "Conflict"){
                    setPestName("");
                    setPestDesc("");
                    document.getElementById('imageUploader').value = null; //THE CHOSEN IMAGE FILE NAME GET CLEARED AFTER COMMENT HAS BEEN POSTED
                    toast.success(res.data.message,{ //THE SUCCESS NOTIFICATION
                        position: toast.POSITION.TOP_RIGHT,
                        hideProgressBar: false,
                        autoClose: 2000,

                    });
                }
                else if(res.status === 200 && res.data.message === "Conflict") //Bad  request status code. That means Conflict : already exist some data 
                {
                    toast.warning("A pest with this name already exists",{ //THE SUCCESS NOTIFICATION
                        position: toast.POSITION.TOP_RIGHT,
                        hideProgressBar: false,
                        autoClose: 3000,
        
                    });
                }
                
            })
            .catch(err=> console.log(err))
        }
    }
    const removePestDB = (e,pestId)=> {
        /* Needs to be edited */
        e.preventDefault();
        //console.log(props);
        if(window.confirm('Are you sure you want to delete this pest from the database')) {
        axios.delete(Config.DELETE_PEST + pestId)
        .then(res=>{
            toast.success('record has been deleted',{ //THE SUCCESS NOTIFICATION
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,

            });
        })
    }
        
    }
  return (
    <div className='adminMainDiv'>
       {userAuth==="Admin" && <div className="addingForm addingForm1">
            <form className="pestsForm pestsFormDB" autoComplete='off' onSubmit={editPestsDB}>
                <h3>Add pest to the database</h3>
                <div className="form-groups form-groupsDB">
                    <input name="pestName" type="text" placeholder="Pest name" required
                    onChange={e => setPestName(e.target.value)}
                    value={pestName}
                    />
                </div>
                <div className="form-groups form-groupsDB">
                    <input className="adminPestDesc" name="cropDesc" type="text" placeholder="Short description" required
                    onChange={e => setPestDesc(e.target.value)}
                    value={pestDesc}
                    />
                </div>
                <div className="imageUploadDiv form-groups form-groupsDB">
                        <input required type="file" accept='image/*' className='imageFile' onChange={showPreview} id="imageUploader"/>
                </div>
                                
                <button className='adminSave'>Save</button>
            </form>
        </div>}
        {userAuth==="Admin" && <div className="existingData">
            <div className="adminHeading">
                <h3>Pests for {cropName}</h3>
                <h5>({pest.length} items)</h5>
            </div>
            <div className="cropsList">
                {pest.map(p=>(
                    <div className="cropItself" key={p.id}>
                        <p>{p.pName}</p>
                        <img className="adminRemoveIcon" src={Minus} alt="remove" onClick={e=> removePest(e,p.pId)}/>
                    </div>
                ))
                }
            </div>
        </div>}
        {userAuth==="Admin" && <div className="existingData existingDataDB">
            <div className="adminHeading">
                <h3>All the pests</h3>
                <h5>({allPest.length} items)</h5>
            </div>
            <div className="cropsList pestsList">
                {allPest.map(p=>(
                    <div className="cropItself pestItself" key={p.id}>
                        <p>{p.pest}</p>
                        <div className="addRemoveIcons">
                            <div className="addButton">
                                {pest.findIndex(item => item.pId === p.pId) < 0 ? <img className="adminRemoveIcon" src={AddIcon} alt="add" onClick={e=> editPests(p,e)}/> : <div className='noAddIcon'></div>}
                            </div>
                            <div className="removeButton">
                                <img className="adminRemoveIcon" src={DeleteIcon} alt="remove" onClick={e=> removePestDB(e,p.pId)}/>
                            </div>
                            
                        </div>
                        
                    </div>
                ))
                }
            </div>
        </div>}
    </div>
  )
}

export default Admin_Pests
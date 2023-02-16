import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios'
import "./Admin_Crops.css";
import DeleteIcon from './delete.svg';
import {toast} from 'react-toastify';
import Crops from '../Crops';
import Config from "./../../../config.json"
toast.configure()

const initialImageValues = {
    imageName: '',
    imageSrc : '',
    imageFile : null
}

function Admin_Crops(props) {
    const [userAuth, SetUserAuth] = useState(props.user[0].uAuthLevel);
    const [crop, setCrop] = useState([]);
    const[loading,setLoading] = useState(true);
    const [cropName, setCropName] = useState("");
    const [cropDesc, setCropDesc] = useState("");
    const[imgValues,setImgValues] = useState(initialImageValues);
    useEffect(()=>{
        fetchCrops();
        if(loading){
            fetchCrops();
        }
        
    }, [loading,crop])
    const fetchCrops = async () =>{
        try{
            const res = await axios.get(Config.FETCH_CROPS)
            .then(res => {
                setCrop(res.data);
                setLoading(false);
            })
        }catch(err){
            console.log(err);
        }
    }
    const removeCrop = (e,cropId)=> {
        e.preventDefault();
        //console.log(props.user[0].uAuthLevel);

        // setCrop(crop.filter(cr => cr.id !== cropId));
        // console.log(cropId);
        // console.log(crop);
        //exampleAPI('https://localhost:44361/api/crops/DeleteCrop/').delete(cropId)
        if(window.confirm("Are you sure you want to delete this crop?")) {
        axios.delete(Config.DELETE_CROP + cropId)
        .then(res=>{
            toast.success('record has been deleted',{ //THE SUCCESS NOTIFICATION
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,

            });
        })
    }
        
    }
    const editCrops = (e)=>{

        e.preventDefault();
        const formData = new FormData();
        formData.append('CName', cropName);
        formData.append('CDescription', cropDesc);
        formData.append('CImageName', imgValues.imageName);
        formData.append('CImageFile', imgValues.imageFile);
        if(cropName && cropDesc && imgValues.imageFile){
            exampleAPI(Config.CREATE_CROP).create(formData)
            .then(res=> {
                console.log(res.data);
                
                if(res.status === 200 && res.data.message != "Conflict"){
                    setCropName("");
                    setCropDesc("");
                    document.getElementById('imageUploader').value = null; //THE CHOSEN IMAGE FILE NAME GET CLEARED AFTER COMMENT HAS BEEN POSTED
                    toast.success(res.data.message,{ //THE SUCCESS NOTIFICATION
                        position: toast.POSITION.TOP_RIGHT,
                        hideProgressBar: false,
                        autoClose: 2000,

                    });
                }
                else if(res.status === 200 && res.data.message === "Conflict") //409 status code. That means Conflict : already exist some data 
                {
                    toast.error("Duplicate crop name found",{ //THE SUCCESS NOTIFICATION
                        position: toast.POSITION.TOP_RIGHT,
                        hideProgressBar: false,
                        autoClose: 2000,
        
                    });
                }
                
            })
            .catch(err=> console.log(err))
        }

        else{
            toast.error('Atleast one field is missing',{ //THE SUCCESS NOTIFICATION
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: false,
                autoClose: 2000,

            });
        }

    }

    const exampleAPI = (url) => {
        return {
            create : newRecord => axios.post(url,newRecord),
            delete: id => axios.delete(url)
        }
    }
    const showPreview = e =>{
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
    
  return (
    <div className='adminMainDiv'>
        { userAuth==="Admin" && <div className="addingForm">
            <form className="cropsForm" autoComplete='off' onSubmit={editCrops}>
                <div className="form-groups">
                    <input name="cropName" type="text" placeholder="Crop name" required
                    onChange={e => setCropName(e.target.value)}
                    value={cropName}
                    />
                </div>
                <div className="form-groups">
                    <input className="adminCropDesc" name="cropDesc" type="text" placeholder="Short description" required
                    onChange={e => setCropDesc(e.target.value)}
                    value={cropDesc}
                    />
                </div>
                <div className="imageUploadDiv form-groups">
                        <input required type="file" accept='image/*' className='imageFile' onChange={showPreview} id="imageUploader"/>
                </div>
                                
                <button className='adminSave'>Save</button>
                {/* <p>{props.uAuthLevel}</p> */}
                
            </form>
        </div>}
        {userAuth==="Admin" && <div className="existingData">
            <div className="adminHeading">
                <h3>Crops</h3>
                <h5>({crop.length} items)</h5>
            </div>
            <div className="cropsList">
                {crop.map(cr=>(
                    <div className="cropItself" key={cr.id}>
                        <p>{cr.crop}</p>
                        <img className="adminRemoveIcon" src={DeleteIcon} alt="remove" onClick={e=> removeCrop(e,cr.id)}/>
                    </div>
                ))
                }
            </div>
        </div>}
    </div>
  )
}

export default Admin_Crops;

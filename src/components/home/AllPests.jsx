import React from 'react'
import {useParams} from 'react-router'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import Config from "./../../config.json";

function AllPests() {
    //test comment
    const cropID = useParams().cropID;
    const toAdmin = {
        pathname: "/AdminPests",
        param1: cropID,
    }
    const [pest, setPest] = useState([]);
    const[cropName, setCropName] = useState([]);

    const [add, setAdd] = useState(false);
    const [user, setUser] = useState(null);
    const[loading,setLoading] = useState(true); // for populating all the states until its false
    const[loading1,setLoading1] = useState(true);

    useEffect(()=>{
        fetchUser();
        if(loading){
            fetchUser();
        }
        fetchPests();
        if(loading1){
            fetchPests();
        }

    },[loading,loading1])

    const fetchPests = async () =>{
        try{
           const res =  await axios.get(Config.FETCH_SPECIFIC_CROP + cropID);
           setCropName(res.data[0].cropName);
           setPest(res.data[0].pestDetails);
           console.log(res.data[0].pestDetails);
            
        }catch(err){
            console.log(err);
        }

    }

    const fetchUser = async() => {
        try{
            const res = await fetch(Config.GET_USER, {
                headers: {"Content-Type": 'application/json;charset=UTF-8'},
                credentials: 'include',
            });

            const content = await res.json();
            setUser(content[0]);
            console.log(user);
            if(user && user.uAuthLevel=="Admin") {
                setAdd(true);
                
            }
            setLoading(false);
          }
          catch(e){
            console.log(e);
          }
    }




    return (
        <div className="outer">
        <div className='adminStyle'> 
            <h2> Select the Pest for {cropName}</h2>

            {add && 
            <div className='adminAccess'> 
            <Link to={{
                pathname : `/AdminPests/${cropID}`
            }}>
                <button className="editSave edit">Edit</button>
            </Link>
            </div>}
        </div>

        <div className="cards">
            
        {pest.map(p => (
                <Link to={`/Pest/Description/${p.pId}`}>
                    <div className="card">
                        <p className="description">{p.pName}</p>
                        <div className="cropImg">
                            <img src={p.pUrl} alt="Loading Images"></img>
                        </div>
                    </div>
                </Link>
        )
        )}
        </div>
    </div>
    )
}

export default AllPests

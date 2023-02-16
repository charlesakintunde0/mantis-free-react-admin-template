import React from 'react'
import {useParams} from 'react-router'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import "./allDiseases.css";
import Config from "./../../config.json"

function AllDiseases() {

    const cropID = useParams().cropID;

    const [disease, setDisease] = useState([]);
    const[cropName, setCropName] = useState([]);

    useEffect(()=>{
        const fetchDiseases = async () =>{
            try{
               const res =  await axios.get(Config.FETCH_DISEASES + cropID);
               setCropName(res.data[0].cropName);
               setDisease(res.data[0].diseases);
               console.log(res.data[0].diseases);
                
            }catch(err){
                console.log(err);
            }

            
            
        }

        
        fetchDiseases();

    },[])




    return (
        <div className="outer_con">
        <h2> Select the disease for {cropName}</h2>

        <div className="cards1">
            
            {disease.map(d => (
                    <Link to={`/diseases/Description/${d.dId}`}>
                        <div className="card1">
                            <p className="description">{d.dName}</p>
                        </div>
                    </Link>
            )
            )}
        </div>
    </div>
    )
}

export default AllDiseases

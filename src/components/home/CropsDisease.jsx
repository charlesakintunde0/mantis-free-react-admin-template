import {useState, useEffect} from 'react'

import { Link } from "react-router-dom";
import axios from 'axios'
import './insects.css'
import Config from "./../../config.json"

function CropsDisease() {

    const [crop, setCrop] = useState([]);

    useEffect(()=>{
        const fetchCrops = async () =>{
            try{
                const res = await axios.get(Config.FETCH_CROPS);
                console.log(res.data);
                setCrop(res.data);
            }catch(err){
                console.log(err);
            }
        }

        fetchCrops();
    }, [])

    return (
        <div className="outer">
            <h2> Select the Crop </h2>

            <div className="cards">
                
            {crop.map(cr => (
                <Link to={`/diseases/${cr.id}`} >
                            <div className="card">
                                <p className="description">{cr.crop}</p>
                                <div className="cropImg">
                                    <img src={cr.image} alt="Loading Images"></img>
                                </div>
                            </div>
                    </Link>
            )
            )}
            </div>
        </div>
    )

}

export default CropsDisease

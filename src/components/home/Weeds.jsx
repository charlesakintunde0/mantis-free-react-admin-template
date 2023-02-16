import {useState, useEffect} from 'react'

import { Link } from "react-router-dom";
import axios from 'axios'
import './insects.css'
import Config from "./../../config.json"

function Weeds() {

    const [weed, setWeed] = useState([]);

    useEffect(()=>{
        const fetchWeeds = async () =>{
            try{
                const res = await axios.get(Config.FETCH_WEEDS);
                console.log(res.data);
                setWeed(res.data);
            }catch(err){
                console.log(err);
            }
        }

        fetchWeeds();
    }, [])

    return (
        <div className="outer">
            <h2> Select the Weed </h2>

            <div className="cards">
                
            {weed.map(w => (
                <Link to={`/weeds/${w.id}`}>
                            <div className="card">
                                <p className="description">{w.crop}</p>
                                <div className="cropImg">
                                    <img src={w.image} alt="Loading Images"></img>
                                </div>
                            </div>
                    </Link>
            )
            )}
            </div>
        </div>
    )

}

export default Weeds

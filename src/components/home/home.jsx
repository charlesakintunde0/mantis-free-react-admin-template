import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import './home.css'
import axios from 'axios';
import Searchbar from '../SearchBar/Searchbar';
import Footer from '../Footer/Footer';
import Config from "./../../config.json";

function Home() {
    const [cropsData, setCropsData] = useState([]);
    const [pestsData, setPestsData] = useState([]);
    const [pressed, setPressed] = useState(false);
    const[loading,setLoading] = useState(true); 
    const[loading1,setLoading1] = useState(true);
    
    const handleSubmit = async(e) => {

        e.preventDefault();
       //console.log(data);
       //test comment
    }

    // useEffect(()=>{
    //     const fetchCrops = async () =>{
    //         try{
    //             const res = await axios.get(Config.FETCH_CROPS);
    //             console.log(res.data);
    //             setData(res.data);
    //         }catch(err){
    //             console.log(err);
    //         }
    //     }

    //     fetchCrops();
    // }, [])

    const fetchCrops = async () =>{
        try{
            const res = await axios.get(Config.FETCH_CROPS);
            console.log(res.data);
            setCropsData(res.data);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    const fetchPests = async () =>{
        try{
            const res = await axios.get(Config.FETCH_PESTS);
            console.log(res.data);
            setPestsData(res.data);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading1(false);
        }
    }

    useEffect(()=>{
       fetchCrops();
       if(loading) fetchCrops();

        fetchPests();
        if(loading1) fetchPests();
    }, [])

    return (
        <div>
            <Searchbar placeholder='e.g. Corn' cropsData={cropsData} pestsData={pestsData}/>
            <div className="container">
                <Link to="/Crops">
                    <div className="insects con-item">
                        <h4>Insects</h4>
                    </div>
                </Link>

                <Link to = "/diseases">
                    <div className="diseases con-item">
                        <h4>Diseases</h4>
                    </div>
                </Link>

                <Link to="weeds"> 
                    <div className="weeds con-item">
                        <h4>Weeds</h4>
                    </div>
                </Link>
            </div>

            {/* {searchResult? 
            <div className='outer'>
                <h3>Search Result</h3>
                
                <div className='cards'>
                    {searchResult.map(c=> (
                        <Link to={`/Crops/${c.id}`}>
                            <div className="card">
                                <p className="description">{c.crop}</p>
                                <div className="cropImg">
                                    <img src={c.image} alt="Loading Images"></img>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div> : null} */}
            {/* <Footer/> */}
        </div>
    )
}

export default Home

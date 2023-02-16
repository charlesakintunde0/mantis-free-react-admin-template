import React, {useState} from 'react';
import { Link } from "react-router-dom";
import SearchIcon from './search.svg';
import CloseIcon from './close.svg';
import "./Searchbar.css";

function Searchbar({placeholder, cropsData, pestsData }) {
    const iconStyle = {
        color: "rgb(101, 60, 168)", 
    }

    const [wordEntered, setWordEntered] = useState("");
    const [filteredCropsData, setFilteredCropsData] = useState([]);
    const [filteredPestsData, setFilteredPestsData] = useState([]);

    const handleChange = (e) => {
       const searchKeyword =  e.target.value;
       setWordEntered(searchKeyword);
        const newCropsFilter = cropsData.filter((value)=> {
            return  value.crop.toLowerCase().includes(searchKeyword.toLowerCase());
        });

        const newPestsFilter = pestsData.filter((value)=> {
            return  value.pest.toLowerCase().includes(searchKeyword.toLowerCase());
        });

        if(searchKeyword === "") {
            setFilteredCropsData([]);
            setFilteredPestsData([]);
        }
        else{
            setFilteredCropsData(newCropsFilter);
            setFilteredPestsData(newPestsFilter);
        }
    }

    const clearInput = () => {
         //setSearchKeyword("");
        setFilteredCropsData([]);
        setWordEntered("");
    }
    return (
        <div className='search'>
           <div className="searchInputs">
                <input id="searchBox" value={wordEntered} onChange={handleChange} placeholder={placeholder}></input>
                <div className="searchIcon">
                    {filteredCropsData.length === 0 && filteredPestsData.length === 0? (<img src={SearchIcon} alt="wait" />) : 
                    (<img src={CloseIcon} alt="wait" id='clearBtn' onClick={clearInput}/>) }
                </div>
                
           </div>
           {
               filteredCropsData.length != 0 && 
                <div className="dataResult">
                        {
                            filteredCropsData.slice(0,15).map((value, key)=> {
                                return <Link to={`/Crops/${value.id}`} className='dataItem'> <div id="sResult"> <img src={value.image} alt="wait" /> <p>{value.crop} </p></div></Link>
                            })
                        }
                </div>
                
            }

            {
               filteredPestsData.length != 0 && 
                <div className="dataResult">
                        {
                            filteredPestsData.slice(0,15).map((value, key)=> {
                                return <Link to={`/Pest/Description/${value.pId}`} className='dataItem'> <div id="sResult"> <img src={value.image} alt="wait" /> <p>{value.pest} </p></div></Link>
                            })
                        }
                </div>
                
            }
        </div>

        
    )
}

export default Searchbar

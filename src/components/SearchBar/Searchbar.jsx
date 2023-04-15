import React, { useState } from 'react';
import SearchIcon from './search.svg';
import CloseIcon from './close.svg';
import "./Searchbar.css";

// react router
import { Link } from "react-router-dom";

import { Typography } from '@mui/material';

//antd
import {
    Input,
    List, Avatar
} from 'antd';
//icons
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';


const { Search } = Input;

function Searchbar({ placeholder, cropsData, pestsData, weedsData, diseasesData }) {
    const iconStyle = {
        color: "rgb(101, 60, 168)",
    }

    const [wordEntered, setWordEntered] = useState("");
    const [filteredCropsData, setFilteredCropsData] = useState([]);
    const [filteredPestsData, setFilteredPestsData] = useState([]);
    const [filteredWeedsData, setFilteredWeedsData] = useState([]);
    const [filteredDiseasesData, setFilteredDiseasesData] = useState([]);


    console.log(diseasesData)

    const handleChange = (e) => {
        const searchKeyword = e.target.value;
        setWordEntered(searchKeyword);
        const newCropsFilter = cropsData.filter((value) => {
            return value.crop.toLowerCase().includes(searchKeyword.toLowerCase());
        });

        const newWeedFilter = weedsData.filter((value) => {
            return value.weed.toLowerCase().includes(searchKeyword.toLowerCase());
        });

        const newPestsFilter = pestsData.filter((value) => {
            return value.pest.toLowerCase().includes(searchKeyword.toLowerCase());
        });

        const newDiseasesFilter = diseasesData.filter((value) => {
            return value.disease.toLowerCase().includes(searchKeyword.toLowerCase());
        });

        if (searchKeyword === "") {
            setFilteredCropsData([]);
            setFilteredPestsData([]);
        }
        else {
            setFilteredCropsData(newCropsFilter);
            setFilteredPestsData(newPestsFilter);
            setFilteredWeedsData(newWeedFilter);
            setFilteredDiseasesData(newDiseasesFilter);
        }
    }



    const clearInput = () => {
        setFilteredCropsData([]);
        setFilteredPestsData([]);
        setFilteredWeedsData([]);
        setFilteredDiseasesData([]);
        setWordEntered("");
    }
    return (
        <div className='search'>
            <div className="searchInputs">
                <input id="searchBox" value={wordEntered} onChange={handleChange} placeholder={placeholder}></input>
                <div className="searchIcon">
                    {filteredCropsData.length === 0 && filteredPestsData.length === 0 ? (<SearchOutlined style={{ fontSize: '16px', color: '#1DA1F2' }} />) :
                        (<CloseCircleOutlined onClick={clearInput} style={{ fontSize: '16px', color: '#1DA1F2' }} />)}
                </div>
            </div>
            {
                wordEntered !== "" ?
                    <div className="dataResult">
                        {
                            filteredCropsData.length != 0 &&
                            <>
                                {
                                    filteredCropsData.slice(0, 15).map((value, key) => {
                                        return <Link to={`/Crops/${value.id}`} className='dataItem'> <div id="sResult"> <img src={value.image} alt="wait" /> <p>{value.crop}{'(pests)'} </p></div></Link>
                                    })
                                }
                            </>
                        }
                        {
                            filteredCropsData.length != 0 &&
                            < >
                                {
                                    filteredCropsData.slice(0, 15).map((value, key) => {
                                        return <Link to={`/Crops/${value.id}`} className='dataItem'> <div id="sResult"> <img src={value.image} alt="wait" /> <p>{value.crop} </p></div></Link>
                                    })
                                }
                            </>
                        }
                        {
                            filteredPestsData.length != 0 &&
                            < >
                                {
                                    filteredPestsData.slice(0, 15).map((value, key) => {
                                        return <Link
                                            to={`/Pest/Description/${value.pest} /${value.pId}`}
                                            className='dataItem'> <div id="sResult"> <img src={value.image} alt="wait" /> <p>{value.pest} </p></div></Link>
                                    })
                                }
                            </>

                        }


                        {
                            filteredWeedsData.length != 0 &&
                            <>
                                {
                                    filteredWeedsData.slice(0, 15).map((value, key) => {
                                        return <Link
                                            to={`/weed/description/${value.weed}/${value.id}`}
                                            className='dataItem'> <div id="sResult"> <img src={value.image} alt="wait" /> <p>{value.weed} </p></div></Link>
                                    })
                                }
                            </>

                        }
                        {
                            filteredDiseasesData.length != 0 &&
                            < >
                                {
                                    filteredDiseasesData.slice(0, 15).map((value, key) => {
                                        return <Link
                                            to={`/disease/description/${value.disease} /${value.dId}`}
                                            className='dataItem'> <div id="sResult"> <img src={value.image} alt="wait" /> <p>{value.disease} </p></div></Link>
                                    })
                                }
                            </>

                        }
                    </div> :
                    filteredCropsData.length === 0 && filteredPestsData.length === 0 && wordEntered !== "" ?

                        <Typography className='dataItem'>
                            {"No corresponding item in database"}
                        </Typography>
                        :
                        ''
            }
        </div>


    )
}

export default Searchbar

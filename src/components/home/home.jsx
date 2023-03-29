import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import './home.css'
import Searchbar from '../SearchBar/Searchbar';
import Footer from '../Footer/Footer';
import { useGetAllPestsQuery } from 'api/pestApi';
import { useGetAllCropsQuery } from 'api/cropApi';
import { useGetAllUsersQuery } from 'api/userApi';

function Home() {
    const crops = useGetAllCropsQuery();
    const pests = useGetAllPestsQuery();
    // const { data } = useGetAllUsersQuery();

    const handleSubmit = async (e) => {

        e.preventDefault();

    }


    return (
        <div>
            <Searchbar placeholder='e.g. Corn' cropsData={crops.data} pestsData={pests.data} />
            <div className="container">
                <Link to="/crops">
                    <div className="insects con-item">
                        <h4>Insects</h4>
                    </div>
                </Link>

                <Link to="/diseases">
                    <div className="diseases con-item">
                        <h4>Diseases</h4>
                    </div>
                </Link>

                <Link to="/weeds">
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

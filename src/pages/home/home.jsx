import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import './home.css'

//api
import { useGetAllPestsQuery } from 'api/pestApi';
import { useGetAllCropsQuery } from 'api/cropApi';
import { useGetAllWeedsQuery } from 'api/weedApi';
import { useGetAllDiseasesQuery } from 'api/diseasesApi';

import Searchbar from 'components/SearchBar/Searchbar';

function Home() {
    const crops = useGetAllCropsQuery();
    const pests = useGetAllPestsQuery();
    const weeds = useGetAllWeedsQuery();
    const diseases = useGetAllDiseasesQuery();

    const handleSubmit = async (e) => {

        e.preventDefault();

    }




    return (
        <div>
            <Searchbar placeholder='Search Database...' diseasesData={diseases.data} weedsData={weeds.data} cropsData={crops.data} pestsData={pests.data} />
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
        </div>
    )
}

export default Home

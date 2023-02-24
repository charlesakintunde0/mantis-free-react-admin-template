import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux';
import { setUser } from 'store/reducers/user';

import { Link } from "react-router-dom";
import axios from 'axios'
import './insects.css'
import AdminCrops from '../../pages/admin-dashboard/AdminCrops';
import './Crops.css'
import Config from "./../../config.json";


// antd
import { Space, Spin } from 'antd';


// constants
import userRole from 'Constants/userRole';

// api 
import { useGetUserQuery } from 'api/userApi';
import { useGetAllCropsQuery } from 'api/cropApi';



function Crops() {
    const currentlyLoggedInUserData = useGetUserQuery();
    const allStoredCrops = useGetAllCropsQuery(null);
    const [allCrops, setAllCrop] = useState(null);
    const dispatch = useDispatch();


    const [curentlyLoggedInUser, setCurentlyLoggedInUser] = useState(null);



    useEffect(() => {


        if (currentlyLoggedInUserData.data) {
            setCurentlyLoggedInUser(currentlyLoggedInUserData.data[0])
            dispatch(setUser(currentlyLoggedInUserData.data[0]));
        }
        if (allStoredCrops.data) {
            setAllCrop(allStoredCrops.data)
        }
    }, [currentlyLoggedInUserData.status, allStoredCrops.status]);




    return (
        <div className="outer">
            <div className='adminStyle'>
                <h2> Select the Crop </h2>
                {
                    curentlyLoggedInUser ?
                        <>{curentlyLoggedInUser.isAdmin == userRole.ADMIN ?
                            <div className='adminAccess'>
                                <Link to="/AdminCrops">
                                    <button className="editSave edit">Edit</button>
                                </Link>
                            </div> :
                            ''
                        }</> : ''
                }


            </div>

            <div className="cards">
                {
                    allCrops ? <> {
                        allCrops.map(cr => (
                            <Link to={`/Crops/${cr.id}`} key={cr.id}>
                                <div className="card">
                                    <p className="description">{cr.crop}</p>
                                    <div className="cropImg">
                                        <img src={cr.image} alt="Loading Images"></img>
                                    </div>
                                </div>
                            </Link>
                        )
                        )
                    } </>
                        : <Space size="middle">
                            <Spin size="large" />
                        </Space>
                }

            </div>
        </div>
    )

}

export default Crops

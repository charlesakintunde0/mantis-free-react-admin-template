import { Notification } from 'components/Notifications/Notification';
import { set } from 'lodash';
import React, { useEffect, useState, } from 'react'

import { lazy } from 'react';


import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';





// render - utilities 
const Login = lazy(() => import('../pages/authentication/Login'));
const Register = lazy(() => import('../pages/authentication/Register'));
const Home = Loadable(lazy(() => import('../pages/home/home')));
const AllPests = Loadable(lazy(() => import('../pages/home/AllPests')));
const Crops = Loadable(lazy(() => import('../pages/home/Crops')));
const Weeds = Loadable(lazy(() => import('../pages/home/Weeds')));
const PestDescription = Loadable(lazy(() => import('../pages/home/PestDescription')));
const WeedDescription = Loadable(lazy(() => import('../pages/home/WeedDescription/WeedDescription')));
const DiseaseDescription = Loadable(lazy(() => import('../pages/home/DiseaseDescription/DiseaseDescription')));
const AllDiseases = Loadable(lazy(() => import('../pages/home/AllDiseases')));
const CropsDisease = Loadable(lazy(() => import('../pages/home/CropsDisease')));
const Comments = Loadable(lazy(() => import('../components/Comments/Comments')));
const ExampleComment = Loadable(lazy(() => import('../components/Comments/ExampleComment')));
const NotFoundPage = Loadable(lazy(() => import('pages/NotFoundPage')))
const About = Loadable(lazy(() => import('pages/About')));


function PrivateRoute({ component: Component, ...rest }) {
    const navigate = useNavigate();
    const userDetails = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = userDetails ? true : false;

    // Redirect to login page if user is not authenticated
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            Notification('warning', 'You are not logged in!', 'You must be logged in to view content')
        }
    }, []);

    // if (!isLoggedIn) {s

    // }


    // Render the component if user is authenticated
    return isLoggedIn ? <Component {...rest} /> : null;
}
// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: 'register',
            element: <Register />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/about',
            element: <About />
        },

        // Private routes that require authentication
        {
            path: '/crops',
            element: <PrivateRoute component={Crops} />
        },
        {
            path: '/diseases',
            element: <PrivateRoute component={CropsDisease} />
        },
        {
            path: '/diseases/:cropID',
            element: <PrivateRoute component={AllDiseases} />
        },
        {
            path: '/weeds',
            element: <PrivateRoute component={Weeds} />
        },
        {
            path: '/crops/:cropID',
            element: <PrivateRoute component={AllPests} />
        },
        {
            path: '/Pest/Description/:pestName/:pestId',
            element: <PrivateRoute component={PestDescription} />
        },
        {
            path: '/disease/description/:diseaseName/:diseaseId',
            element: <PrivateRoute component={DiseaseDescription} />
        },
        {
            path: '/weed/description/:weedName/:weedId',
            element: <PrivateRoute component={WeedDescription} />
        },
        {
            path: '/Comments',
            element: <PrivateRoute component={Comments} />
        },
        {
            path: '/examplecomments',
            element: <PrivateRoute component={ExampleComment} />
        },
        {
            path: '*',
            element: <NotFoundPage />
        }
    ]
};


export default MainRoutes;

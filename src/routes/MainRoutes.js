import { lazy } from 'react';
import { useEffect, useState } from 'react';


// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';


// render - utilities
const Navbar = Loadable(lazy(() => import('../components/navbar/navbar')));
const Home = Loadable(lazy(() => import('../components/home/home')));
const AllPests = Loadable(lazy(() => import('../components/home/AllPests')));
const Crops = Loadable(lazy(() => import('../components/home/Crops')));
const Weeds = Loadable(lazy(() => import('../components/home/Weeds')));
const PestDescription = Loadable(lazy(() => import('../components/home/PestDescription')));
const AllDiseases = Loadable(lazy(() => import('../components/home/AllDiseases')));
const CropsDisease = Loadable(lazy(() => import('../components/home/CropsDisease')));
const Registration = Loadable(lazy(() => import('../components/reg-log/Registration')));
const Login = Loadable(lazy(() => import('../components/reg-log/Login')));
const Comments = Loadable(lazy(() => import('../components/Comments/Comments')));
const Admin_Pests = Loadable(lazy(() => import('../components/home/Admin/Admin_Pests')));
const Admin_Crops = Loadable(lazy(() => import('../components/home/Admin/Admin_Crops')));
const ExampleComment = Loadable(lazy(() => import('../components/Comments/ExampleComment')));


// const [name, setName] = useState(null);
// const [user, setUser] = useState(null);


// console.log(data);

// useEffect(() => {

//     (
//         async () => {
//             try {
//                 const res = await fetch('https://localhost:44361/api/users/getuser', {
//                     headers: { "Content-Type": 'application/json;charset=UTF-8' },
//                     credentials: 'include',
//                 });
//                 const content = await res.json();
//                 setUser(content);
//                 setName(content[0].uFirstName); // has to be content[0]
//             }
//             catch (e) {
//                 console.log(e);
//             }
//         }

//     )();
// }, [name])



// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    // element: <Navbar />,
    children: [
        {
            path: '/free',
            element: <Home />
        },
        {
            path: 'registration',
            element: <Registration />
        },
        // {
        //     path: '/login',
        //     element: <Login setName={setName} />
        // },
        {
            path: '/crops',
            element: <Crops />
        },
        {
            path: '/diseases',
            element: <CropsDisease />
        },
        {
            path: '/diseases/:cropID',
            element: <AllDiseases />
        },
        {
            path: '/crops',
            element: <Weeds />
        },
        {
            path: '/diseases',
            element: <CropsDisease />
        },
        {
            path: '/Crops/:cropID',
            element: <AllPests />
        },
        {
            path: '/Pest/Description/:pestID',
            element: <PestDescription />
        },
        {
            path: '/Comments',
            element: <Comments />
        },
        {
            path: '/examplecomments',
            element: <ExampleComment />
        },
        // {
        //     path: '/AdminCrops',
        //     element: <Admin_Crops user={user} />
        // },
        // {
        //     path: '/AdminPests/:cropID',
        //     element: <Admin_Pests user={user} />
        // }

    ]
};

export default MainRoutes;

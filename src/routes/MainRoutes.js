import { lazy } from 'react';


// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';




// render - utilities 
const AdminDashboard = lazy(() => import('pages/admin-dashboard/index'));
const SamplePage = lazy(() => import('pages/extra-pages/SamplePage'));
const Login = lazy(() => import('../pages/authentication/Login'));
const Register = lazy(() => import('../pages/authentication/Register'));
const Home = Loadable(lazy(() => import('../components/home/home')));
const AllPests = Loadable(lazy(() => import('../components/home/AllPests')));
const Crops = Loadable(lazy(() => import('../components/home/Crops')));
const Weeds = Loadable(lazy(() => import('../components/home/Weeds')));
const PestDescription = Loadable(lazy(() => import('../components/home/PestDescription')));
const WeedDescription = Loadable(lazy(() => import('../components/home/WeedDescription/WeedDescription')));
const DiseaseDescription = Loadable(lazy(() => import('../components/home/DiseaseDescription/DiseaseDescription')));
const AllDiseases = Loadable(lazy(() => import('../components/home/AllDiseases')));
const CropsDisease = Loadable(lazy(() => import('../components/home/CropsDisease')));
const Comments = Loadable(lazy(() => import('../components/Comments/Comments')));
const ExampleComment = Loadable(lazy(() => import('../components/Comments/ExampleComment')));
const About = Loadable(lazy(() => import('pages/About')));

// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'home',
            element: <Home />
        },
        {
            path: 'registration',
            element: <Register />
        },
        {
            path: '/login',
            element: <Login />
        },
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
            path: 'weeds',
            element: <Weeds />
        },
        {
            path: 'about',
            element: <About />
        },
        {
            path: '/diseases',
            element: <CropsDisease />
        },
        {
            path: '/crops/:cropID',
            element: <AllPests />
        },
        {
            path: '/Pest/Description/:pestName/:pestId',
            element: <PestDescription />
        },
        {
            path: '/disease/description/:diseaseName/:diseaseId',
            element: <DiseaseDescription />
        },
        {
            path: '/weed/description/:weedName/:weedId',
            element: <WeedDescription />
        },
        {
            path: '/Comments',
            element: <Comments />
        },
        {
            path: '/examplecomments',
            element: <ExampleComment />
        },
        {
            path: '/samplepages',
            element: <SamplePage />
        },
        {
            path: '/dashboard',
            element: <AdminDashboard />
        }

    ]
};

export default MainRoutes;

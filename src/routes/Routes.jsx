import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import UpdateProfile from '../Pages/UpdateProfile/UpdateProfile';
import UserProfile from '../Pages/UserProfile/UserProfile';
import PrivateRoute from './PrivateRoute';
import AllServices from '../Pages/AllServices/AllServices';
import AddService from '../Pages/AddService/AddService';
import ServiceToDo from '../Pages/ServiceToDo/ServiceToDo';
import BookedServices from '../Pages/BookedServices/BookedServices';
import ManageServices from '../Pages/ManageServices/ManageServices';
import ServiceDetails from '../Pages/ServiceDetails/ServiceDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/all-services`),
        element: <Home />,
      },
      {
        path: '/all-services',
        element: <AllServices />,
      },
      {
        path: '/service/:id',
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/service-details/${params.id}`),
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/add-service',
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: '/manage-services',
        element: (
          <PrivateRoute>
            <ManageServices />
          </PrivateRoute>
        ),
      },
      {
        path: '/booked-services',
        element: (
          <PrivateRoute>
            <BookedServices />
          </PrivateRoute>
        ),
      },
      {
        path: '/service-to-do',
        element: (
          <PrivateRoute>
            <ServiceToDo />
          </PrivateRoute>
        ),
      },
      // {
      //   path: '/spot-details/:id',
      //   loader: ({ params }) =>
      //     fetch(
      //       `https://ph-a11-server.vercel.app/allTouristsSpot/${params.id}`
      //     ),
      //   element: (
      //     <PrivateRoute>
      //       <TouristsSpotDetails />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: '/favourite-spots',
      //   loader: () => fetch('https://ph-a11-server.vercel.app/allTouristsSpot'),
      //   element: (
      //     <PrivateRoute>
      //       <FavouriteSpots />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: '/my-list/',
      //   element: (
      //     <PrivateRoute>
      //       <MyList />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: '/update-spot/:id',
      //   loader: ({ params }) =>
      //     fetch(
      //       `https://ph-a11-server.vercel.app/allTouristsSpot/${params.id}`
      //     ),
      //   element: (
      //     <PrivateRoute>
      //       <UpdateSingleSpot />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: '/country-based-spots/:country',
      //   loader: ({ params }) =>
      //     fetch(
      //       `https://ph-a11-server.vercel.app/getSpotsByCountry/${params.country}`
      //     ),
      //   element: <CountryBasedSpots />,
      // },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/update-profile',
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: '/user-profile',
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

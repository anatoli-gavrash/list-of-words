import { FC } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import NodFound from './components/not-found';
import App from './App';
import Card from './components/card';

const CustomRoute: FC = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route path=':idCard' element={<Card />} errorElement={<NodFound />}/>
      </Route>
    )
  );
  
  return (
    <RouterProvider router={router} />
  );
};

export default CustomRoute;

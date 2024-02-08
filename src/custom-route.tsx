import { FC } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import App from './App';
import Card from './components/card';
import CardEdit from './components/card-edit';
import CardNew from './components/card-new';

const CustomRoute: FC = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route path='new-card' element={<CardNew />} />
        <Route path=':idCard' element={<Card />} />
        <Route path=':idCard/edit' element={<CardEdit />} />
      </Route>
    )
  );
  
  return (
    <RouterProvider router={router} />
  );
};

export default CustomRoute;

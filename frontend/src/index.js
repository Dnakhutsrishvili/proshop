import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,
        createRoutesFromElements ,
Route,
RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css'
import App from './App';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';


const router=createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<App/>}>
<Route index={true} path='/' element={<HomeScreen/>}></Route>
<Route path='/product/:id' element={<ProductScreen/>}></Route>

    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
<RouterProvider router={router}/>
</Provider>
  </React.StrictMode>
);



import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './views/Login';
import { MantineProvider } from '@mantine/core';
import MainLayout from './layouts/MainLayout';
import Inicio from './views/Inicio';
import GlobalContext from './contexts/GlobalContent';
import restauranteTheme from './CustomProvider';
import '@mantine/core/styles.css';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Inicio />,
      }
    ]
  },
  {
    path: '/iniciar-sesion',
    element: <Login />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={restauranteTheme}   >
      <GlobalContext >
        <RouterProvider router={router} />
      </GlobalContext>
    </MantineProvider>
  </React.StrictMode>,
)

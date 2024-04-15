import './index.css'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './views/Login';
import { MantineProvider } from '@mantine/core';
import MainLayout from './layouts/MainLayout';
import Inicio from './views/Inicio';
import restauranteTheme from './CustomProvider';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import Empleados from './views/Empleados.jsx';
import Productos from './views/Productos.jsx';
import Mesas from './views/Mesas.jsx';
import Comandas from './views/Comandas.jsx';
import Platillos from './views/Platillos.jsx';
import CrearComanda from './views/CrearComanda.jsx';
import Compras from './views/Compras.jsx';
import EditarComanda from './views/EditarComanda.jsx';
import { Notifications } from '@mantine/notifications';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Inicio />,
      },
      {
        path: '/empleados',
        element: <Empleados />,
      },
      {
        path: '/productos',
        element: <Productos />
      },
      {
        path: '/mesas',
        element: <Mesas />,
      },
      {
        path: '/comandas',
        element: <Comandas />,
      },
      {
        path: '/platillos',
        element: <Platillos />
      },
      {
        path: '/comandas/crear-comanda',
        element: <CrearComanda />,
      },
      {
        path: '/compras',
        element: <Compras />
      },
      {
        path: '/comandas/editar-comanda/:id',
        element: <EditarComanda />,
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
    <MantineProvider theme={restauranteTheme} withGlobalStyles>
    <Notifications/>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
    </MantineProvider>
  </React.StrictMode>,
)

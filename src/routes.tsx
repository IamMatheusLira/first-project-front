import { Navigate, Outlet } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';

const routes = (authorized: boolean | undefined) => [
  {
    path: '/',
    element: authorized ? <HomePage /> : <Navigate to="/login" />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: '/', element: <Navigate to="/login" /> },
    ],
  },
];

export default routes;

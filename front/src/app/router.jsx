import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import WelcomePage from '../pages/Welcome/WelcomePage';
import UsersPage from '../pages/Users/UsersPage';
import GroupPage from '../pages/Groups/GroupPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'groups',
        element: <GroupPage />,
      },
    ],
  },
]);
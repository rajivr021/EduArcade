import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage'
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import Games from './components/Game'
import Leaderboard from './components/LeaderBoard';

const AppLayout = () => (
  <div className="app">
    <Navbar />
    <Outlet />
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'profile', element: <Profile />, },
      { path: 'games', element: <Games />, },
      { path: 'leaderboard', element: <Leaderboard />, },
    ],
  },
  {
  path: '/sign-in/*',
  element: <SignInPage />,
},
{
  path: '/sign-up/*',
  element: <SignUpPage />,
},
{
  path: '/sign-in/factor-one',
  element: <SignInPage />,
},
{
  path: '/sign-in/identifier-link',
  element: <SignInPage />,
},
{
  path: '/sign-up/verify',
  element: <SignUpPage />,
},

]);


const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;

import React, {useState, createContext} from 'react'
import './App.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'


import PlaylistItemsWrapper from './components/PlaylistItems/Playlists'

import AvailableSongs from './components/Songs/AvailableSongs'
import PlaylistItemWrapper from './components/PlaylistItem/PlaylistItem'
import RootLayout from './pages/Root'
import UserForm from './components/UserForm';

import { checkAuthLoader, tokenLoader, getAuthToken } from './util/auth';
import AuthenticationPage, {  authAction as authAction,} from './pages/Authentication';
export const AuthContext = createContext();
const router = createBrowserRouter([
  {path: '/', element: <RootLayout /> , id: 'root', loader: tokenLoader ,
  children: [
    // {path: '/', element: <UserForm />},
    {
      path: '/', element: <AuthenticationPage />,  action: authAction(AuthContext)
    },
    {path: '/songs', element: <AvailableSongs/>,  loader: checkAuthLoader,},
    {path: '/playlist', element: <PlaylistItemsWrapper/>,  loader: checkAuthLoader,},
    {path: '/playlist/:id', element: <PlaylistItemWrapper/>,  loader: checkAuthLoader,}
  ]
},
  
 



])


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Logic to authenticate user
    const token = getAuthToken();
    setIsAuthenticated(token);
  };

  const logout = () => {
    // Logic to logout user
    setIsAuthenticated(false);
  };
  return (
    <>
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>

<RouterProvider router={router}/>
</AuthContext.Provider>
    </>
    
  )
}

export default App

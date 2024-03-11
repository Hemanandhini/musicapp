import React from 'react'
import './App.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Playlists from './components/PlaylistItems/Playlists';
import PlaylistItem from './components/PlaylistItem/PlaylistItem';
import AvailableSongs from './components/Songs/AvailableSongs'
import RootLayout from './pages/Root';
import { checkAuthLoader, tokenLoader } from './util/auth';
import AuthenticationPage, {  action as authAction,} from './pages/Authentication';
import LogoutPage, {action as logoutAction} from './pages/Logout';

const router = createBrowserRouter([
  {path: '/', element: <RootLayout /> , id: 'root', loader: tokenLoader ,
  children: [
    {path: '/auth', element: <AuthenticationPage />,  action: authAction},
    {path: '/songs', element: <AvailableSongs/>,  loader: checkAuthLoader,},
    {path: '/playlist', element: <Playlists/>,  loader: checkAuthLoader,},
    {path: '/playlist/:id', element: <PlaylistItem/>,  loader: checkAuthLoader,},
    {path: '/logout',element: <LogoutPage/>, action: logoutAction}]
 }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
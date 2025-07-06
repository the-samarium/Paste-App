import { useState } from 'react'
import { Analytics } from "@vercel/analytics/next"
import './App.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from './pages/home';
import Paste from './pages/pastes';
import Navbar from './pages/Navebar';
import ViewPaste from './pages/ViewPaste';
import Footer from './pages/Footer';

function App() {
  const router = createBrowserRouter(
    [
      {path:'/',element:<><Navbar/><Home/></>},
      {path:'/pastes', element:<><Navbar/><ViewPaste/></>},
      {path:'/pastes/:id', element:<><Navbar/><Paste/></>}
    ]
  )
 return (
  <div>
    <RouterProvider router={router}/>
    <div className="footer-fullwidth">
      <Footer/>
    </div>
    <Toaster position="top-center" />
  </div>
 )
}

export default App

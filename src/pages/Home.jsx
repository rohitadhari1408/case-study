import React from 'react'
import Box from '@mui/material/Box';
import Sidenav from '../componets/sidenav.jsx';
import NavBar from '../componets/navbar.jsx';
import Medicard from '../componets/card.js'
import MarkMap from '../componets/markmap.js'



import { useState } from 'react';

const Home = () => {






  return (
    <>


      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'gray.100' }}>
        {/* Sidebar */}
        <Box sx={{ width: '240px', bgcolor: 'gray.800', height: '100vh' }}>
          <Sidenav />
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Navbar */}
          <Box sx={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
            <NavBar />
          </Box>

          {/* Content Area */}
          <Box component="main" sx={{ p: 3, mt: 2 }}>
            <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
            <Medicard />
          </Box>
        </Box>
      </Box>


    </>
  )
}

export default Home


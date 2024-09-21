import React from 'react'
import Sidenav from '../componets/sidenav'
import Box from '@mui/material/Box'
import NavBar from '../componets/navbar'
import Table from '../componets/dynamictable'
import { width } from '@mui/system'

const Employee = () => {
  return (
    <>
  <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'gray.100' }}>
      {/* Sidebar */}
      <Box sx={{ width: '240px', bgcolor: 'gray.800' }}>
        <Sidenav />
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Navbar */}
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
          <NavBar />
        </Box>

        {/* Content Area */}
        <Box sx={{ padding: 3 }}>
          <Table />
        </Box>
      </Box>
    </Box>
   
   


    </>
  )
}

export default Employee

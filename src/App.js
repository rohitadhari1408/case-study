import React from 'react';
import Home from './pages/Home.jsx';
import Employee from './pages/Employee.jsx';
import {createBrowserRouter ,RouterProvider} from "react-router-dom"

function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<><Home/></>
    },
    {
      path:"/admin",
      element:<><Employee/></>
    },
   
   
  ])

  return (
    <>
     <RouterProvider router={router}></RouterProvider>
 </>
  );
}

export default App;

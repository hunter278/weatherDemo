import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './css/tailWind.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)

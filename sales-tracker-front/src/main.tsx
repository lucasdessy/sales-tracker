import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import { PromosPage } from './presentation/promos/promos-page';

const router = createBrowserRouter([
  {
    path: "/promos",
    element: <PromosPage />,
  },
  {
    path: "/",
    element: <App />,
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

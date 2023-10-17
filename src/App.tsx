import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from './components/pages/Home'
import DetailUser from "./components/pages/DetailUser"
import './styles/main.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import withContext from "./components/context/globalContext"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail-user",
    element: <DetailUser />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default withContext(App)

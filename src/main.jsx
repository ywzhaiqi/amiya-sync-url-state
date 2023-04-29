import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import 'antd/dist/antd.css'
import AySearchDemo from './AySearchDemo';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AySearchDemo />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
)

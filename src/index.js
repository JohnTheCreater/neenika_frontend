import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./tailwind.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Customers from "./pages/Customers/customers";
import Home from "./pages/Home/home";
import Dashboard from "./pages/Dashboard/dashboard";
import Sales from "./pages/Sales/sales";
import { useNavigate } from "react-router-dom";
import Report from "./pages/Dashboard/Report/Report";
import AddStack from "./pages/Dashboard/Report/layout/AddStack";
import Login from "./pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import SetPassword from "./pages/SetPassword/SetPassword";
import {disableReactDevTools} from '@fvilers/disable-react-devtools';
import AddProducts from "./pages/Home/AddProducts";
if(process.env.NODE_ENV==='production') disableReactDevTools();
const DefaultRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return null;
};

const router = createBrowserRouter([
  {
    path: "/home",
    element: <PrivateRoute element={Home}/>
  },
  {
    path: "/dashboard",
    element: <PrivateRoute element={Dashboard}/>,
  },

  {
    path: "/customers",
    element: <PrivateRoute element={Customers }/>,
  },
  {
    path: "/sales",
    element: <PrivateRoute element={Sales }/>,
  },
  {
    path: "*",
    element: <DefaultRedirect />,
  },
  {
    path: "dashboard/report/:date/:month/:year",
    element:<PrivateRoute element={Report}/> ,
  },
  {
    path:"/addstack/:date/:shop",
    element: <PrivateRoute element={AddStack}/>
  }
  ,
  {
    path:"/login",
    element:<Login/>
  }
  ,
  {
    path:"/setPassword",
    element:<SetPassword/>
  },
  {
    path:"home/products",
    element:<AddProducts/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();

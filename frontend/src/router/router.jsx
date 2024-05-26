import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Home from "../components/client-side/Home";
import LoginForm from "../components/client-side/LoginForm";
import RegisterForm from "../components/client-side/RegisterForm";
import AuthContext from "../contexts/AuthContext";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../components/admin-side/Dashboard";

export const router = createBrowserRouter([
    
    {
        path:'/login',
        element:<AuthContext><LoginForm/></AuthContext>
    },
    {
        path:'/register',
        element:<AuthContext><RegisterForm/></AuthContext>
    },
    {
        element: <AuthContext><ClientLayout /></AuthContext>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: '/store',
                element: <p className="text-red-500">Store</p>,
            },
        ],
    },
    {
        element:<AuthContext><AdminLayout/></AuthContext>,
        children:[
            {
                path:'/dashboard',
                element:<Dashboard/>
            }
        ]
    }
]);

import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Home from "../components/client-side/Home";
import LoginForm from "../components/client-side/LoginForm";
import RegisterForm from "../components/client-side/RegisterForm";
import AuthContext from "../contexts/AuthContext";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../components/admin-side/Dashboard";
import ProductsTable from "../components/admin-side/products/ProductsTable";
import AddProduct from "../components/admin-side/products/AddProduct";
import UpdateProduct from "../components/admin-side/products/UpdateProduct";
import ShowProduct from "../components/admin-side/products/ShowProduct";
import Orders from "../components/admin-side/orders/Orders";
import UpdateOrder from "../components/admin-side/orders/UpdateOrder";
import CartContext from "../contexts/CartContext";
import CartPage from "../components/client-side/cart/CartPage";
import Checkout from "../components/client-side/cart/Checkout";
import ShowProductDetails from "../components/client-side/product/ShowProductDetails";
import Blogs from "../components/client-side/blogs/Blogs";
import PostsList from "../components/admin-side/posts/PostsList";
import AddPost from "../components/admin-side/posts/AddPost";

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
        element: <AuthContext>
            <CartContext>
                <ClientLayout />
            </CartContext>
        </AuthContext>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: '/store',
                element: <p className="text-red-500">Store</p>,
            },
            {
                path: '/cart',
                element: <CartPage/>,
            },
            {
                path: '/cart/checkout',
                element: <Checkout/>,
            },
            {
                path: '/product/:id',
                element: <ShowProductDetails/>,
            },
            {
                path: '/blog',
                element: <Blogs/>,
            },
        ],
    },
    {
        element:<AuthContext><AdminLayout/></AuthContext>,
        children:[
            {
                path:'/dashboard',
                element:<Dashboard/>
            },
            {
                path:'/dashboard/products',
                element:<ProductsTable/>
            },
            {
                path:'/dashboard/products/add',
                element:<AddProduct/>
            },
            {
                path:'/dashboard/products/:id/edit',
                element:<UpdateProduct/>
            },
            {
                path:'/dashboard/products/:id',
                element:<ShowProduct/>
            },
            {
                path:'/dashboard/orders',
                element:<Orders/>
            },
            {
                path:'/dashboard/orders/:id/edit',
                element:<UpdateOrder/>
            },
            {
                path:'/dashboard/posts',
                element:<PostsList/>
            },
            {
                path:'/dashboard/posts/add',
                element:<AddPost/>
            },
        ]
    }
]);

import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import SearchCandlesPage from "../Modules/user/pages/SearchCandlesPage";
import Login from "../pages/Login";
import SingleCandleDetails from "../Modules/user/pages/SingleCandleDetails";
import Cart from "../Modules/user/pages/Cart";
import CandleBlog from "../Modules/user/pages/CandleBlog";
import Signup from "../pages/SignUp";
import AdminDashHome from "../Modules/admin/pages/AdminDashHome";
import DashBoard from "../Modules/admin/pages/DashBoard";
import AdminSideBar from "../layout/AdminSideBar";
import AddTestimonials from "../Modules/admin/pages/AddTestimonials";
import ViewTestimonials from "../Modules/admin/pages/ViewTestimonials";
import AddProduct from "../Modules/admin/pages/AddProduct";
import ViewProduct from "../Modules/admin/pages/ViewProduct";
import ViewUsers from "../Modules/admin/pages/ViewUsers";
import ViewOrders from "../Modules/admin/pages/ViewOrders";
import CompletedOrders from "../Modules/admin/pages/CompletedOrders";
import DeleteBlogs from "../Modules/admin/pages/ViewBlogs";
import AddBlogs from "../Modules/admin/pages/AddBlogs";
import UserSideBar from "../layout/UserSideBar";
import UserDashBoard from "../Modules/user/pages/UserDashBoard";
import ViewPendingOrders from "../Modules/user/pages/ViewPendingOrders";
import ProtectedUserRoute from "../ProtectedRoute/ProtectedUserRoute";
import ProtectedAdminRoute from "../ProtectedRoute/ProtectedAdminRoute ";
import About from "../pages/About";
import Help from "../pages/Help"
import Contact from "../pages/Contact";
import CompletedOrdersUsers from "../Modules/user/pages/CompletedOrdersUsers";
import ViewBlogs from "../Modules/admin/pages/ViewBlogs";
import ViewSingleBlog from "../pages/ViewSingleBlog";
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
       {
        path: "/about",
        element: <About />,
      },
      {path:"/help",
        element:<Help/>
      },
       {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/search-candles",
        element: <SearchCandlesPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/management-login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/search-candles/:slug",
        element: <SingleCandleDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/blogs",
        element: <CandleBlog />,
      },
{
 path: "/blog/:slug",
        element: <ViewSingleBlog />,
},
      // ✅ PROTECTED USER ROUTES
      {
        element: <ProtectedUserRoute />, // wrapper
        children: [
          {
            path: "/user",
            element: <UserSideBar />,
            children: [
              { index: true, element: <UserDashBoard /> },
              { path: "pending-orders", element: <ViewPendingOrders /> },
              { path: "completed-orders", element: <CompletedOrdersUsers /> },
            ],
          },
        ],
      },

      // ✅ PROTECTED ADMIN ROUTES
      {
        element: <ProtectedAdminRoute />, // wrapper
        children: [
          {
            path: "/admin",
            element: <AdminSideBar />,
            children: [
              { index: true, element: <DashBoard /> },
              { path: "add-testimonials", element: <AddTestimonials /> },
              { path: "view-testimonials", element: <ViewTestimonials /> },
              { path: "add-products", element: <AddProduct /> },
              { path: "view-products", element: <ViewProduct /> },
              { path: "view-users", element: <ViewUsers /> },
              { path: "view-orders", element: <ViewOrders /> },
              { path: "completed-orders", element: <CompletedOrders /> },
              { path: "add-blogs", element: <AddBlogs /> },
              { path: "view-blogs", element: <ViewBlogs /> },
            ],
          },
        ],
      },
    ],
  },
]);


export default router;
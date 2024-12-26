import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import AddBlog from "../pages/AddBlog/AddBlog";
import UpdateBlog from "../pages/UpdateBlog/UpdateBlog";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import FeaturedBlogs from "../pages/FeaturedBlogs.jsx/FeaturedBlogs";
import PrivateRoute from "./PrivateRoute";
import Wishlist from "../pages/Wishlist/Wishlist";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import ErrorPage from "../pages/common/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "register",
            element: <Register></Register>
        },
        {
            path: "login",
            element: <Login></Login>
        },
        {
            path: "add-blog",
            element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
        },
        {
            path: "update-blog/:id",
            element: <PrivateRoute><UpdateBlog></UpdateBlog></PrivateRoute>,
        },
        {
            path: "all-blogs",
            element: <AllBlogs></AllBlogs>
        },
        {
            path: "featured-blogs",
            element: <FeaturedBlogs></FeaturedBlogs>
        },
        {
            path: "wishlist",
            element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
        },
        {
            path: "blog/:id",
            element: <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>,
        }
    ]
  },
]);

export default router;
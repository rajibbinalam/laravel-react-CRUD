import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/login";
import Users from "./views/Users";
import Signup from "./views/Signup";
import NotFount from "./views/NotFound";
import GuestLayout from "./components/layouts/GuestLayout";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to='/users' />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/users/create",
                element: <UserForm key="userCreate"/>,
            },
            {
                path: "/users/:id",
                element: <UserForm key="userupdate"/>,
            },
        ],
    },
    {
        path: "*",
        element: <NotFount />,
    },
]);

export default router;

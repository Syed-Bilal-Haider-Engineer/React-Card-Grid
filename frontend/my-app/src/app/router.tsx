import {
  createBrowserRouter,
} from "react-router-dom";

import Login from "../pages/auth/login/Login";
import { SignUp } from "../pages/auth/signup/SignUp";
import MainLayout from "../Components/layout/MainLayout";
import Gallery from "../pages/gallery/Gallaries";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Gallery />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);
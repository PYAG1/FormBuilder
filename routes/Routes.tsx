import { createBrowserRouter } from "react-router-dom";
import Main from "../src/pages/HomePage"
import React from "react";
import Signup from "../src/pages/Signup";
import Signin from "../src/pages/Signin";
import MainPage from "../src/pages/MainPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main/>
    },
    {
      path: "/signup",
      element:<Signup/>
    },
    {
      path: "/signin",
      element:<Signin/>
    },
    {
      path: "/home",
      element:<MainPage/>
    },
  ]);
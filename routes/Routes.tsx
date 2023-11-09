import { createBrowserRouter } from "react-router-dom";

import Signup from "../src/pages/Signup";
import Signin from "../src/pages/Signin/Signin";
import MainPage from "../src/pages/MainPage/MainPage";

export const router = createBrowserRouter([

    {
      path: "/signup",
      element:<Signup/>
    },
    {
      path: "/",
      element:<Signin/>
    },
    {
      path: "/home",
      element:<MainPage/>
    },
  ]);
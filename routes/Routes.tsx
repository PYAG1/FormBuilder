import { createBrowserRouter } from "react-router-dom";

import Signup from "../src/pages/Signup";
import Signin from "../src/pages/Signin";
import MainPage from "../src/pages/MainPage";
import ProtectedRoute from "../src/utils/ProtectedRoute";
import FormPage from "../src/pages/Form";
import Blankindex from "../src/pages/blankDelete";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/formbuilder/:id",
    element: <FormPage/>
  },

]);
/*  {
    path: "/blank",
    element: <Blankindex/>
  },*/
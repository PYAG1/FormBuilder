import { createBrowserRouter } from "react-router-dom";

import Signup from "../src/pages/Signup";
import Signin from "../src/pages/Signin/Signin";
import MainPage from "../src/pages/MainPage/MainPage";
import Form from "../src/pages/Form/Form";
import ProtectedRoute from "../src/utils/ProtectedRoute";

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
    element: <Form />,
  },
]);

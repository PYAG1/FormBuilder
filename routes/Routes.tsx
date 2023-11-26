import { createBrowserRouter } from "react-router-dom";

import Signup from "../src/pages/Signup";
import Signin from "../src/pages/Signin";
import MainPage from "../src/pages/MainPage";
import ProtectedRoute from "../src/utils/ProtectedRoute";
import FormPage from "../src/pages/Form";
import FormDetails from "../src/pages/FormDetails";
import FormSubmit from "../src/pages/FormSubmit";

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
    element: (
      <ProtectedRoute>
        <FormPage/>
      </ProtectedRoute>
    )
  },
  {
    path: "/formDetails/:id",
    element: <FormDetails/>
  },
  {
    path: "/submit/:formurl",
    element:(
      <ProtectedRoute>
        <FormSubmit/>
      </ProtectedRoute>
    )
  },

]);

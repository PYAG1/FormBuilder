import { createBrowserRouter } from "react-router-dom";
import Main from "../src/pages/HomePage"
import React from "react";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main/>
    },
  ]);
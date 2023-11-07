import React, { useState } from "react";
import * as Y from "yup";
import TextField from "../core-ui/text-field";
import { useFormik } from "formik";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useUserAuthContext } from "../context/usercontext";

export default function Signin() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Y.object().shape({
      email: Y.string().required("email is required"),
      password: Y.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true); // Set loading to true on form submission
      await signin(values.email, values.password);
      setLoading(false);
    },
  });

  const { setLoggedUser,LoggedUser,token }: any = useUserAuthContext();
  onAuthStateChanged(auth, (currentUser) => {
    setLoggedUser(currentUser);
  });


  console.log(LoggedUser)

  const [loading, setLoading] = useState<Boolean>(false);

  const signin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential?.user;
      if (user) {
        const idToken = await user.getIdToken();
      
        localStorage.setItem("UserToken",idToken)
        navigate("/home");
        
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <div className="flex justify-between min-h-full  flex-1">
      <div className="flex flex-1 flex-col w-full h-screen  justify-center items-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 ">
          <div>
            <h1 className="text-left raleway font-semibold text-2xl mb-5">
              Form-Builder
            </h1>
          </div>

          <div className="py-4">
            <div>
              <form
                onSubmit={formik.handleSubmit}
                action="#"
                method="POST"
                className="space-y-6 manrope"
              >
                <TextField
                  label="Email"
                  placeholder="Enter your email"
                  type="text"
                  id="email"
                  {...formik}
                />
                <TextField
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  id="password"
                  {...formik}
                />

                <button
                  type="submit"
                  className="w-full font-manrope  rounded-md bg-primary  py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {loading ? <BeatLoader size={8} color={"#fff"} /> : "Sign in"}
                </button>
                <div className="flex items-center justify-end">
                  <div className="text-sm flex justify-end leading-6">
                    <a
                      href="#"
                      className="underline manrope  hover:text-primary"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-16 lg:mt-0">
          <p className="font-manrope text-gray-500 text-sm text-center">
            All rights reserved, {new Date().getFullYear()}. Powered by PYAG
          </p>
        </div>
      </div>
    </div>
  );
}

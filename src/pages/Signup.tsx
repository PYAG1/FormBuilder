import React from "react";
import * as Y from "yup";
import TextField from "../core-ui/text-field";
import { useFormik } from "formik";

export default function Signup() {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Y.object().shape({
      email: Y.string().required("email is required"),
      password: Y.string().required("Password is required"),
    }),
    onSubmit: (values) => {},
  });
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
                  className="w-full font-manrope  rounded-md bg-primary  py-3  font-semibold leading-6 text-text text-lg shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Sign up
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

/*     <button
                type="submit"
                className="w-full font-manrope  rounded-md bg-primary  py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                  {loading ? (
                <BeatLoader size={6} color={"#fff"} />
              ) : (
                "Sign in"
              )}
              </button>
              */

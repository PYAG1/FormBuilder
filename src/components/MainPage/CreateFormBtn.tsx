import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TextAreaField from "../../core-ui/text-area";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "../../core-ui/text-field";
import { toast } from "react-toastify";
import { addDoc, getDocs } from "firebase/firestore";
import { colRef } from "../../../firebase-config";
import { useUserAuthContext } from "../../context/usercontext";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";

export default function CreateFormButton() {
  const [open, setOpen] = useState(false);

const userId= localStorage.getItem("UserId")

  function getFormData() {
    getDocs(colRef)
      .then((snapshot) => {
        let formD: any[] = [];
        snapshot.docs.forEach((doc) => {
          formD.push({ ...doc.data(), id: doc.id });
        });
        console.log("apple", formD);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getFormData();
  console.log(serverTimestamp());
  
  const navigate = useNavigate();
 const CreateFrom = (title: string, description: string, userId: any) => {
    const formData = {
      id: "",
      userId: userId,
      title: title,
      description: description,
      content: "",
      published: false,
      shareUrl: "",
      submissions: 0,
      visits: 0,
      createdAt: serverTimestamp() // Use serverTimestamp() here
  };
   addDoc(colRef, formData)
      .then(() => {
        toast.success("Form has been created");
      })
      .catch((err) => {
        toast.error("Error");
      });
  };

  const cancelButtonRef = useRef(null);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
    description: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      CreateFrom(values.title, values.description, userId);
     
      setOpen(false);
      navigate("/form");
    },
  });

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
          />
        </svg>
        <span className="mt-2 block text-sm font-medium text-gray-900">
          Create new form
        </span>
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 manrope"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Create a new form
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Give your form life
                          </p>
                        </div>
                      </div>
                    </div>
                    <form
                      onSubmit={formik.handleSubmit}
                      className=" lg:px-4 lg:py-6 flex flex-col gap-3"
                    >
                      <TextField
                        label="Name"
                        placeholder="Enter form title"
                        type="text"
                        id="title"
                        {...formik}
                      />
                      <TextAreaField
                        label="Description"
                        placeholder="Enter description"
                        id="description"
                        {...formik}
                      />
                      <div className=" py-3 sm:flex sm:flex-row-reverse sm:px-5">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Create
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

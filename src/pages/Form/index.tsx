import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { colRef } from "../../../firebase-config";
import { useUserFormContext } from "../../context/formcontext";
import { Form } from "../../utils/types";
import { MdArrowLeft } from "react-icons/md";
import SaveBtn from "../../components/Form/SaveBtn";
import PreviewBtn from "../../components/Form/PreviewBtn";
import PublishFormBtn from "../../components/Form/PublishFormBtn";
import Formbuilder from "../../components/Form/Formbuilder";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "../../components/Form/DragOverlayWrapper";
import { useBuilderContext } from "../../context/designerContext";
import { ClipLoader } from "react-spinners";
import NavBar from "../../components/Navigation/NavBar";

const FormPage = () => {
  const { id } = useParams();
  const { userId, getDataByIdAndUserId, formData }: any = useUserFormContext();
  const { setElement } = useBuilderContext();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getDataByIdAndUserId(id, userId);
  }, [id, userId]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  console.log(formData);

  useEffect(() => {
    const parseFormDataContent = () => {
      try {
        const element = JSON.parse(formData?.content || "");
        console.log("this", element);
        setElement(element);
        const readyTimeOut = setTimeout(() => setIsReady(true), 500);

        return () => clearTimeout(readyTimeOut);
      } catch (error) {
        console.error("Error parsing JSON content:", error);
        // Handle the error appropriately, e.g., set a default value for element
        setIsReady(true); // Set isReady to true to avoid an infinite loading loop
      }
    };

    if (formData) {
      parseFormDataContent();
    }
  }, [formData, setElement]);
  if (!isReady) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <ClipLoader />
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/submit/${formData?.shareUrl}`;
  //this
  if (formData?.published === true) {
    return (
      <>
        <NavBar />
        <div className="flex flex-col h-[90vh] items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <p className=" raleway text-3xl font-semibold mb-3">
              Form Published
            </p>
            <p>Share this form</p>

            <div className="max-h-[200px] flex items-center justify-center mt-3">
              <input
                readOnly
                className=" min-w-[450px] border  text-sm h-full border-gray-300  font-normal text-gray-500 placeholder:text-gray-400 rounded-tl-md rounded-bl-md  pl-4 py-2"
                value={shareUrl}
              />
              <button
                title="copy"
                className=" bg-primary text-white  h-full  px-4 rounded-tr-md rounded-br"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast.success("Link Copied");
                }}
              >
                <IoCopyOutline />
              </button>
            </div>
            <div className=" flex w-full justify-center gap-[8em] mt-2">
              <Link to={"/"} className=" underline">
                Go to home
              </Link>
              <Link
                to={`/formDetails/${formData?.formId}`}
                className=" underline"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  //className=" w-[400px] py-3 bg-primary mt-3 rounded-lg text-white manrope  "

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <div className="p-2 w-full flex justify-between items-center bg-white shadow-md">
        <div className="flex gap-3 items-center">
          <Link
            to="/home"
            className="underline text-sm manrope hover:text-primary"
          >
            <MdArrowLeft size={40} />
          </Link>
          <p className="text-lg manrope">
            Title: {formData?.title || "Loading..."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {!formData?.published && (
            <>
              <SaveBtn formId={id} />
              <PublishFormBtn formId={id} />
            </>
          )}
          <PreviewBtn />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex w-full items-center justify-center flex-1 ">
        <DndContext sensors={sensors}>
          <Formbuilder {...formData} />
          <DragOverlayWrapper />
        </DndContext>
      </div>
    </div>
  );
};

export default FormPage;

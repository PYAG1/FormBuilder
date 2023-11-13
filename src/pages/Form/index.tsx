import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { colRef } from "../../../firebase-config";
import NavBar from "../../components/Navigation/NavBar";
import { useUserFormContext } from "../../context/formcontext";
import { Form } from "../../utils/types";
import { MdArrowLeft } from "react-icons/md";
import SaveBtn from "../../components/Form/SaveBtn";
import PreviewBtn from "../../components/Form/PreviewBtn";
import PublishFormBtn from "../../components/Form/PublishFormBtn";
import Formbuilder from "../../components/Form/Formbuilder";
import {DndContext} from '@dnd-kit/core';
import DragOverlayWrapper from "../../components/Form/DragOverlayWrapper";


const FormPage = () => {
  const [formData, setFormData] = useState<Form | null>(null);
  const { id } = useParams();
  const { userId }: any = useUserFormContext();

  const getDataByIdAndUserId = async (id: any, userId: any) => {
    try {
      const q = query(
        colRef,
        where("formId", "==", id),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 0) {
        console.log("No matching documents found.");
        return null;
      }

      const documentData = querySnapshot.docs[0].data();
      //@ts-ignore
      setFormData(documentData);
      console.log("apple", documentData);
    } catch (error) {
      console.error("Error querying data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getDataByIdAndUserId(id, userId);
  }, [id, userId]);

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
          <SaveBtn />
          <PreviewBtn />
          <PublishFormBtn />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex w-full items-center justify-center flex-1 ">
<DndContext>
<Formbuilder {...formData}/>
<DragOverlayWrapper/>
</DndContext>


      </div>
    </div>
  );
};

export default FormPage;

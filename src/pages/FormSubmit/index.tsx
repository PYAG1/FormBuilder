import { getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import { colRef } from "../../../firebase-config";
import { useUserFormContext } from "../../context/formcontext";
import { FormElementInstance, FormElements } from "../../utils/types";
import NavBar from "../../components/Navigation/NavBar";

export default function FormSubmit() {
  const { formurl } = useParams();
  console.log(formurl);
  const { userId }: any = useUserFormContext();

  const [content, setContent] = useState("");
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");

const submitForm = ()=>{

}

const formValues = useRef<{[key:string]:string}>()

const submitValue = (key:string,value:string)=>{
//@ts-ignore
formValues.current[key]= value
}

  const getFormContentByIdAndUserId = async (url: any, userId: any) => {
    try {
      const q = query(
        colRef,
        where("shareUrl", "==", url),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 0) {
        console.log("No matching documents found.");
        return null;
      }

      const documentData = querySnapshot.docs[0].data();
      //@ts-ignore
      setContent(documentData?.content);
      settitle(documentData?.title)
      setdesc(documentData?.desc)

      console.log("apple", documentData);
    } catch (error) {
      console.error("Error querying data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getFormContentByIdAndUserId(formurl, userId);
  }, [formurl]);
  const formContent = content
    ? (JSON.parse(content) as FormElementInstance[])
    : [];
  return (
    <div className=" w-full ">
      <NavBar />
      <div className=" w-full flex justify-center items-center manrope p-16 ">
        
        <div className=" w-[40%]  flex flex-col justify-center space-y-6 ">

            <div>
            <p className=" font-semibold raleway text-2xl">{title}</p>
        <p>{desc}</p>
            </div>
          {formContent.map((ele) => {
            const FormElement = FormElements[ele.type].formComponent;
            return <FormElement key={ele.id} elementInstance={ele} />;
          })}
          <button className="inline-flex w-max justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3  sm:text-sm">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

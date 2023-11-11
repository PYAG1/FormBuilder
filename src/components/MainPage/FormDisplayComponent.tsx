import React, { useEffect } from "react";
import { deleteDoc,doc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import {MdOutlineDeleteOutline} from "react-icons/md"
import { colRef } from "../../../firebase-config";
import { toast } from "react-toastify";
//@ts-ignore
export default function FormDataComponent({
  id,
  formId,
  title,
  published,
  description,
  createdAt,
  deleteForm
}:any) {
  const nav= useNavigate()

  
  return (
    <div className="w-full bg-gray-200 p-5 flex flex-col justify-between rounded-[12px]">
      <div className=" flex justify-between items-center ">
        <p className=" text-xl font-semibold raleway">{title}</p>

        {published === false ? (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800">
            Draft
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
            <svg
              className="-ml-1 mr-1.5 h-2 w-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
            Published
          </span>
        )}
      </div>
      <div className="w-full h-10 manrope text-sm overflow-hidden">
        {description}
      </div>
      <p className=" text-xs mb-2">10 seconds ago</p>
      {!published ? (
<div className=" w-full flex justify-between">
<button className=" w-[80%] py-1 bg-primary text-white rounded-[8px] font-medium" onClick={()=>{
          nav(`/formbuilder/${formId}`)
        }}>
          Edit
        </button>

        <button title="delete" className=" flex justify-center items-center w-[15%] bg-secondary text-primary rounded-[8px] " onClick={() => deleteForm(id)}>

        <p><MdOutlineDeleteOutline size={20} /></p>
        </button>
  </div>
      ) : (
        <button className=" w-full py-1 bg-primary text-white rounded-[8px] ">
          View Submissions
        </button>
      )}
    </div>
  );
}

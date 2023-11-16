import React,{useState} from "react";
import { Form, FormElement, FormElementInstance } from "../../utils/types";
import FormBuilderSideBar from "./FormBuilderSideBar";
import { useDroppable } from "@dnd-kit/core";

export default function Formbuilder(props: Form | null) {
  
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDropArea: true,
    },
  });
  return (
    <div className="grid md:grid-cols-[2.5fr,1.5fr] lg:grid-cols-[3fr,1fr] w-full h-full ">
      <div className="  h-full md:p-5   ">
        <div
          ref={droppable.setNodeRef}
          className={`overflow-y-auto w-full h-full bg-gray-200 ${
            droppable?.isOver && "ring-2 ring-primary/20"
          }`}
        >
          {!droppable?.isOver && <p>Drop Here</p>}
        </div>
        {droppable.isOver && (
          <div className="w-full p-4">
            <div className="h-[120px] rounded-md bg-primary/20"></div>
          </div>
        )}
      </div>
      <div className=" bg-white h-full">
        <FormBuilderSideBar />
      </div>
    </div>
  );
}

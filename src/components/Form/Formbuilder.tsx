import React, { useState } from "react";
import {
  ElementType,
  Form,
  FormElement,
  FormElementInstance,
  FormElements,
} from "../../utils/types";
import FormBuilderSideBar from "./FormBuilderSideBar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useUserFormContext } from "../../context/formcontext"
import { useBuilderContext } from "../../context/designerContext";

export default function Formbuilder(props: Form | null) {
  const { elements, addElement }: any = useBuilderContext();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(
          Math.floor(Math.random() * 1000000).toString()
        );
        addElement(0, newElement);
      }
    },
  });

  console.log("apple", elements);

  return (
    <div className="grid md:grid-cols-[2.5fr,1.5fr] lg:grid-cols-[3fr,1fr] w-full h-full ">
      <div className="  h-full md:p-5   ">
        <div
          ref={droppable.setNodeRef}
          className={`overflow-y-auto w-full h-full bg-gray-200 ${
            droppable?.isOver && "ring-2 ring-primary/20"
          }`}
        >
          {!droppable?.isOver && elements.length === 0 && <p>Drop Here</p>}
          {droppable.isOver && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className=" flex flex-col gap-4 p-2 ">
              {elements.map((item) => {
                return <DesignerElementWrapper key={item.id} element={item} />;
              })}
            </div>
          )}
        </div>
      </div>
      <div className=" bg-white h-full">
        <FormBuilderSideBar />
      </div>
    </div>
  );
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const DesignerElement = FormElements[element.type].designerComponet;

  return <DesignerElement elementInstance={element} />;
}

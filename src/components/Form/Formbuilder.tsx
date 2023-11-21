import React, { useState } from "react";
import {
  ElementType,
  Form,
  FormElementInstance,
  FormElements,
} from "../../utils/types";
import FormBuilderSideBar from "./FormBuilderSideBar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

import { useBuilderContext } from "../../context/designerContext";
import { FaTrash } from "react-icons/fa";

export default function Formbuilder(props: Form | null) {
  const { elements, addElement, selectedElement,setSelectedElement}: any = useBuilderContext();

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

  console.log("apple",selectedElement);

  return (
    <div className="grid md:grid-cols-[2.5fr,1.5fr] lg:grid-cols-[3fr,1fr] w-full h-full ">
      <div className="  h-full md:p-5   "
      onClick={()=>{
  setSelectedElement(null)
      }}>
        <div
          ref={droppable.setNodeRef}
          className={`overflow-y-auto w-full h-full bg-gray-200 ${
            droppable?.isOver && "ring-2 ring-primary/20"
          }`}
        >
          {!droppable?.isOver && elements.length === 0 && <p>Drop Here</p>}
          {droppable.isOver && elements.length === 0  && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className=" flex flex-col gap-4 p-2 ">
              {elements.map((item: any) => {
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
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const BottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-hnadler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if(draggable.isDragging) return null;
  const { removeElement ,selectedElement,setSelectedElement}: any = useBuilderContext();

  const DesignerElement = FormElements[element.type].designerComponet;

  console.log("selected",selectedElement)
  
  return (
    <div
      className="relative h-[120px] flex flex-col hover:cursor-pointer rounded-md ring-1 ring-primary ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onClick={(e)=>{
        e.stopPropagation()
        setSelectedElement(element)
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-md"
      ></div>
      <div
        ref={BottomHalf.setNodeRef}
        className="absolute w-full h-1/2 bottom-0 rounded-b-md"
      ></div>
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <button
              title="delete"
              className="flex w-[50px] justify-center items-center h-full border rounded-md rounded-l-none bg-red-500"
              onClick={(e) => {
e.stopPropagation()
                removeElement(element.id);
              }}
            >
              <FaTrash />
            </button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-sm">Click for properties or drag to move</p>
          </div>
        </>
      )}


{
  topHalf.isOver && (
    <div className=" absolute top-0 w-full rounded-md h-[3px] bg-primary">
      </div>
  )
}
      <div
        className={`flex w-full h-[120px] items-center rounded-md py-2 pointer-events-none ${
          mouseIsOver && "opacity-30"
        } 
        `}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {
  BottomHalf.isOver && (
    <div className=" absolute bottom-0 w-full rounded-md h-[3px] bg-primary">
      </div>
  )
}
    </div>
  );
}

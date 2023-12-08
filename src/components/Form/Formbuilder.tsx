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
  const { elements, addElement, removeElement, setSelectedElement }: any =
    useBuilderContext();

  const idGenerator = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };
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

      const isDroppingDesignerDropArea = over.data?.current?.isDropArea;
      //dropping a sidebar button element
      if (isDesignerBtnElement && isDroppingDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(
          idGenerator()
        );
        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;

      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const droppingSidebarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      // Second scenario
      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementType].construct(
          idGenerator()
        );

        const overId = over.data?.current?.elementId;
        console.log(overId);

        const overElementIndex = elements.findIndex((el) => el.id === overId);
        console.log(elements);

        console.log("new", overElementIndex);

        if (overElementIndex === -1) {
          throw new Error("element not found");
        }

        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }
      //3rd
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <div className="grid md:grid-cols-[2.5fr,1.5fr] lg:grid-cols-[3fr,1fr] w-full h-full ">
      <div
        className="  h-full md:p-5   "
        onClick={() => {
          setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={`overflow-y-auto w-full h-full bg-gray-200 ${
            droppable?.isOver && "ring-2 ring-primary/20 ring-inset"
          }`}
        >
          {!droppable?.isOver && elements.length === 0 && <p>Drop Here</p>}
          {droppable.isOver && elements.length === 0 && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className=" flex flex-col gap-4 p-2">
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

  if (draggable.isDragging) return null;
  const { removeElement, selectedElement, setSelectedElement }: any =
    useBuilderContext();

  const DesignerElement = FormElements[element.type].designerComponet;

  return (
    <div
      className="relative  flex flex-col hover:cursor-pointer rounded-md ring-1 ring-primary ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-md top-0 p-0"
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
                e.stopPropagation();
                removeElement(element.id);
                setSelectedElement(null);
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

      {topHalf.isOver && (
        <div className=" absolute top-0 w-full rounded-md h-[3px] p-0 bg-primary"></div>
      )}
      <div
        className={`flex w-full h-max items-center rounded-md  pointer-events-none ${
          mouseIsOver && "opacity-30"
        } 
        `}
      >
        <div className=" h-full bg-black w-full">
          <DesignerElement elementInstance={element} />
        </div>
      </div>
      {BottomHalf.isOver && (
        <div className=" absolute bottom-0 w-full rounded-md h-[3px] bg-primary"></div>
      )}
    </div>
  );
}

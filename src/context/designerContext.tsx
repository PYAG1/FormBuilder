import { ReactNode, createContext, useContext, useState } from "react";
import { FormElementInstance } from "../utils/types";
import { Dispatch } from "react";

interface DesignerContextType {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  selectedElement:FormElementInstance | null;
  setSelectedElement:React.Dispatch<React.SetStateAction<FormElementInstance | null>>
}

const BuilderContext = createContext<DesignerContextType | null>(null);

export const useBuilderContext = () => {
  return useContext(BuilderContext);
};

export const BuilderProvider = ({ children }: { children: ReactNode }) => {
  const [elements, setElement] = useState<FormElementInstance[]>([]);
  const [selectedElement,setSelectedElement]= useState<FormElementInstance | null>(null)
  const addElement = (index: number, element: FormElementInstance) => {
    setElement((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElement((prev) => prev.filter((element) => element.id !== id));
  };

  return (
    <BuilderContext.Provider value={{ elements, addElement, removeElement,selectedElement,setSelectedElement }}>
      {children}
    </BuilderContext.Provider>
  );
};
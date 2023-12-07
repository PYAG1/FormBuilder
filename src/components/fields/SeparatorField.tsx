import { RiSeparator } from "react-icons/ri";
import {
  ElementType,
  FormElement,
  FormElementInstance,
} from "../../utils/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useBuilderContext } from "../../context/designerContext";

const type: ElementType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: RiSeparator,
    label: "Separator",
  },
  designerComponet: DesignerComponent,
  //@ts-ignore
  formComponent: FormComponent,
  propComponent: PropertyComponent,

  validate: () => true,
};

function DesignerComponent() {
  return (
    <div className="text-primary manrope bg-white flex flex-col gap-2 w-full p-2 h-full ">
      <label className="capitalize font-semibold">Separator</label>
      <div className="border-b border-primary my-2"></div>
    </div>
  );
}

function FormComponent() {
  return <div className="border-b border-primary my-2"></div>;
}

function PropertyComponent() {
  return <p>No properties</p>;
}

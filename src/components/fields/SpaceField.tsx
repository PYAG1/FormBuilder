import { LuSeparatorHorizontal } from "react-icons/lu";
import {
  ElementType,
  FormElement,
  FormElementInstance,
} from "../../utils/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useBuilderContext } from "../../context/designerContext";
import { Slider } from "@mui/material";


const type: ElementType = "SpacerField";

const extra = {
height:20
};

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extra,
  }),
  designerBtnElement: {
    icon: LuSeparatorHorizontal,
    label: "Spacer Field",
  },
  designerComponet: DesignerComponent,
  //@ts-ignore
  formComponent: FormComponent,
  propComponent: PropertyComponent,

  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  extra: typeof extra;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { height  } = element.extra;
  return (
    <div className=" text-primary manrope bg-white flex flex-col gap-2 w-full p-2 h-full items-center ">
      <label className=" capitalize font-semibold  ">
        Spacer Field Height: {height}px
      </label>
   
   <LuSeparatorHorizontal className="h-8 w-8"/>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;

}) {
  const element = elementInstance as CustomInstance;
  const {height} = element.extra;

  return <div style={{height,width:"100%"}}></div>
  
}
function PropertyComponent({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) {
    const element = elementInstance as CustomInstance;
  
    const { updateElement }: any = useBuilderContext();
  
    const validationSchema = Yup.object({
      height: Yup.number().min(5).max(200).required("Required"),
    });
  
    const { height } = element.extra;
    const formik = useFormik({
      initialValues: {
        height: height || 0,
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        applyChanges(values);
      },
    });
  
    useEffect(() => {
      formik.resetForm();
    }, [element]);
  
    function applyChanges(values: any) {
      updateElement(element.id, {
        ...element,
        extra: {
          height: values.height,
        },
      });
    }
  
    return (
      <div>
        <form className="pr-5 space-y-5">
          <div className="space-y-3">
            <label htmlFor="height">Height (px): {formik.values.height}</label>
            <Slider
              size="small"
              defaultValue={formik.values.height}
              min={5}
              max={200}
              step={1}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(event, value) => formik.setFieldValue('height', value)}
            />
  
            <p className="text-xs text-gray-600">
              This serves as the label of the text input.
            </p>
          </div>
  
          <button type="submit" onClick={() => formik.handleSubmit()}>
            Update
          </button>
        </form>
      </div>
    );
  }
  
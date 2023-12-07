import { LuHeading2 } from "react-icons/lu";
import {
  ElementType,
  FormElement,
  FormElementInstance,
} from "../../utils/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useBuilderContext } from "../../context/designerContext";


const type: ElementType = "SubTitleField";
//   <SideBarBtnElements formElement={FormElements.SubTitleField}/>
const extra = {
  Subtitle: "SubTitleField",
};

export const SubTitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extra,
  }),
  designerBtnElement: {
    icon: LuHeading2,
    label: "SubTitle Field",
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
  const { Subtitle } = element.extra;
  return (
    <div className=" text-primary manrope bg-white flex flex-col gap-2 w-full p-2 h-full ">
      <label className=" capitalize text-xl font-semibold  ">
        Subtitle Field
      </label>
      <p className=" text-xl ">{Subtitle}</p>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
  submitValue: any;
}) {
  const element = elementInstance as CustomInstance;
  const { Subtitle } = element.extra;

  return <p className="text-primary manrope">{Subtitle}</p>;
}

function PropertyComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { updateElement }: any = useBuilderContext();

  const validationSchema = Yup.object({
    Subtitle: Yup.string().min(4).max(50).required("Required"),
  });

  const { Subtitle } = element.extra;
  const formik = useFormik({
    initialValues: {
      Subtitle: Subtitle || "",
    
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
        Subtitle: values.Subtitle,
    
      },
    });
  }

  return (
    <div>
      <form className="pr-5 space-y-5" onBlur={formik.handleSubmit}>
        <div className="space-y-3">
          <label htmlFor="Subtitle">SubTitle</label>
          <input
            type="text"
            value={formik.values.Subtitle}
            id="Subtitle"
            name="Subtitle"
            onChange={formik.handleChange}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="border w-full border-gray-300 text-base font-normal placeholder:text-gray-400 rounded-md ring-primary focus:ring-primary focus:border-primary pl-4 py-2"
          />
          <p className=" text-xs text-gray-600">
            This serves as the label of the text input.
          </p>
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

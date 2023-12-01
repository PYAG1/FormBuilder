import { MdTextFields } from "react-icons/md";

import {
  ElementType,
  FormElement,
  FormElementInstance,
} from "../../utils/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState,useTransition } from "react";
import { useBuilderContext } from "../../context/designerContext";
import TextField from "../../core-ui/text-field";
import ExclamationCircleIcon from "@heroicons/react/24/solid/ExclamationCircleIcon";

const type: ElementType = "TextField";

const extra = {
  label: "help",
  placeholder: "hi there",
  helperText: "Ho there",
  required: false,
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extra,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponet: DesignerComponent,
  formComponent: FormComponent,
  propComponent: PropertyComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extra.required) {
      return currentValue.length > 0;
    }
    return true;
  },
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
  const { label, placeholder, required, helperText } = element.extra;
  return (
    <div className=" text-primary manrope bg-white flex flex-col gap-2 w-full p-2 ">
      <label className=" capitalize text-2xl font-semibold  ">
        {label}
        {required && "*"}
      </label>
      <input
        className="border w-full border-gray-300 text-base font-normal placeholder:text-gray-400 rounded-md  ring-primary focus:ring-primary focus:border-primary pl-4 py-2"
        type={type}
        readOnly
        disabled
        placeholder={placeholder}
      />
      {helperText && <p className="text-sm">{helperText}</p>}
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue
}: {
  elementInstance: FormElementInstance;
  submitValue: any;
  isInvalid?: boolean;
  defaultValue?:string
}) {
  const element = elementInstance as CustomInstance;
  const { label, placeholder, required, helperText } = element.extra;




  const [value, setvalue] = useState(defaultValue || "");
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);
  return (
    <div className=" text-primary manrope bg-white flex flex-col gap-2 w-full p-2 mb-2 ">
      <label className=" capitalize text-xl ">
        {label}
        {required && "*"}
      </label>
      <div className=" relative">
        <input
          className={`border w-full  text-base font-normal  rounded-md  ring-primary focus:ring-primary focus:border-primary pl-4 py-2 ${error ?"border-[red] placeholder:text-red-400" :"border-gray-300 placeholder:text-gray-400"}`}
          type={type}
          onChange={(e) => {
            setvalue(e.target.value);
          }}
          onBlur={(e) => {
            if (!submitValue) return; 
            const valid = TextFieldFormElement.validate(
              element,
              e.target.value
            );
            setError(!valid);
            if (!valid) return;
            submitValue(element.id, e.target.value);
          }}
          placeholder={placeholder}
          value={value}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {helperText && <p className="text-sm">{helperText}</p>}
    </div>
  );
}

function PropertyComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { updateElement }: any = useBuilderContext();

  const validationSchema = Yup.object({
    label: Yup.string().min(4).max(50).required("Label is required"),
    placeholder: Yup.string().max(50),
    helperText: Yup.string().max(200),
    required: Yup.boolean(),
  });

  const { label, placeholder, required, helperText } = element.extra;
  const formik = useFormik({
    initialValues: {
      label: label || "",
      helperText: helperText || "",
      required: required || false,
      placeholder: placeholder || "",
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
        label: values.label,
        helperText: values.helperText,
        required: values.required,
        placeholder: values.placeholder,
      },
    });
  }

  return (
    <div>
      <form className="pr-5 space-y-5" onBlur={formik.handleSubmit}>
        <div className="space-y-3">
          <label htmlFor="label">Label</label>
          <input
            type="text"
            value={formik.values.label}
            id="label"
            name="label"
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

        <div className="space-y-3">
          <label htmlFor="placeholder">Placeholder</label>
          <input
            type="text"
            value={formik.values.placeholder}
            id="placeholder"
            onChange={formik.handleChange}
            className="border w-full border-gray-300 text-base font-normal placeholder:text-gray-400 rounded-md ring-primary focus:ring-primary focus:border-primary pl-4 py-2"
          />
          <p className=" text-xs text-gray-600">
            This is a temporary text shown in the input field when it is empty.
          </p>
        </div>

        <div className="space-y-3">
          <label htmlFor="helperText">Hint</label>
          <input
            type="text"
            value={formik.values.helperText}
            id="helperText"
            onChange={formik.handleChange}
            className="border w-full border-gray-300 text-base font-normal placeholder:text-gray-400 rounded-md ring-primary focus:ring-primary focus:border-primary pl-4 py-2"
          />
          <p className=" text-xs text-gray-600">
            This provides additional information or context for the input.
          </p>
        </div>

        <div className=" flex  gap-3">
          <label htmlFor="checkbox">Required</label>
          <input
            type="checkbox"
            id="required"
            checked={formik.values.required}
            onChange={formik.handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

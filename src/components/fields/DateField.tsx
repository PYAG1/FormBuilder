
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


import {
  ElementType,
  FormElement,
  FormElementInstance,
} from "../../utils/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState,useTransition } from "react";
import { useBuilderContext } from "../../context/designerContext";
import ExclamationCircleIcon from "@heroicons/react/24/solid/ExclamationCircleIcon";
import { BsCalendar,BsFillCalendarDateFill } from "react-icons/bs";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';


const type: ElementType = "DateField";

const extra = {
  label: " Date Field",
  helperText: "Pick a date",
  required: false,
};

export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extra,
  }),
  designerBtnElement: {
    icon: BsFillCalendarDateFill,
    label: "Date Field",
  },
  designerComponet: DesignerComponent,
  //@ts-ignore
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
  const { label, required, helperText } = element.extra;
  return (
    <div className=" text-primary manrope bg-white flex flex-col gap-2 w-full p-2 h-[120px] ">
      <label className=" capitalize text-base font-semibold  ">
        {label}
        {required && "*"}
      </label>
  <button className=" w-full flex items-center gap-2 justify-start text-left border-gray-300 py-2 border-solid border-[1.5px] rounded-md px-1">
    <BsCalendar />
    <span>Pick a date</span>
  </button>
      {helperText && <p className="text-sm">{helperText}</p>}
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,

}: {
  elementInstance: FormElementInstance;
  submitValue: any;
  isInvalid?: boolean;
  defaultValue?:string
}) {
  const element = elementInstance as CustomInstance;
  const { label,  required, helperText } = element.extra;




  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="text-primary manrope bg-white flex flex-col gap-2 w-full p-2 mb-2 ">
    <label className="capitalize text-sm ">
      {label}
      {required && "*"}
    </label>
    <button
      aria-describedby={id}
      onClick={handleClick}
      className="w-full flex items-center gap-2 justify-start text-left border-gray-300 py-2 border-solid border-[1.5px] rounded-md px-1"
    >
      <BsCalendar />
      {value ? <p>{value.toString()}</p> : <span>Pick a date</span>}

    </button>
    <div className="relative">
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
<DateCalendar
  value={value}
  onChange={(date) => {
    const formattedDate = dayjs(date).isValid() ? dayjs(date) : null;
    setValue(formattedDate);
    if(!submitValue) return;
    const val= value?.toString() || ""
    const valid= DateFieldFormElement.validate(element,val)
    setError(!valid)
    submitValue(element.id, formattedDate ? formattedDate.toString() : '');
  }}
/>


      </Popover>
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
    helperText: Yup.string().max(200),
    required: Yup.boolean(),
  });

  const { label, required, helperText } = element.extra;
  const formik = useFormik({
    initialValues: {
      label: label || "",
      helperText: helperText || "",
      required: required || false,
 
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
 
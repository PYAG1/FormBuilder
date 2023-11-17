import { MdTextFields } from "react-icons/md";
import {
  ElementType,
  FormElement,
  FormElementInstance,
} from "../../utils/types";

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
  formComponent: () => <div>Pear </div>,
  propComponent: () => <div>Banana</div>,
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

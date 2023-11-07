
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { TextAreaFieldTypes } from "./types";




export default function TextAreaField({
    values,
    id,
    touched,
    errors,
    handleBlur,
    handleChange,
    label,
    placeholder,
}: TextAreaFieldTypes) {
   //@ts-ignore
    return (
        <div className="flex flex-col gap-y-1 w-full ">
            <label htmlFor={id} className="block text-sm font-manrope">
                {label}
            </label>
            <div className="relative mt-1.5">
        
                <textarea
                    className="border w-full h-20 border-gray-300 text-base font-normal placeholder:text-gray-400 rounded-md ring-primary focus:ring-primary focus:border-primary pl-4 py-2"
                    id={id}
                    name={id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[id]}
                    placeholder={placeholder}
                ></textarea>
                {errors[id] && touched[id] && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                        />
                    </div>
                )}
            </div>
            {errors[id] && touched[id] ? (
                <p className="text-sm text-red-600" id={`${id}-error`}>
                    {errors[id]}.
                </p>
            ) : null}
        </div>
    );
}
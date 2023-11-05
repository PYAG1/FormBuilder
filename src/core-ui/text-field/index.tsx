import {TextFieldTypes} from './types'
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
export default function TextField({
    values,
    id,
    touched,
    errors,
    handleBlur,
    handleChange,
    label,
    type,
    placeholder,
  }: TextFieldTypes) {
    return (
      <div className="flex flex-col gap-y-1">
        <label htmlFor="fullName" className="block text-sm font-manrope">
          {label}
        </label>
        <div className="relative mt-1.5 ">
          <input
            className="border w-full border-gray-300 text-base font-normal placeholder:text-gray-400 rounded-md  ring-primary focus:ring-primary focus:border-primary pl-4 py-2"
            type={type}
            id={id}
            name={id}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[id]}
            placeholder={placeholder}
          />
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
          <p className=" text-sm text-red-600" id={`${id}-error`}>
            {errors[id]}.
          </p>
        ) : null}
      </div>
    );
  }
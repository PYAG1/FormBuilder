export interface TextFieldTypes {
    values: any;
    touched: any;
    errors: any;
    type: "text" | "number"| "password";
    id: string;
    handleChange: any;
    handleBlur: any;
    placeholder: string;
    label: string;
  }
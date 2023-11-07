export interface TextAreaFieldTypes {
    values: any;
    touched: any;
    errors: any;
    id: string;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    label: string;
}

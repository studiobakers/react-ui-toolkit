import "./_form-field.scss";
import React from "react";
export interface FormFieldProps {
    children: React.ReactNode;
    label?: string;
    labelledBy?: string;
    labelFor?: string;
    customClassName?: string;
    helperMessages?: string[];
    errorMessages?: string[];
    testid?: string;
}
declare function FormField(props: FormFieldProps): import("react/jsx-runtime").JSX.Element;
export default FormField;

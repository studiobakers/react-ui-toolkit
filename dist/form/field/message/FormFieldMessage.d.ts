/// <reference types="react" />
import "./_form-field-message.scss";
export interface FormFieldMessageProps {
    type: "error" | "warning" | "helper";
    customClassName?: string;
    message?: string;
    testid?: string;
}
declare function FormFieldMessage({ customClassName, type, message, testid }: FormFieldMessageProps): JSX.Element;
export default FormFieldMessage;

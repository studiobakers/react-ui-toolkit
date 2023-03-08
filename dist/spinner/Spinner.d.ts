/// <reference types="react" />
import "./_spinner.scss";
export interface SpinnerProps {
    color?: string;
    customClassName?: string;
}
declare function Spinner({ color, customClassName }: SpinnerProps): JSX.Element;
export default Spinner;

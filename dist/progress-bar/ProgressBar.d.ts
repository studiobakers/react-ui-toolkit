import "./_progress-bar.scss";
import React from "react";
export interface ProgressBarProps {
    percentage: number;
    style?: {
        trackColor?: string;
        backgroundColor?: string;
        completedColor?: string;
    };
    ariaLabelledBy?: string;
    ariaLabel?: string;
    ariaValueText?: string;
    ariaDescribedBy?: string;
    title?: string;
    children?: React.ReactNode;
    customClassName?: string;
    testid?: string;
}
declare function ProgressBar(props: ProgressBarProps): JSX.Element;
export default ProgressBar;

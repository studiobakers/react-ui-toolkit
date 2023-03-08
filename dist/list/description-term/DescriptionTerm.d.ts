import "./_description-term.scss";
import React from "react";
export interface DescriptionTermProps {
    title: string;
    description: React.ReactNode;
    id?: string;
    customClassNames?: {
        container?: string;
        title?: string;
        description?: string;
    };
    role?: string;
    testid?: string;
}
declare const DescriptionTerm: React.ForwardRefExoticComponent<DescriptionTermProps & React.RefAttributes<HTMLDivElement>>;
export default DescriptionTerm;

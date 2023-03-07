import "./_description-term.scss";

import React from "react";
import classNames from "classnames";

export interface DescriptionTermProps {
  title: string;
  description: React.ReactNode;
  id?: string;
  customClassNames?: {container?: string; title?: string; description?: string};
  role?: string;
  testid?: string;
}

const DescriptionTerm = React.forwardRef<HTMLDivElement, DescriptionTermProps>(
  ({id, title, description, customClassNames, testid, role}, ref) => {
    const {
      container: containerClassName,
      title: titleClassName,
      description: descriptionClassName
    } = customClassNames || {};

    return (
      <div
        ref={ref}
        className={containerClassName}
        data-testid={testid}
        id={id}
        role={role}
      >
        <dt className={classNames("description-term__title", titleClassName)}>{title}</dt>

        <dd className={classNames("description-term__description", descriptionClassName)}>
          {description}
        </dd>
      </div>
    );
  }
);

export default DescriptionTerm;

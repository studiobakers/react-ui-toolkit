import "./_description-term.scss";

import React from "react";
import classNames from "classnames";

interface DescriptionTermProps {
  testid?: string;
  title: string;
  description: React.ReactNode;
  descriptionFirst?: boolean;
  customTitleClassName?: string;
  customDescriptionClassName?: string;
  id?: string;
  role?: string;
  descriptionTermRef?: React.RefObject<HTMLDivElement>;
}

function DescriptionTerm({
  id,
  title,
  description,
  descriptionFirst,
  testid,
  customTitleClassName,
  customDescriptionClassName,
  role,
  descriptionTermRef
}: DescriptionTermProps) {
  const titleComponent = (
    <dt className={classNames("description-term__title", customTitleClassName)}>
      {title}
    </dt>
  );
  const descriptionComponent = (
    <dd
      className={classNames("description-term__description", customDescriptionClassName)}>
      {description}
    </dd>
  );
  const [first, second] = descriptionFirst
    ? [descriptionComponent, titleComponent]
    : [titleComponent, descriptionComponent];

  return (
    <div ref={descriptionTermRef} data-testid={testid} id={id} role={role}>
      {first}
      {second}
    </div>
  );
}

export default DescriptionTerm;

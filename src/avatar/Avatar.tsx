import "./_avatar.scss";

import React, {useState} from "react";
import classNames from "classnames";

export interface AvatarProps {
  alt: string;
  size?: {
    width: string;
    height: string;
  };
  placeholderSrc: string;
  src?: string | null;
  customClassName?: string;
}

function Avatar({alt, size, src, customClassName, placeholderSrc}: AvatarProps) {
  const [shouldDisplayPlaceholder, setPlaceholderVisibility] = useState(true);

  return (
    <img
      src={shouldDisplayPlaceholder ? placeholderSrc : src || placeholderSrc}
      alt={alt}
      style={{...size}}
      className={classNames("avatar", customClassName)}
      onLoad={handleHidePlaceholder}
    />
  );

  function handleHidePlaceholder() {
    setPlaceholderVisibility(false);
  }
}

export default Avatar;

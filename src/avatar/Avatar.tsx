import "./_avatar.scss";

import React, {useState} from "react";
import classNames from "classnames";

export interface AvatarProps {
  alt: string;
  placeholderSrc: string;
  size?: {
    width: string;
    height: string;
  };
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
      onLoad={handleImageLoad}
    />
  );

  function handleImageLoad() {
    setPlaceholderVisibility(false);
  }
}

export default Avatar;

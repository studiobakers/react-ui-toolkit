import UserPlaceholder from "../ui/assets/images/user-placeholder.png";

import "./_avatar.scss";

import React, {useState} from "react";
import classNames from "classnames";

export interface AvatarProps {
  alt: string;
  size?: {
    width: string;
    height: string;
  };
  src?: string | null;
  customClassName?: string;
}

function Avatar({alt, size, src, customClassName}: AvatarProps) {
  const [shouldDisplayPlaceholder, setPlaceholderVisibility] = useState(true);

  return (
    <img
      src={shouldDisplayPlaceholder ? UserPlaceholder : src || UserPlaceholder}
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

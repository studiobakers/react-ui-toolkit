import "./_avatar.scss";

import React from "react";
import classNames from "classnames";

export interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  customClassName?: string;
}

function Avatar({alt, size, src, customClassName}: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      style={size ? {width: `${size}px`, height: `${size}px`} : undefined}
      className={classNames("avatar", customClassName)}
    />
  );
}

export default Avatar;

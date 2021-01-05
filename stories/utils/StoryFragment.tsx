import "../../src/ui/reference/_colors.scss";
import "../../src/ui/reference/_measurement.scss";
import "../../src/ui/reference/_animation.scss";

import React, {Fragment} from "react";

interface StoryFragmentProps {
  children: React.ReactNode;
}

function StoryFragment({children}: StoryFragmentProps) {
  return <Fragment>{children}</Fragment>;
}

export default StoryFragment;

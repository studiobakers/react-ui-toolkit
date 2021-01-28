import UserPlaceholder from "../src/ui/assets/images/user-placeholder.png";

import {storiesOf} from "@storybook/react";
import React, {Fragment} from "react";

import Avatar from "../src/avatar/Avatar";

storiesOf("Avatar", module).add("Avatar", () => (
  <Fragment>
    <Avatar
      alt="user1's avatar"
      src={UserPlaceholder}
      size={{width: "150px", height: "150px"}}
    />

    <Avatar alt="user2's avatar" src={UserPlaceholder} />

    <Avatar
      alt="user3's avatar"
      src={UserPlaceholder}
      size={{width: "50px", height: "50px"}}
    />
  </Fragment>
));

import {storiesOf} from "@storybook/react";
import React, {Fragment} from "react";

import Avatar from "../src/avatar/Avatar";

const UserPlaceholder = require("../src/ui/assets/images/user-placeholder.png");

storiesOf("Avatar", module).add("Avatar", () => (
  <Fragment>
    <Avatar
      placeholderSrc={UserPlaceholder}
      alt="user1's avatar"
      src={"https://picsum.photos/150/150"}
      size={{width: "150px", height: "150px"}}
    />

    <Avatar
      alt="user2's avatar"
      placeholderSrc={UserPlaceholder}
      src={"https://picsum.photos/100/100"}
    />

    <Avatar
      alt="user3's avatar"
      src={"https://picsum.photos/50/50"}
      placeholderSrc={UserPlaceholder}
      size={{width: "50px", height: "50px"}}
    />
  </Fragment>
));

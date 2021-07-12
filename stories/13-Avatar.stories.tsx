import {storiesOf} from "@storybook/react";
import React, {Fragment} from "react";

import Avatar from "../src/avatar/Avatar";

storiesOf("Avatar", module).add("Avatar", () => (
  <Fragment>
    <Avatar alt="user1's avatar" src={"https://picsum.photos/150/150"} size={150} />

    <Avatar alt="user2's avatar" src={"https://picsum.photos/100/100"} />

    <Avatar alt="user3's avatar" src={"https://picsum.photos/50/50"} size={50} />
  </Fragment>
));

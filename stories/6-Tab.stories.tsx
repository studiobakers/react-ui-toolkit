import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import Tab, {TabItem} from "../src/tab/Tab";

const tabItems: TabItem[] = [
  {
    id: "home",
    children: "Home"
  },
  {
    id: "following",
    children: "Following"
  }
];

storiesOf("Tab", module).add("Tab", () => (
  <Fragment>
    <Tab items={tabItems}>{[<div>{"Home"}</div>, <div>{"Following"}</div>]}</Tab>
  </Fragment>
));

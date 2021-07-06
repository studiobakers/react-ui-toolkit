import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import Tab, {TabItem} from "../src/tab/Tab";

const tabItems: TabItem[] = [
  {
    id: "home",
    content: "Home"
  },
  {
    id: "following",
    content: "Following"
  },
  {
    id: "disabled-tab",
    content: "Disabled",
    isDisabled: true
  }
];

storiesOf("Tab", module).add("Tab", () => (
  <Fragment>
    <Tab items={tabItems}>
      {[
        <div key={0}>{"Home"}</div>,
        <div key={1}>{"Following"}</div>,
        <div key={2}>{"Disabled"}</div>
      ]}
    </Tab>
  </Fragment>
));

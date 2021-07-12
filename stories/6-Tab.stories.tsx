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
        <div key={0}>{"Content of the Home tab"}</div>,
        <div key={1}>{"Content of the Following tab"}</div>,
        <div key={2}>{"Content of the Disabled tab"}</div>
      ]}
    </Tab>
  </Fragment>
));

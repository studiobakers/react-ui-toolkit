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
  }
];

storiesOf("Tab", module).add("Tab", () => (
  <Fragment>
    <Tab
      items={tabItems}
      onTabChange={(index) => {
        console.log("tab changed to index: ", index);
      }}>
      {[<div key={0}>{"Home"}</div>, <div key={1}>{"Following"}</div>]}
    </Tab>
  </Fragment>
));

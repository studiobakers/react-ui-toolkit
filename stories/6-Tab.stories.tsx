import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import Tab, {TabItem} from "../src/tab/Tab";
import Button from "../src/button/Button";
import StateProvider from "./utils/StateProvider";

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
    <p>Uncontrolled Tab</p>
    <Tab items={tabItems} initialActiveTabIndex={1}>
      {[<div key={0}>{"Home"}</div>, <div key={1}>{"Following"}</div>]}
    </Tab>
    <br />
    <br />
    <StateProvider initialState={0}>
      {(state, setState) => (
        <div>
          <p>Controlled Tab</p>
          <div style={{display: "flex"}}>
            <Button
              onClick={() => setState(Math.max(0, (state - 1) % 2))}
              isDisabled={state === 0}>
              Previous Tab
            </Button>
            <Button onClick={() => setState((state + 1) % 2)} isDisabled={state === 1}>
              Next Tab
            </Button>
          </div>
          <Tab
            items={tabItems}
            activeTabIndex={state}
            onTabChange={(index) => {
              console.log("tab changed to index: ", index);
              setState(index);
            }}>
            {[<div key={0}>{"Home"}</div>, <div key={1}>{"Following"}</div>]}
          </Tab>
        </div>
      )}
    </StateProvider>
  </Fragment>
));

import {storiesOf} from "@storybook/react";
import React from "react";

import {Toggle} from "../src/toggle/Toggle";

storiesOf("Toggle", module)
  .add("Toggle States", () => {
    return (
      <div style={{width: "500px"}}>
        <span>{"Switch Toggle - 2 Options"}</span>
        <Toggle onToggle={(e) => console.log(e)}>
          <Toggle.Item id={"on"}>{"On"}</Toggle.Item>
          <Toggle.Item id={"off"}>{"Off"}</Toggle.Item>
        </Toggle>

        <br />

        <span>{"Swtich Toggle - Disabled"}</span>

        <Toggle isDisabled={true} onToggle={(e) => console.log(e)}>
          <Toggle.Item id={"mobile"}>{"Mobile"}</Toggle.Item>
          <Toggle.Item id={"tablet"}>{"Tablet"}</Toggle.Item>
          <Toggle.Item id={"notebook"}>{"Notebook"}</Toggle.Item>
          <Toggle.Item id={"desktop"}>{"Desktop"}</Toggle.Item>
        </Toggle>

        <br />

        <span>{"Toggle - Disabled Item"}</span>

        <Toggle onToggle={(e) => console.log(e)}>
          <Toggle.Item id={"mobile"}>{"Mobile"}</Toggle.Item>
          <Toggle.Item isDisabled={true} id={"tablet"}>
            {"Tablet"}
          </Toggle.Item>
          <Toggle.Item id={"notebook"}>{"Notebook"}</Toggle.Item>
          <Toggle.Item id={"desktop"}>{"Desktop"}</Toggle.Item>
        </Toggle>
      </div>
    );
  })
  .add("Toggle Multiple", () => (
    <div style={{width: "500px"}}>
      <span>{"Toggle - Multiple"}</span>

      <Toggle isMultiple={true} onToggle={(e) => console.log(e)}>
        <Toggle.Item id="react">{"React"}</Toggle.Item>
        <Toggle.Item id="vue">{"Vue"}</Toggle.Item>
        <Toggle.Item id="angular">{"Angular"}</Toggle.Item>
      </Toggle>

      <br />

      <span>{"Toggle - Vertically"}</span>

      <Toggle
        customClassName={"toggle-vertically"}
        isMultiple={true}
        position={"vertical"}
        onToggle={(e) => console.log(e)}>
        <Toggle.Item id={"mobile"}>{"Mobile"}</Toggle.Item>
        <Toggle.Item id={"tablet"}>{"Tablet"}</Toggle.Item>
        <Toggle.Item id={"notebook"}>{"Notebook"}</Toggle.Item>
        <Toggle.Item id={"desktop"}>{"Desktop"}</Toggle.Item>
      </Toggle>

      <style>{`
          .toggle-vertically {
            height: 500px;
          }
      `}</style>
    </div>
  ));

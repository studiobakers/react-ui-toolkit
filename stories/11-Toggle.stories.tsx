import {storiesOf} from "@storybook/react";
import React from "react";

import {Toggle} from "../src/toggle/Toggle";
import {initialState} from "./utils/constants/toggle/toggleStoryOptionConstants";
import StateProvider from "./utils/StateProvider";

storiesOf("Toggle", module)
  .add("Toggle States", () => {
    return (
      <div style={{width: "500px"}}>
        <span>{"Switch Toggle - 2 Options"}</span>

        <StateProvider initialState={initialState.switch}>
          {(state, setState) => (
            <Toggle selectedItems={state} onToggle={(e) => setState(e)}>
              <Toggle.Item dataId={"on"}>{"On"}</Toggle.Item>
              <Toggle.Item dataId={"off"}>{"Off"}</Toggle.Item>
            </Toggle>
          )}
        </StateProvider>

        <br />

        <span>{"Swtich Toggle - Disabled"}</span>

        <Toggle selectedItems={[]} onToggle={(e) => console.log(e)} isDisabled={true}>
          <Toggle.Item dataId={"mobile"}>{"Mobile"}</Toggle.Item>
          <Toggle.Item dataId={"tablet"}>{"Tablet"}</Toggle.Item>
          <Toggle.Item dataId={"notebook"}>{"Notebook"}</Toggle.Item>
          <Toggle.Item dataId={"desktop"}>{"Desktop"}</Toggle.Item>
        </Toggle>

        <br />

        <span>{"Toggle - Disabled Item"}</span>

        <StateProvider initialState={initialState.devices}>
          {(state, setState) => (
            <Toggle selectedItems={state} onToggle={(e) => setState(e)}>
              <Toggle.Item dataId={"mobile"}>{"Mobile"}</Toggle.Item>
              <Toggle.Item isDisabled={true} dataId={"tablet"}>
                {"Tablet"}
              </Toggle.Item>
              <Toggle.Item dataId={"notebook"}>{"Notebook"}</Toggle.Item>
              <Toggle.Item dataId={"desktop"}>{"Desktop"}</Toggle.Item>
            </Toggle>
          )}
        </StateProvider>
      </div>
    );
  })
  .add("Toggle Multiple", () => (
    <div style={{width: "500px"}}>
      <span>{"Toggle - Multiple"}</span>

      <StateProvider initialState={initialState.frameworks}>
        {(state, setState) => (
          <Toggle
            selectedItems={state}
            canSelectMultiple={true}
            onToggle={(e) => setState(e)}>
            <Toggle.Item dataId="react">{"React"}</Toggle.Item>
            <Toggle.Item dataId="vue">{"Vue"}</Toggle.Item>
            <Toggle.Item dataId="angular">{"Angular"}</Toggle.Item>
          </Toggle>
        )}
      </StateProvider>

      <br />

      <span>{"Toggle - Vertically"}</span>

      <StateProvider initialState={initialState.devices}>
        {(state, setState) => (
          <Toggle
            selectedItems={state}
            canSelectMultiple={true}
            onToggle={(e) => setState(e)}
            customClassName={"toggle-vertically"}
            position={"vertical"}>
            <Toggle.Item dataId={"mobile"}>{"Mobile"}</Toggle.Item>
            <Toggle.Item dataId={"tablet"}>{"Tablet"}</Toggle.Item>
            <Toggle.Item dataId={"notebook"}>{"Notebook"}</Toggle.Item>
            <Toggle.Item dataId={"desktop"}>{"Desktop"}</Toggle.Item>
          </Toggle>
        )}
      </StateProvider>

      <style>{`
        .toggle-vertically {
          height: 500px;
        }
      `}</style>
    </div>
  ));

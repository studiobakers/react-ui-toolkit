import React from "react";
import {storiesOf} from "@storybook/react";

import Switch from "../src/switch/Switch";
import StateProvider from "./utils/StateProvider";
import StoryFragment from "./utils/StoryFragment";

storiesOf("Switch", module).add("Switch States", () => {
  const initialState = {
    switchState: true,
    disabledState: false
  };

  const darkTheme = (
    <style>{`
    .sb-show-main {
      background-color: gray;
    }
  `}</style>
  );

  return (
    <StateProvider initialState={initialState}>
      {(state, setState) => (
        <StoryFragment>
          <div style={{display: "flex", gap: "8px"}}>
            <span>{"Dark"}</span>

            <Switch
              isToggledOn={state.switchState}
              onToggle={() => setState({...state, switchState: !state.switchState})}
            />

            <span>{"Light"}</span>

            {!state.switchState && darkTheme}
          </div>

          <br />

          <br />

          <span>{"Disabled Switch"}</span>

          <br />

          <Switch
            isToggledOn={state.disabledState}
            onToggle={() => setState({...state, switchState: !state.disabledState})}
            isDisabled={true}
          />
        </StoryFragment>
      )}
    </StateProvider>
  );
});

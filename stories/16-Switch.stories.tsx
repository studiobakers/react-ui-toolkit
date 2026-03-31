import type {Meta, StoryFn} from "@storybook/react";

import Switch from "../src/switch/Switch";
import StateProvider from "./utils/StateProvider";
import StoryFragment from "./utils/StoryFragment";

const meta: Meta<typeof Switch> = {
  title: "Switch",
  component: Switch
};

export default meta;

export const Default: StoryFn = () => {
  const initialState = {
    isSwitchOn: true,
    isDisabled: false
  };

  const darkTheme = (
    <style>
      {`
        .sb-show-main {
          background-color: gray;
          color: white;
        }
      `}
    </style>
  );

  return (
    <StateProvider initialState={initialState}>
      {(state, setState) => (
        <StoryFragment>
          <div style={{display: "flex", gap: "8px"}}>
            <span>{"Dark"}</span>

            <Switch
              isToggledOn={state.isSwitchOn}
              onToggle={() => setState({...state, isSwitchOn: !state.isSwitchOn})}
            />

            <span>{"Light"}</span>

            {!state.isSwitchOn && darkTheme}
          </div>

          <br />

          <br />

          <span>{"Disabled Switch"}</span>

          <br />

          <Switch
            isToggledOn={state.isDisabled}
            onToggle={() => setState({...state, isDisabled: !state.isDisabled})}
            isDisabled={true}
          />
        </StoryFragment>
      )}
    </StateProvider>
  );
};

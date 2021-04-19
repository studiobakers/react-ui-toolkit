import {storiesOf} from "@storybook/react";
import React from "react";

import StateProvider from "./utils/StateProvider";
import Toggle, {ToggleOption} from "../src/toggle/Toggle";
import StoryFragment from "./utils/StoryFragment";
import {toggleOptions} from "./utils/constants/toggle/toggleStoryOptionConstants";

storiesOf("Toggle", module)
  .add("Toggle States", () => {
    return (
      <div style={{width: "500px"}}>
        <span>{"Switch Toggle - 2 Options"}</span>
        <StateProvider initialState={[{id: "on", title: "On"}]}>
          {(state, setState) => (
            <Toggle
              options={toggleOptions.switchOptions}
              selectedOptions={state}
              onToggle={(e) => setState([e])}
            />
          )}
        </StateProvider>

        <span>{"Swtich Toggle - Disabled"}</span>

        <StateProvider initialState={[]}>
          {(state, setState) => (
            <Toggle
              options={toggleOptions.switchOptions}
              selectedOptions={state}
              isDisabled={true}
              onToggle={(e) => setState([e])}
            />
          )}
        </StateProvider>

        <br />

        <span>{"Toggle - Disabled Item"}</span>

        <StateProvider initialState={[]}>
          {(state, setState) => (
            <Toggle
              options={toggleOptions.deviceOptions}
              selectedOptions={state}
              onToggle={(e) => setState([e])}
            />
          )}
        </StateProvider>

        <br />

        <br />

        <span>{"Toggle - Vertically"}</span>

        <StateProvider initialState={[]}>
          {(state, setState) => (
            <Toggle
              options={toggleOptions.deviceOptions}
              selectedOptions={state}
              position={"vertical"}
              onToggle={(e) => setState(handleMultipleToggle(e, state))}
              customClassName={"toggle-vertically"}
            />
          )}
        </StateProvider>

        <style>{`
      .toggle-vertically {
        height: 400px;
      }
    `}</style>
      </div>
    );
  })
  .add("Toggle Multiple Select", () => (
    <StoryFragment>
      <span>{"Toggle - Multiple Select"}</span>

      <StateProvider initialState={[]}>
        {(state, setState) => (
          <Toggle
            options={toggleOptions.deviceOptions}
            selectedOptions={state}
            onToggle={(e) => setState(handleMultipleToggle(e, state))}
          />
        )}
      </StateProvider>

      <br />

      <span>{"Toggle with Icon"}</span>

      <StateProvider initialState={[]}>
        {(state, setState) => (
          <Toggle
            options={toggleOptions.frameworkOptions}
            selectedOptions={state}
            onToggle={(e) => setState(handleMultipleToggle(e, state))}
          />
        )}
      </StateProvider>
    </StoryFragment>
  ));

function handleMultipleToggle(
  option: ToggleOption,
  state: ToggleOption[]
): ToggleOption[] {
  let selectedOptions: ToggleOption[];

  if (state.find((selectedOption) => selectedOption.id === option.id)) {
    selectedOptions = state.filter((selectedOption) => selectedOption.id !== option.id);
  } else {
    selectedOptions = [...state, option];
  }

  return selectedOptions;
}

import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import StateProvider from "./utils/StateProvider";

import FormField from "../src/form/field/FormField";
import RadioGroup from "../src/form/input/radio/group/RadioGroup";

storiesOf("Radio Input", module).add("Radio Input", () => {
  const initialState = {
    firstInput: {
      choices: [
        {
          content: "Large",
          id: "Size, Large",
          inputProps: {
            htmlFor: "size-large",
            value: "size-large",
            name: "size"
          }
        },
        {
          content: "Medium",
          id: "Size, Medium",
          inputProps: {
            htmlFor: "size-medium",
            value: "size-medium",
            name: "size"
          }
        },
        {
          content: "All of them",
          id: "All of them",
          isDisabled: true,
          inputProps: {
            htmlFor: "all-of-them",
            value: "all-of-them",
            name: "size"
          }
        }
      ],
      selectedItem: null
    },
    secondInput: {
      choices: [
        {
          content: "Mac OSX",
          id: "Mac OSX",
          inputProps: {
            htmlFor: "mac-osx",
            value: "mac-osx",
            name: "os"
          }
        },
        {
          content: "Windows",
          id: "Windows",
          inputProps: {
            htmlFor: "windows",
            value: "windows",
            name: "os"
          }
        },
        {
          content: "Linux",
          id: "Linux",
          inputProps: {
            htmlFor: "linux",
            value: "linux",
            name: "os"
          }
        }
      ],
      selectedItem: null
    }
  };

  return (
    <StateProvider initialState={initialState}>
      {(state, setState) => (
        <Fragment>
          <FormField label={"Partially Disabled"}>
            <RadioGroup
              items={state.firstInput.choices}
              selectedItem={state.firstInput.selectedItem}
              onSelect={(item) =>
                setState({
                  ...state,
                  firstInput: {...state.firstInput, selectedItem: item}
                })
              }
            />
          </FormField>

          <FormField label={"Fully Disabled"}>
            <RadioGroup
              items={state.secondInput.choices}
              selectedItem={state.secondInput.selectedItem}
              isDisabled={true}
              onSelect={(item) =>
                setState({
                  ...state,
                  secondInput: {...state.secondInput, selectedItem: item}
                })
              }
            />
          </FormField>
        </Fragment>
      )}
    </StateProvider>
  );
});

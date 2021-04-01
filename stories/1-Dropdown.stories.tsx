import React from "react";
import {storiesOf} from "@storybook/react";

import Dropdown from "../src/dropdown/Dropdown";
import StateProvider from "./utils/StateProvider";
import FormField from "../src/form/field/FormField";

storiesOf("Dropdown", module).add("Dropdown States", () => {
  const initialState = {
    options: [
      {
        id: "turkish",
        title: "Turkish"
      },
      {
        id: "english",
        title: "English"
      },
      {
        id: "spanish",
        title: "Spanish"
      },
      {
        id: "french",
        title: "French - Disabled",
        isDisabled: true
      }
    ],
    selectedOption: null
  };

  return (
    <StateProvider initialState={initialState}>
      {(state, setState) => (
        <div style={{maxWidth: "350px"}}>
          <FormField label={"Your Language"}>
            <Dropdown
              role={"listbox"}
              options={state.options}
              placeholder={"Select Language"}
              onSelect={(option) => setState({...state, selectedOption: option})}
              selectedOption={state.selectedOption}
            />
          </FormField>

          <FormField
            label={"Your Language - hasError"}
            errorMessages={["Please select a language"]}>
            <Dropdown
              role={"listbox"}
              options={state.options}
              placeholder={"Select Language"}
              onSelect={(option) => setState({...state, selectedOption: option})}
              selectedOption={state.selectedOption}
              hasError={true}
            />
          </FormField>

          <FormField label={"Your Language - no options"}>
            <Dropdown
              role={"listbox"}
              options={[]}
              placeholder={"Select Language"}
              onSelect={(option) => setState({...state, selectedOption: option})}
              selectedOption={state.selectedOption}
            />
          </FormField>

          <FormField label={"Your Language"}>
            <Dropdown
              role={"listbox"}
              options={state.options}
              placeholder={"Select Language"}
              onSelect={(option) => setState({...state, selectedOption: option})}
              selectedOption={state.selectedOption}
              areOptionsFetching={true}
            />
          </FormField>

          <FormField label={"Your Language"}>
            <Dropdown
              role={"listbox"}
              options={state.options}
              placeholder={"Select Language"}
              onSelect={(option) => setState({...state, selectedOption: option})}
              selectedOption={state.selectedOption}
              isDisabled={true}
            />
          </FormField>
        </div>
      )}
    </StateProvider>
  );
});

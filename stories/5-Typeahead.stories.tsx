import React from "react";
import {storiesOf} from "@storybook/react";

import StateProvider from "./utils/StateProvider";

import FormField from "../src/form/field/FormField";
import TypeaheadSelect from "../src/select/typeahead/TypeaheadSelect";

const simulateAPICall = (timeout = 1000) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

storiesOf("Typeahead", module).add("Typeahead States", () => {
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
      }
    ],
    thirdOptions: [],
    selectedOptions: [],
    secondSelectedOptions: [],
    thirdSelectedOptions: [],
    areOptionsFetching: false
  };

  return (
    <StateProvider initialState={initialState}>
      {(state, setState) => (
        <div style={{maxWidth: "350px"}}>
          <FormField label={"Select Languages"}>
            <TypeaheadSelect
              dropdownOptions={initialState.options}
              selectedOptions={state.selectedOptions}
              onSelect={(option) =>
                setState({...state, selectedOptions: [...state.selectedOptions, option]})
              }
              onTagRemove={handleRemoveTag(state, setState)}
              typeaheadProps={{
                placeholder: "Select Languages",
                name: "language"
              }}
            />
          </FormField>

          <FormField label={"Select Languages (Max selectable 2)"}>
            <TypeaheadSelect
              selectedOptionLimit={2}
              dropdownOptions={initialState.options}
              selectedOptions={state.secondSelectedOptions}
              onSelect={(option) =>
                setState({
                  ...state,
                  secondSelectedOptions: [...state.secondSelectedOptions, option]
                })
              }
              onTagRemove={handleRemoveTag(state, setState, "secondSelectedOptions")}
              typeaheadProps={{
                placeholder: "Select Languages",
                name: "language"
              }}
            />
          </FormField>

          <FormField label={"Select Languages (Max selectable 2) - Disabled"}>
            <TypeaheadSelect
              selectedOptionLimit={2}
              isDisabled={true}
              dropdownOptions={initialState.options}
              selectedOptions={state.secondSelectedOptions}
              onSelect={(option) =>
                setState({
                  ...state,
                  secondSelectedOptions: [...state.secondSelectedOptions, option]
                })
              }
              onTagRemove={handleRemoveTag(state, setState)}
              typeaheadProps={{
                placeholder: "Select Languages",
                name: "language"
              }}
            />
          </FormField>

          <FormField label={"Select Languages (API Fetch Simulation)"}>
            <TypeaheadSelect
              shouldFilterOptionsByKeyword={false}
              areOptionsFetching={state.areOptionsFetching}
              dropdownOptions={state.thirdOptions}
              selectedOptions={state.thirdSelectedOptions}
              onSelect={(option) =>
                setState({
                  ...state,
                  thirdSelectedOptions: [...state.thirdSelectedOptions, option]
                })
              }
              onKeywordChange={handleKeywordChange(state, setState)}
              onTagRemove={handleRemoveTag(state, setState, "thirdSelectedOptions")}
              typeaheadProps={{
                placeholder: "Select Languages",
                name: "language-test"
              }}
            />
          </FormField>
        </div>
      )}
    </StateProvider>
  );

  function handleRemoveTag(state, setState, optionsArrayName = "selectedOptions") {
    return (tag) =>
      setState({
        ...state,
        [optionsArrayName]: state[optionsArrayName].filter(
          (options) => options.id !== tag.id
        )
      });
  }

  function handleKeywordChange(state, setState) {
    return async (keyword) => {
      if (keyword) {
        setState({
          ...state,
          areOptionsFetching: true
        });

        await simulateAPICall();

        setState({
          ...state,
          areOptionsFetching: false,
          thirdOptions: [
            {
              id: keyword,
              title: keyword
            }
          ]
        });
      }
    };
  }
});

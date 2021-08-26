import React from "react";
import {storiesOf} from "@storybook/react";

import StateProvider from "./utils/StateProvider";
import StoryFragment from "./utils/StoryFragment";

import FormField from "../src/form/field/FormField";
import TypeaheadSelect from "../src/select/typeahead/TypeaheadSelect";

const simulateAPICall = (timeout = 1000) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

storiesOf("Typeahead", module).add("Typeahead", () => {
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
    areOptionsFetching: false,
    keyword: ""
  };

  const modelInitialState = {
    options: [
      {
        id: "2005",
        title: "2005"
      },
      {
        id: "2015",
        title: "2015"
      },
      {
        id: "2021",
        title: "2021"
      }
    ],
    thirdOptions: [],
    selectedOptions: [],
    secondSelectedOptions: [],
    thirdSelectedOptions: [],
    areOptionsFetching: false,
    keyword: ""
  };

  return (
    <StoryFragment>
      <div style={{maxWidth: "350px"}}>
        <StateProvider initialState={initialState}>
          {(state, setState) => (
            <FormField label={"Select Languages"}>
              <TypeaheadSelect
                dropdownOptions={initialState.options}
                selectedOptions={state.selectedOptions}
                onSelect={(option) =>
                  setState({
                    ...state,
                    selectedOptions: [...state.selectedOptions, option]
                  })
                }
                onTagRemove={handleRemoveTag(state, setState)}
                typeaheadProps={{
                  placeholder: "Select Languages",
                  name: "language"
                }}
              />
            </FormField>
          )}
        </StateProvider>

        <StateProvider initialState={initialState}>
          {(state, setState) => (
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
          )}
        </StateProvider>

        <StateProvider initialState={initialState}>
          {(state, setState) => (
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
          )}
        </StateProvider>

        <StateProvider initialState={initialState}>
          {(state, setState) => (
            <FormField
              label={
                "Select Languages (API Fetch Simulation) - with keyword by TypeaheadSelect"
              }>
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
          )}
        </StateProvider>

        <StateProvider initialState={initialState}>
          {(state, setState) => (
            <FormField
              label={"Select Languages (API Fetch Simulation) - with keyword by parent"}>
              <TypeaheadSelect
                shouldFilterOptionsByKeyword={false}
                areOptionsFetching={state.areOptionsFetching}
                dropdownOptions={state.thirdOptions}
                selectedOptions={state.thirdSelectedOptions}
                onSelect={(option) =>
                  setState({
                    ...state,
                    thirdSelectedOptions: [...state.thirdSelectedOptions, option],
                    keyword: ""
                  })
                }
                onKeywordChange={handleKeywordChange(state, setState)}
                controlledKeyword={state.keyword}
                onTagRemove={handleRemoveTag(state, setState, "thirdSelectedOptions")}
                typeaheadProps={{
                  placeholder: "Select Languages",
                  name: "language-test"
                }}
              />
            </FormField>
          )}
        </StateProvider>

        <StateProvider initialState={modelInitialState}>
          {(state, setState) => (
            <FormField label={"Select Model Year"}>
              <TypeaheadSelect
                dropdownOptions={modelInitialState.options}
                selectedOptions={state.selectedOptions}
                onSelect={(option) =>
                  setState({
                    ...state,
                    selectedOptions: [...state.selectedOptions, option]
                  })
                }
                onTagRemove={handleRemoveTag(state, setState)}
                typeaheadProps={{
                  placeholder: "Select Model",
                  name: "model",
                  type: "number"
                }}
              />
            </FormField>
          )}
        </StateProvider>
      </div>
    </StoryFragment>
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
        setState((prevState) => ({
          ...prevState,
          areOptionsFetching: true,
          keyword
        }));

        await simulateAPICall();

        setState((prevState) => ({
          ...prevState,
          areOptionsFetching: false,
          thirdOptions: [
            {
              id: keyword,
              title: keyword
            }
          ]
        }));
      }
    };
  }
});

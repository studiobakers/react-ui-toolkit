import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import Dropdown from "../src/dropdown/Dropdown";
import StateProvider from "./utils/StateProvider";
import FormField from "../src/form/field/FormField";
import StoryFragment from "./utils/StoryFragment";

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

const initialStateWithSubtitle = {
  options: [
    {
      id: "html",
      title: "HTML",
      subtitle: "HyperText Markup Language"
    },
    {
      id: "css",
      title: "CSS",
      subtitle: "Cascading Style Sheets"
    },
    {
      id: "js",
      title: "JS",
      subtitle: "JavaScript"
    }
  ],
  selectedOption: null
};

const initialStateWithContext = {
  options: [
    {
      id: "js",
      title: "JavaScript",
      context: {
        icon: "https://img.icons8.com/dusk/48/000000/javascript-logo.png",
        url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript"
      }
    },
    {
      id: "ts",
      title: "TypeScript",
      context: {
        icon: "https://img.icons8.com/color/48/000000/typescript.png",
        url: "https://www.typescriptlang.org/"
      }
    }
  ]
};

storiesOf("Dropdown", module)
  .add("Dropdown States", () => (
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
        </div>
      )}
    </StateProvider>
  ))
  .add("Dropdown Menu", () => (
    <StateProvider initialState={initialState}>
      {(state, setState) => (
        <StoryFragment>
          <div style={{maxWidth: "350px"}}>
            <FormField>
              <Dropdown
                role={"menu"}
                options={state.options}
                placeholder={"Select Language"}
                onSelect={(option) => setState({...state, selectedOption: option})}
                selectedOption={state.selectedOption}
                hasDeselectOption={false}
                header={
                  <div>
                    <span className={"circle"} />
                    <span className={"dropdown-header"}>{"Language Menu"}</span>
                    <style>
                      {`
                        .circle {
                          height: 8px;
                          width: 8px;
                          background-color: blue;
                          border-radius: 50%;
                          display: inline-block;
                        }
                        
                        .dropdown-header {
                          color: black;
                          margin-left: 16px;
                        }
                        `}
                    </style>
                  </div>
                }
              />
            </FormField>
          </div>

          <span>{`Selected Language: ${
            state.selectedOption ? state.selectedOption.title : "-"
          }`}</span>
        </StoryFragment>
      )}
    </StateProvider>
  ))
  .add("Dropdown Options With Subtitles", () => (
    <StateProvider initialState={initialStateWithSubtitle}>
      {(state, setState) => (
        <div style={{maxWidth: "350px"}}>
          <FormField label={"Web Courses"}>
            <Dropdown
              role={"listbox"}
              options={state.options}
              placeholder={"Select Language"}
              onSelect={(option) => setState({...state, selectedOption: option})}
              selectedOption={state.selectedOption}
            />
          </FormField>
        </div>
      )}
    </StateProvider>
  ))
  .add("Dropdown With Customized Options", () => (
    <StateProvider initialState={initialStateWithContext}>
      {(state, setState) => (
        <div style={{maxWidth: "350px"}}>
          <FormField label={"Web Courses"}>
            <Dropdown
              role={"listbox"}
              options={state.options}
              placeholder={"Select Language"}
              onSelect={(option) => setState({...state, selectedOption: option})}
              selectedOption={state.selectedOption}
            />
          </FormField>

          {state.selectedOption && (
            <Fragment>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundImage: `url(${state.selectedOption.context.icon})`
                }}
              />

              <a href={state.selectedOption.context.url}>{"Visit Website"}</a>
            </Fragment>
          )}
        </div>
      )}
    </StateProvider>
  ))
  .add("No Options", () => (
    <div style={{maxWidth: "350px"}}>
      <FormField label={"Your Language - No Options"}>
        <Dropdown
          role={"listbox"}
          options={[]}
          placeholder={"Select Language"}
          onSelect={(option) => console.log(option)}
          selectedOption={initialState.selectedOption}
        />
      </FormField>
    </div>
  ))
  .add("Pending Request", () => (
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
              areOptionsFetching={true}
            />
          </FormField>
        </div>
      )}
    </StateProvider>
  ))
  .add("Disabled", () => (
    <div style={{maxWidth: "350px"}}>
      <FormField label={"Your Language"}>
        <Dropdown
          role={"listbox"}
          options={initialState.options}
          placeholder={"Select Language"}
          onSelect={(option) => console.log(option)}
          selectedOption={initialState.options[1]}
          isDisabled={true}
        />
      </FormField>
    </div>
  ));

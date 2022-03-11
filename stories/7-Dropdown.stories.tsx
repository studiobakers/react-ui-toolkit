import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import Dropdown from "../src/dropdown/Dropdown";
import Select from "../src/select/Select";
import StateProvider from "./utils/StateProvider";
import FormField from "../src/form/field/FormField";
import StoryFragment from "./utils/StoryFragment";
import {initialState} from "./utils/constants/dropdown/dropdownStoryOptionConstants";

storiesOf("Dropdown", module)
  .add("Dropdown", () => (
    <StateProvider initialState={initialState.basic}>
      {(state, setState) => (
        <div className={"dropdown-story-container"}>
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
    <StateProvider initialState={initialState.basic}>
      {(state, setState) => (
        <StoryFragment>
          <div className={"dropdown-story-container"}>
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
    <StateProvider initialState={initialState.withSubtitle}>
      {(state, setState) => (
        <div className={"dropdown-story-container"}>
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
  .add("Customized Dropdowns", () => (
    <StoryFragment>
      <StateProvider initialState={initialState.withContext}>
        {(state, setState) => (
          <div className={"dropdown-story-container"}>
            <FormField label={"Using context to share more data with dropdown options"}>
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
                <img
                  className={"dropdown-context-icon"}
                  src={state.selectedOption.context.icon}
                />

                <a href={state.selectedOption.context.url}>{"Visit Website"}</a>
              </Fragment>
            )}
          </div>
        )}
      </StateProvider>

      <br />

      <StateProvider initialState={initialState.withCustomContent}>
        {(state, setState) => (
          <div className={"dropdown-story-container"}>
            <FormField label={"Using CustomContent to display custom dropdown options"}>
              <Dropdown
                role={"listbox"}
                options={state.options}
                placeholder={"Select Coin"}
                onSelect={(option) => setState({...state, selectedOption: option})}
                selectedOption={state.selectedOption}
              />
            </FormField>
          </div>
        )}
      </StateProvider>
    </StoryFragment>
  ))
  .add("No Options", () => (
    <div className={"dropdown-story-container"}>
      <FormField label={"Your Language - No Options"}>
        <Dropdown
          role={"listbox"}
          options={[]}
          placeholder={"Select Language"}
          onSelect={(option) => console.log(option)}
          selectedOption={initialState.basic.selectedOption}
        />
      </FormField>
    </div>
  ))
  .add("Pending Request", () => (
    <StateProvider initialState={initialState.basic}>
      {(state, setState) => (
        <div className={"dropdown-story-container"}>
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
    <div className={"dropdown-story-container"}>
      <FormField label={"Your Language"}>
        <Dropdown
          role={"listbox"}
          options={initialState.basic.options}
          placeholder={"Select Language"}
          onSelect={(option) => console.log(option)}
          selectedOption={initialState.basic.options[1]}
          isDisabled={true}
        />
      </FormField>
    </div>
  ))
  .add("Select", () => (
    <StateProvider initialState={initialState.basic}>
      {(state, setState) => (
        <Select
          role={"listbox"}
          onSelect={(option) => setState({...state, selectedOption: option})}
          isMultiSelect={false}
          value={state.selectedOption}
          options={state.options}>
          <Select.Trigger style={{justifyContent: "space-between"}}>
            <div style={{padding: "15px"}}>
              {state.selectedOption ? state.selectedOption.title : "Select Item"}
            </div>

            <span style={{marginTop: "8px", marginLeft: "50px"}}>{"ˇ"}</span>
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <div style={{padding: "10px 0", color: "grey"}}>{"Group 1"}</div>
              {state.options.slice(0, 2).map((option) => (
                <Select.Item option={option}>{option.title}</Select.Item>
              ))}
            </Select.Group>

            <Select.Group>
              <div style={{padding: "10px 0", color: "grey"}}>{"Group 1"}</div>
              {state.options.slice(2, state.options.length).map((option) => (
                <Select.Item option={option}>{option.title}</Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select>
      )}
    </StateProvider>
  ));

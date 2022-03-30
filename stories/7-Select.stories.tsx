import "./utils/constants/select/_select-story-constants.scss";

import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import Select from "../src/select/Select";
import StateProvider from "./utils/StateProvider";
import {initialState} from "./utils/constants/select/selectStoryConstants";
import List from "../src/list/List";
import ListItem from "../src/list/item/ListItem";
import Tag from "../src/tag/Tag";

storiesOf("Select", module)
  .add("Select - Single Select", () => (
    <Fragment>
      <p>{"Single Select - Basic"}</p>
      <StateProvider initialState={initialState.basic}>
        {(state, setState) => (
          <Select
            role={"listbox"}
            onSelect={(option) => setState({...state, selectedOption: option})}
            value={state.selectedOption}>
            <Select.Trigger style={{justifyContent: "space-between"}}>
              <div>
                {state.selectedOption ? state.selectedOption.title : "Select Item"}
              </div>

              <span style={{marginTop: "8px", marginLeft: "50px"}}>{"ˇ"}</span>
            </Select.Trigger>
            <Select.Content>
              {state.options.map((option) => (
                <Select.Item option={option}>{option.title}</Select.Item>
              ))}
            </Select.Content>
          </Select>
        )}
      </StateProvider>

      <p>{"Single Select - Usage with <List />"}</p>
      <StateProvider initialState={initialState.basic}>
        {(state, setState) => (
          <Select
            role={"listbox"}
            onSelect={(option) => setState({...state, selectedOption: option})}
            value={state.selectedOption}>
            <Select.Trigger style={{justifyContent: "space-between"}}>
              <div>
                {state.selectedOption ? state.selectedOption.title : "Select Item"}
              </div>

              <span style={{marginTop: "8px", marginLeft: "50px"}}>{"ˇ"}</span>
            </Select.Trigger>
            <Select.Content>
              <List items={state.options}>
                {(option) => (
                  <Select.Item option={option} as={"li"}>
                    {option.title}
                  </Select.Item>
                )}
              </List>
            </Select.Content>
          </Select>
        )}
      </StateProvider>

      <p>{"Single Select - Grouped"}</p>
      <StateProvider initialState={initialState.basic}>
        {(state, setState) => (
          <Select
            role={"listbox"}
            onSelect={(option) => setState({...state, selectedOption: option})}
            value={state.selectedOption}>
            <Select.Trigger style={{justifyContent: "space-between"}}>
              <div>
                {state.selectedOption ? state.selectedOption.title : "Select Item"}
              </div>

              <span style={{marginTop: "8px", marginLeft: "50px"}}>{"ˇ"}</span>
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <div className={"select-story__group__title"}>{"Group 1"}</div>
                {state.options.slice(0, 2).map((option) => (
                  <Select.Item option={option}>{option.title}</Select.Item>
                ))}
              </Select.Group>

              <Select.Group>
                <div className={"select-story__group__title"}>{"Group 2"}</div>
                {state.options.slice(2, state.options.length).map((option) => (
                  <Select.Item option={option}>{option.title}</Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select>
        )}
      </StateProvider>
      <p>{"Single Select - Custom Content"}</p>

      <StateProvider initialState={initialState.withCustomContent}>
        {(state, setState) => (
          <Select
            role={"listbox"}
            onSelect={(option) => setState({...state, selectedOption: option})}
            value={state.selectedOption}>
            <Select.Trigger style={{justifyContent: "space-between"}}>
              <div>
                {state.selectedOption ? state.selectedOption.title : "Select Item"}
              </div>

              <span style={{marginTop: "8px", marginLeft: "50px"}}>{"ˇ"}</span>
            </Select.Trigger>
            <Select.Content>
              {state.options.map((option) => (
                <Select.Item option={option}>{option.CustomContent}</Select.Item>
              ))}
            </Select.Content>
          </Select>
        )}
      </StateProvider>
    </Fragment>
  ))
  .add("Select - Multi Select", () => (
    <Fragment>
      <p>{"Multi Select - Basic"}</p>

      <StateProvider initialState={initialState.multiSelect}>
        {(state, setState) => (
          <Select
            role={"listbox"}
            onSelect={(option) =>
              setState({
                ...state,
                value:
                  state.value.findIndex((optionValue) => optionValue.id === option.id) >
                  -1
                    ? state.value.filter((optionValue) => optionValue.id !== option.id)
                    : [...state.value, option]
              })
            }
            value={state.value}>
            <Select.Trigger style={{justifyContent: "space-between"}}>
              <div>
                {state.value.length ? `${state.value.length} selected` : "Select Items"}
              </div>

              <span style={{marginTop: "8px", marginLeft: "50px"}}>{"ˇ"}</span>
            </Select.Trigger>
            <Select.Content>
              {state.options.map((option) => (
                <Select.Item option={option}>{option.title}</Select.Item>
              ))}
            </Select.Content>
          </Select>
        )}
      </StateProvider>

      <p>{"Multi Select - With Tags"}</p>

      <StateProvider initialState={initialState.multiSelect}>
        {(state, setState) => (
          <Select
            role={"listbox"}
            onSelect={(option) =>
              setState({
                ...state,
                value:
                  state.value.findIndex((optionValue) => optionValue.id === option.id) >
                  -1
                    ? state.value.filter((optionValue) => optionValue.id !== option.id)
                    : [...state.value, option]
              })
            }
            value={state.value}>
            <Select.Trigger style={{justifyContent: "space-between"}}>
              <div>
                {state.value.length ? (
                  <List customClassName={"select-story__tag-list"} items={state.value}>
                    {(option) => (
                      <ListItem customClassName={"select-story__tag-list__item"}>
                        <Tag
                          tag={{content: option.title, id: option.id}}
                          onRemove={(tag) =>
                            setState({
                              ...state,
                              value: state.value.filter((option) => option.id !== tag.id)
                            })
                          }></Tag>
                      </ListItem>
                    )}
                  </List>
                ) : (
                  "Select Items"
                )}
              </div>

              <span style={{marginTop: "8px", marginLeft: "50px"}}>{"ˇ"}</span>
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <div className={"select-story__group__title"}>{"Group 1"}</div>
                {state.options.slice(0, 2).map((option) => (
                  <Select.Item option={option}>{option.title}</Select.Item>
                ))}
              </Select.Group>

              <Select.Group>
                <div className={"select-story__group__title"}>{"Group 2"}</div>
                {state.options.slice(2, state.options.length).map((option) => (
                  <Select.Item option={option}>{option.title}</Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select>
        )}
      </StateProvider>
    </Fragment>
  ));

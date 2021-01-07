import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import StateProvider from "./utils/StateProvider";

import FormField from "../src/form/field/FormField";
import Input from "../src/form/input/Input";
import PasswordInput from "../src/form/password-input/PasswordInput";
import CheckboxInput from "../src/form/input/checkbox/CheckboxInput";
import RadioGroup from "../src/form/input/radio/group/RadioGroup";

storiesOf("Form", module)
  .add("Input States", () => (
    <Fragment>
      <Input
        name={"fullName"}
        onChange={(e) => console.log(e.currentTarget.value)}
        placeholder={"Full Name"}
      />

      <br />

      <Input
        name={"fullName"}
        onChange={(e) => console.log(e.currentTarget.value)}
        placeholder={"Full Name"}
        isDisabled={true}
      />
    </Fragment>
  ))
  .add("FormFieldWithInput", () => (
    <FormField labelledBy={"Full Name"} label={"Full Name"}>
      <Input
        name={"fullName"}
        placeholder={"Write your name"}
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </FormField>
  ))
  .add("FormFieldWithInput.HasHelperMessage", () => (
    <FormField
      labelledBy={"Full Name"}
      label={"Full Name"}
      helperMessages={["You can include your middle name"]}>
      <Input name="fullName" onChange={(e) => console.log(e.currentTarget.value)} />
    </FormField>
  ))
  .add("FormFieldWithInput.HasErrorMessage", () => (
    <FormField
      labelledBy={"Full Name"}
      label={"Full Name"}
      errorMessages={["Please enter a full name"]}>
      <Input
        name={"fullName"}
        hasError={true}
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </FormField>
  ))
  .add("Password Input", () => (
    <FormField label={"Password"}>
      <PasswordInput
        testid={"LoginForm.input"}
        name={"password"}
        placeholder={"Enter password"}
        onChange={(e) => console.log(e.currentTarget.value)}
      />
    </FormField>
  ))
  .add("Checkbox States", () => {
    const initialState = {
      rememberMe: true,
      termsAndConditions: false,
      privacyPolicy: true
    };

    return (
      <StateProvider initialState={initialState}>
        {(state, setState) => (
          <Fragment>
            <CheckboxInput
              onSelect={() => setState({...state, rememberMe: !state.rememberMe})}
              isSelected={state.rememberMe}
              item={{
                id: "rememberMe",
                content: "Remember Me",
                inputProps: {
                  name: "rememberMe",
                  htmlFor: "rememberMe",
                  value: "yes"
                }
              }}
            />

            <CheckboxInput
              onSelect={() =>
                setState({...state, termsAndConditions: !state.termsAndConditions})
              }
              isSelected={state.termsAndConditions}
              item={{
                id: "termsAndConditions",
                content: "Terms and Conditions",
                inputProps: {
                  name: "termsAndConditions",
                  htmlFor: "termsAndConditions",
                  value: "yes"
                }
              }}
            />

            <CheckboxInput
              onSelect={() => setState({...state, privacyPolicy: !state.privacyPolicy})}
              isSelected={state.privacyPolicy}
              isDisabled={true}
              item={{
                id: "privacyPolicy",
                content: "Privacy Policy",
                inputProps: {
                  name: "privacyPolicy",
                  htmlFor: "privacyPolicy",
                  value: "yes"
                }
              }}
            />
          </Fragment>
        )}
      </StateProvider>
    );
  })
  .add("Radio States", () => {
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

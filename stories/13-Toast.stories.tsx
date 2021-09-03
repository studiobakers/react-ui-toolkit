import "./utils/constants/toast/_toast.scss";

import {storiesOf} from "@storybook/react";
import React from "react";

import StateProvider from "./utils/StateProvider";

import FormField from "../src/form/field/FormField";
import CheckboxInput from "../src/form/input/checkbox/CheckboxInput";
import Input from "../src/form/input/Input";
import Button from "../src/button/Button";
import {useToaster} from "../src/toast/util/toastHooks";
import StoryFragment from "./utils/StoryFragment";
import Toast from "../src/toast/Toast";
import {ToastContextProvider} from "../src/toast/ToastProvider";

function ToastComponent() {
  return (
    <StoryFragment>
      <p>{"ToastProvider with default props"}</p>

      <ToastContextProvider>
        <ToastExamples />
      </ToastContextProvider>

      <p>{"ToastProvider with autoCloseToasts={false}"}</p>

      <ToastContextProvider autoCloseToasts={false}>
        <ToastExamples />
      </ToastContextProvider>

      <p>{"ToastProvider with limit={3}"}</p>

      <ToastContextProvider limit={3}>
        <ToastExamples />
      </ToastContextProvider>
    </StoryFragment>
  );
}

function ToastExamples() {
  const {display, update, hideAll} = useToaster();

  return (
    <div>
      <div className={"toast-button-group"}>
        <Button
          type={"button"}
          onClick={() =>
            display({
              render() {
                return (
                  <div className={"toast toast--info"}>
                    <div data-testid={"info-toast"}>{"Info Toast"}</div>
                  </div>
                );
              }
            })
          }>
          {"Info Toast"}
        </Button>

        <Button
          type={"button"}
          onClick={() =>
            display({
              render() {
                return (
                  <div className={"toast toast--success"}>
                    <div data-testid={"success-toast"}>{"Success Toast"}</div>
                  </div>
                );
              }
            })
          }>
          {"Success Toast"}
        </Button>

        <Button
          type={"button"}
          onClick={() =>
            display({
              render() {
                return (
                  <div className={"toast toast--warning"}>
                    <div data-testid={"warning-toast"}>{"Warning Toast"}</div>
                  </div>
                );
              }
            })
          }>
          {"Warning Toast"}
        </Button>

        <Button
          type={"button"}
          onClick={() =>
            display({
              render() {
                return (
                  <div className={"toast toast--error"}>
                    <div data-testid={"error-toast"}>{"Error Toast"}</div>
                  </div>
                );
              }
            })
          }>
          {"Error Toast"}
        </Button>
      </div>

      <br />

      <div className={"toast-button-group"}>
        <Button
          type={"button"}
          onClick={() =>
            display({
              render() {
                return (
                  <div className={"toast toast--warning"}>
                    <div data-testid={"custom-toast-with-id"}>
                      {"Custom Toast with custom ID"}
                    </div>
                  </div>
                );
              },
              id: "custom-info-toast"
            })
          }>
          {"Info Toast with Custom ID"}
        </Button>

        <Button
          type={"button"}
          onClick={() =>
            update("custom-info-toast", {
              render() {
                return (
                  <div className={"toast toast--success"}>
                    <div data-testid={"custom-info-toast"}>
                      {"Custom Toast has updated!"}
                    </div>
                  </div>
                );
              },
              timeout: 10000
            })
          }>
          {"Update Custom Toast"}
        </Button>

        <Button type={"button"} onClick={hideAll}>
          {"Hide All"}
        </Button>
      </div>

      <br />

      <div className={"toast-button-group"}>
        <Button
          type={"button"}
          onClick={() =>
            display({
              autoClose: false,
              id: "custom-toast-with-id",
              render() {
                return (
                  <div className={"toast toast--info"}>
                    <Toast.CloseButton>{"X"}</Toast.CloseButton>

                    <div data-testid={"custom-toast-with-id"} className={"toast-content"}>
                      {"Custom Toast with ID"}
                    </div>
                  </div>
                );
              }
            })
          }>
          {"Toast with Close Button"}
        </Button>
      </div>
    </div>
  );
}

storiesOf("Toast", module)
  .add("Toast Message", () => <ToastComponent />)
  .add("Toast with dynamic props", () => (
    <StateProvider initialState={{limit: "3", autoCloseToasts: false}}>
      {(state, setState) => (
        <StoryFragment>
          <FormField label={"Toast limit"}>
            <Input
              localizationOptions={{maximumFractionDigits: 0}}
              name={"price"}
              type={"number"}
              onChange={(e) => setState({...state, limit: e.currentTarget.value})}
              value={state.limit}
              placeholder={"3"}
            />
          </FormField>

          <CheckboxInput
            onSelect={() => setState({...state, autoCloseToasts: !state.autoCloseToasts})}
            isSelected={state.autoCloseToasts}
            item={{
              id: "autoCloseToasts",
              content: "autoCloseToasts",
              inputProps: {
                name: "termsAndConditions",
                htmlFor: "termsAndConditions",
                value: "yes"
              }
            }}
          />
          <ToastContextProvider
            limit={Boolean(state.limit) && parseInt(state.limit)}
            autoCloseToasts={state.autoCloseToasts}>
            <ToastExamples />
          </ToastContextProvider>
        </StoryFragment>
      )}
    </StateProvider>
  ));

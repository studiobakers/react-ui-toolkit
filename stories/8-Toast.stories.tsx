import "./utils/constants/toast/_toast.scss";

import {storiesOf} from "@storybook/react";
import React from "react";

import Button from "../src/button/Button";
import {useToaster} from "../src/toast/util/toastHooks";
import StoryFragment from "./utils/StoryFragment";
import Toast from "../src/toast/Toast";

function ToastComponent() {
  const {display, update, hideAll} = useToaster();

  return (
    <StoryFragment>
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
    </StoryFragment>
  );
}

storiesOf("Toast", module).add("Toast Message", () => <ToastComponent />);

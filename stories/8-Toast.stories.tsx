import "./utils/constants/toast/_toast-story.scss";

import {storiesOf} from "@storybook/react";
import React from "react";

import Button from "../src/button/Button";
import {useToaster} from "../src/toast/util/toastHooks";
import StoryFragment from "./utils/StoryFragment";

interface ToastStoryProps {
  mode?: "info" | "success" | "warning" | "error";
  content: string;
}

function renderToast({mode, content}: ToastStoryProps) {
  return () => <div className={`toast toast--${mode}`}>{content}</div>;
}

function ToastComponent() {
  const {display, update, hideAll} = useToaster();

  return (
    <StoryFragment>
      <div className={"toast-button-group"}>
        <Button
          type={"button"}
          onClick={() =>
            display({
              render: renderToast({mode: "info", content: "Information Message"})
            })
          }>
          {"Info Toast"}
        </Button>

        <Button
          type={"button"}
          onClick={() =>
            display({
              render: renderToast({mode: "success", content: "Success Message"})
            })
          }>
          {"Success Toast"}
        </Button>

        <Button
          type={"button"}
          onClick={() =>
            display({
              render: renderToast({mode: "warning", content: "Warning Message"})
            })
          }>
          {"Warning Toast"}
        </Button>

        <Button
          type={"button"}
          onClick={() =>
            display({
              render: renderToast({mode: "error", content: "Error Message"})
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
              render: renderToast({mode: "info", content: "Info Toast Witch Custom ID"}),
              id: "custom-info-toast"
            })
          }>
          {"Info Toast with Custom ID"}
        </Button>

        <Button
          type={"button"}
          onClick={() =>
            update("custom-info-toast", {
              render: renderToast({mode: "info", content: "Custom Toast has updated!"}),
              timeout: 10000
            })
          }>
          {"Update Custom Toast"}
        </Button>

        <Button type={"button"} onClick={hideAll}>
          {"Hide All"}
        </Button>
      </div>
    </StoryFragment>
  );
}

storiesOf("Toast", module).add("Toast Message", () => <ToastComponent />);

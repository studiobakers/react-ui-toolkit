import {storiesOf} from "@storybook/react";
import React from "react";
import Button from "../src/button/Button";
import {useToaster} from "../src/toast/util/toastHooks";
import StoryFragment from "./utils/StoryFragment";

function ToastComponent() {
  const dispatchToast = useToaster();

  return (
    <StoryFragment>
      <Button
        type={"button"}
        onClick={() =>
          dispatchToast({
            type: "DISPLAY",
            payload: {
              mode: "success",
              component: "Success Message"
            }
          })
        }>
        {"Show Success Toast"}
      </Button>

      <br />

      <Button
        type={"button"}
        onClick={() =>
          dispatchToast({
            type: "DISPLAY",
            payload: {
              mode: "danger",
              component: "Error Message"
            }
          })
        }>
        {"Show Error Toast"}
      </Button>

      <div id="toast-root"></div>
    </StoryFragment>
  );
}

storiesOf("Toast", module).add("Toast Message", () => <ToastComponent />);

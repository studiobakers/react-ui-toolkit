import {storiesOf} from "@storybook/react";
import React from "react";

import Button from "../src/button/Button";
import {useDisplayToast} from "../src/toast/util/toastHooks";
import StoryFragment from "./utils/StoryFragment";

function ToastComponent() {
  const displayToast = useDisplayToast();
  const customRootClassName = (
    <style>{`
    .custom-toast {
      width: 100px;

      top: 0;
      bottom: unset;
      right: 0;

    }
  `}</style>
  );

  return (
    <StoryFragment>
      <Button
        type={"button"}
        onClick={() =>
          displayToast({
            mode: "success",
            content: "Success Message"
          })
        }>
        {"Success Toast"}
      </Button>

      <br />

      <Button
        type={"button"}
        onClick={() =>
          displayToast({
            mode: "warning",
            content: "Warning Message"
          })
        }>
        {"Warning Toast"}
      </Button>

      <br />

      <Button
        type={"button"}
        onClick={() =>
          displayToast({
            mode: "danger",
            content: "Error Message"
          })
        }>
        {"Error Toast"}
      </Button>

      <br />
      <hr />
      <br />

      <Button
        type={"button"}
        onClick={() =>
          displayToast({
            mode: "success",
            content: "Success Message",
            customRootId: "custom-toast-root",
            customClassName: "custom-toast",
            timeout: 10000
          })
        }>
        {"Toast with Custom Root Id"}
      </Button>

      {customRootClassName}
    </StoryFragment>
  );
}

storiesOf("Toast", module).add("Toast Message", () => <ToastComponent />);

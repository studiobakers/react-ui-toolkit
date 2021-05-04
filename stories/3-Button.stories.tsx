import React from "react";
import {storiesOf} from "@storybook/react";

import Button from "../src/button/Button";
import FileUploadButton from "../src/button/file-upload/FileUploadButton";
import StoryFragment from "./utils/StoryFragment";
import StateProvider from "./utils/StateProvider";
import SpinnerStorySample from "./utils/constants/spinner/SpinnerStorySample";

storiesOf("Button", module).add("Button States", () => (
  <StoryFragment>
    <Button type={"button"} onClick={(e) => alert("Thank You!")}>
      {"Click Me"}
    </Button>

    <br />

    <Button type={"button"} onClick={(e) => alert("Thank You!")} isDisabled={true}>
      {"Click Me - isDisabled"}
    </Button>

    <br />

    <StateProvider initialState={false}>
      {(state, setState) => (
        <Button
          type={"button"}
          onClick={() => setState(true)}
          shouldDisplaySpinner={state}>
          {"Click Me - shouldDisplaySpinner"}
        </Button>
      )}
    </StateProvider>

    <br />

    <Button
      type={"button"}
      onClick={(e) => alert("Thank You!")}
      shouldDisplaySpinner={true}
      customSpinner={<SpinnerStorySample />}>
      {"Click Me - shouldDisplaySpinner - customSpinner"}
    </Button>

    <br />
    <hr />
    <br />

    <FileUploadButton
      onFileSelect={(files) =>
        alert(
          Array.from(files)
            .map((file) => file.name)
            .join(", ")
        )
      }
      name={"photos"}
      htmlFor={"photos"}>
      {"Upload your photos"}
    </FileUploadButton>

    <br />

    <FileUploadButton
      onFileSelect={(files) =>
        alert(
          Array.from(files)
            .map((file) => file.name)
            .join(", ")
        )
      }
      name={"second-photos"}
      htmlFor={"second-photos"}
      isDisabled={true}>
      {"Upload your photos - isDisabled"}
    </FileUploadButton>

    <br />

    <FileUploadButton
      onFileSelect={(files) =>
        alert(
          Array.from(files)
            .map((file) => file.name)
            .join(", ")
        )
      }
      name={"second-photos"}
      htmlFor={"second-photos"}
      isPending={true}>
      {"Upload your photos - isPending"}
    </FileUploadButton>

    <br />

    <FileUploadButton
      onFileSelect={(files) =>
        alert(
          Array.from(files)
            .map((file) => file.name)
            .join(", ")
        )
      }
      name={"second-photos"}
      htmlFor={"second-photos"}
      isPending={true}
      customSpinner={<SpinnerStorySample />}>
      {"Upload your photos - isPending - customSpinner"}
    </FileUploadButton>
  </StoryFragment>
));

import React from "react";
import {storiesOf} from "@storybook/react";

import Button from "../src/button/Button";
import FileUploadButton from "../src/button/file-upload/FileUploadButton";
import StoryFragment from "./utils/StoryFragment";
import StateProvider from "./utils/StateProvider";
import SpinnerStorySample from "./utils/constants/spinner/SpinnerStorySample";
import {useEffect, useRef} from "@storybook/addons";

storiesOf("Button", module)
  .add("Button", () => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    return (
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
              shouldDisplaySpinner={state}
            >
              {"Click Me - shouldDisplaySpinner"}
            </Button>
          )}
        </StateProvider>

        <br />

        <Button
          type={"button"}
          onClick={(e) => alert("Thank You!")}
          shouldDisplaySpinner={true}
          customSpinner={<SpinnerStorySample />}
        >
          {"Click Me - shouldDisplaySpinner - customSpinner"}
        </Button>

        <br />

        <Button
          ref={buttonRef}
          type={"button"}
          onClick={() =>
            alert(`Button width: ${buttonRef.current.getBoundingClientRect().width}`)
          }
        >
          {"Get Button Width"}
        </Button>
      </StoryFragment>
    );
  })
  .add("Upload Button", () => {
    const fileUploadButtonRef = useRef<HTMLLabelElement | null>(null);

    useEffect(() => {
      console.log("FileUploadButton: ", fileUploadButtonRef.current);
    }, []);

    return (
      <StoryFragment>
        <FileUploadButton
          onFileSelect={(files: FileList) =>
            alert(
              Array.from(files)
                .map((file) => file.name)
                .join(", ")
            )
          }
          name={"photos"}
          htmlFor={"photos"}
        >
          {"Upload your photos"}
        </FileUploadButton>

        <br />

        <FileUploadButton
          onFileSelect={(files: FileList) =>
            alert(
              Array.from(files)
                .map((file) => file.name)
                .join(", ")
            )
          }
          name={"second-photos"}
          htmlFor={"second-photos"}
          isDisabled={true}
        >
          {"Upload your photos - isDisabled"}
        </FileUploadButton>

        <br />

        <FileUploadButton
          onFileSelect={(files: FileList) =>
            alert(
              Array.from(files)
                .map((file) => file.name)
                .join(", ")
            )
          }
          name={"second-photos"}
          htmlFor={"second-photos"}
          isPending={true}
        >
          {"Upload your photos - isPending"}
        </FileUploadButton>

        <br />

        <FileUploadButton
          onFileSelect={(files: FileList) =>
            alert(
              Array.from(files)
                .map((file) => file.name)
                .join(", ")
            )
          }
          name={"second-photos"}
          htmlFor={"second-photos"}
          isPending={true}
          customSpinner={<SpinnerStorySample />}
        >
          {"Upload your photos - isPending - customSpinner"}
        </FileUploadButton>

        <br />

        <FileUploadButton
          ref={fileUploadButtonRef}
          onFileSelect={(files: FileList) =>
            alert(
              Array.from(files)
                .map((file) => file.name)
                .join(", ")
            )
          }
          name={"photos"}
          htmlFor={"photos"}
        >
          {"Get FileUploadButton Ref"}
        </FileUploadButton>
      </StoryFragment>
    );
  });

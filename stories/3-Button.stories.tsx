import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import Button from "../src/button/Button";
import FileUploadButton from "../src/button/file-upload/FileUploadButton";

storiesOf("Button", module)
  .add("Button Sizes", () => (
    <Fragment>
      <Button type={"button"} onClick={(e) => alert("Thank You!")}>
        {"Click Me"}
      </Button>

      <br />

      <Button
        customClassName={"size-small"}
        type={"button"}
        onClick={(e) => alert("Thank You!")}>
        {"Click Me"}
      </Button>
    </Fragment>
  ))
  .add("Button States", () => (
    <Fragment>
      <Button type={"button"} onClick={(e) => alert("Thank You!")}>
        {"Click Me"}
      </Button>

      <br />

      <Button type={"button"} onClick={(e) => alert("Thank You!")} isDisabled={true}>
        {"Click Me"}
      </Button>

      <br />

      <Button
        type={"button"}
        onClick={(e) => alert("Thank You!")}
        shouldDisplaySpinner={true}>
        {"Click Me"}
      </Button>

      <br />

      <Button
        customClassName={"size-small"}
        type={"button"}
        onClick={(e) => alert("Thank You!")}>
        {"Click Me"}
      </Button>

      <br />

      <Button
        customClassName={"size-small"}
        type={"button"}
        isDisabled={true}
        onClick={(e) => alert("Thank You!")}>
        {"Click Me"}
      </Button>

      <br />

      <Button
        customClassName={"size-small"}
        type={"button"}
        shouldDisplaySpinner={true}
        onClick={(e) => alert("Thank You!")}>
        {"Click Me"}
      </Button>

      <br />

      <FileUploadButton
        onFileSelect={(files) => console.log(files)}
        fileInputProps={{name: "photos", htmlFor: "photos"}}>
        {"Upload your photos"}
      </FileUploadButton>

      <br />

      <FileUploadButton
        onFileSelect={(files) => console.log(files)}
        fileInputProps={{
          name: "second-photos",
          htmlFor: "second-photos",
          isDisabled: true
        }}>
        {"Upload your photos"}
      </FileUploadButton>
    </Fragment>
  ));

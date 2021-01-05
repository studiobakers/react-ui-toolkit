import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import Button from "../src/button/Button";
import FileUploadButton from "../src/button/file-upload/FileUploadButton";

storiesOf("Button", module).add("Button States", () => (
  <Fragment>
    <Button type={"button"} onClick={(e) => alert("Thank You!")}>
      {"Click Me"}
    </Button>

    <br />

    <Button type={"button"} onClick={(e) => alert("Thank You!")} isDisabled={true}>
      {"Click Me - isDisabled"}
    </Button>

    <br />

    <Button
      type={"button"}
      onClick={(e) => alert("Thank You!")}
      shouldDisplaySpinner={true}>
      {"Click Me - shouldDisplaySpinner"}
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
  </Fragment>
));

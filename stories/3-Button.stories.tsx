import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";

import Button from "../src/button/Button";

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
    </Fragment>
  ));

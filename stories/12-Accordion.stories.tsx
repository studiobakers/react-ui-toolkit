import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react";
import Accordion from "../src/accordion/Accordion";

storiesOf("Accordion", module).add("Accordion", () => (
  <Fragment>
    <p>
      {
        "Accordion with defaultExpanded={[\x221\x22]} allowZeroExpanded={false} allowMultipleExpanded={false}"
      }
    </p>

    <Accordion defaultExpanded={["1"]}>
      <Accordion.Item accordionId={"1"} header={"Accordion header 1"}>
        {"Content of the Accordion 1"}
      </Accordion.Item>

      <Accordion.Item accordionId={"2"} header={"Accordion header 2"}>
        {"Content of the Accordion 2"}
      </Accordion.Item>

      <Accordion.Item accordionId={"3"} header={"Accordion header 3"}>
        {"Content of the Accordion 3"}
      </Accordion.Item>
    </Accordion>

    <br />
    <br />

    <p>{"Accordion with allowZeroExpanded={true} allowMultipleExpanded={false}"}</p>

    <Accordion allowZeroExpanded>
      <Accordion.Item accordionId={"1"} header={"Accordion header 1"}>
        {"Content of the Accordion 1"}
      </Accordion.Item>

      <Accordion.Item accordionId={"2"} header={"Accordion header 2"}>
        {"Content of the Accordion 2"}
      </Accordion.Item>

      <Accordion.Item accordionId={"3"} header={"Accordion header 3"}>
        {"Content of the Accordion 3"}
      </Accordion.Item>
    </Accordion>

    <br />
    <br />

    <p>{"Accordion with allowZeroExpanded={true} allowMultipleExpanded={true}"}</p>

    <Accordion allowZeroExpanded allowMultipleExpanded>
      <Accordion.Item accordionId={"1"} header={"Accordion header 1"}>
        {"Content of the Accordion 1"}
      </Accordion.Item>

      <Accordion.Item accordionId={"2"} header={"Accordion header 2"}>
        {"Content of the Accordion 2"}
      </Accordion.Item>

      <Accordion.Item accordionId={"3"} header={"Accordion header 3"}>
        {"Content of the Accordion 3"}
      </Accordion.Item>
    </Accordion>
  </Fragment>
));

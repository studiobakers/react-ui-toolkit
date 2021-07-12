import React, {Fragment, useState} from "react";
import {storiesOf} from "@storybook/react";

import Card from "../src/card/Card";
import CollapsibleCard from "../src/card/collapsible/CollapsibleCard";
storiesOf("Card", module).add("Card", () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div style={{width: "300px"}}>
      <Card>
        <Card.Body>A simple card with just body.</Card.Body>
      </Card>

      <br />

      <Card>
        <Card.Header>Card header</Card.Header>
        <Card.Body>
          <h4 style={{marginTop: "0"}}>Title</h4>
          <p>Description of card with header and title.</p>
        </Card.Body>
      </Card>

      <br />

      <CollapsibleCard
        initialIsOpen={true}
        header={"Collapsible card header"}
        onChange={(state) => {
          console.log(state);
        }}>
        <Card.Body>
          <h4 style={{marginTop: "0"}}>Title</h4>
          <p>Description of the collapsible card.</p>
        </Card.Body>
      </CollapsibleCard>
    </div>
  );
});

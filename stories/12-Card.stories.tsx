import React from "react";
import {storiesOf} from "@storybook/react";

import Card from "../src/card/Card";
import CollapsibleCard from "../src/card/collapsible/CollapsibleCard";
import StateProvider from "./utils/StateProvider";

storiesOf("Card", module).add("Card", () => {
  return (
    <div style={{width: "300px"}}>
      <Card>
        <Card.Body>{"A simple card with just body."}</Card.Body>
      </Card>

      <br />

      <Card>
        <Card.Header>Card header</Card.Header>

        <Card.Body>
          <h4 style={{marginTop: "0"}}>Title</h4>

          <p>{"Description of card with header and title."}</p>
        </Card.Body>
      </Card>

      <br />

      <StateProvider initialState={true}>
        {(state, setState) => (
          <CollapsibleCard
            isOpen={state}
            header={"Collapsible card header"}
            onClick={() => {
              setState(!state);
            }}>
            <Card.Body>
              <h4 style={{marginTop: "0"}}>{"Title"}</h4>

              <p>{"Description of the collapsible card."}</p>
            </Card.Body>
          </CollapsibleCard>
        )}
      </StateProvider>

      <br />

      <StateProvider initialState={[true, false]}>
        {(state, setState) => (
          <CollapsibleCard
            isOpen={state[0]}
            header={"Collapsible card header"}
            onClick={() => {
              setState([!state[0], state[1]]);
            }}>
            <Card.Body>
              <h4 style={{marginTop: "0"}}>{"Title"}</h4>

              <p>{"Description of the collapsible card."}</p>

              <CollapsibleCard
                isOpen={state[1]}
                header={"Children Collapsible Card "}
                onClick={() => {
                  setState([state[0], !state[1]]);
                }}>
                <Card.Body>
                  <h4 style={{marginTop: "0"}}>{"Title"}</h4>

                  <p>{"Description of the children collapsible card."}</p>
                </Card.Body>
              </CollapsibleCard>
            </Card.Body>
          </CollapsibleCard>
        )}
      </StateProvider>
    </div>
  );
});

import React from "react";
import {storiesOf} from "@storybook/react";

import Card from "../src/card/Card";
import CollapsibleCard from "../src/card/collapsible/CollapsibleCard";
import StateProvider from "./utils/StateProvider";

storiesOf("Card", module)
  .add("Card", () => (
    <div style={{width: "300px"}}>
      <Card>
        <Card.Header>Card header</Card.Header>

        <Card.Body>
          <h4 style={{marginTop: "0"}}>Title</h4>

          <p>{"Description of card with header and title."}</p>
        </Card.Body>
      </Card>
    </div>
  ))
  .add("Card with just body", () => (
    <div style={{width: "300px"}}>
      <Card>
        <Card.Body>{"A simple card with just body."}</Card.Body>
      </Card>
    </div>
  ))
  .add("Collapsible Card", () => (
    <div style={{width: "300px"}}>
      <StateProvider initialState={true}>
        {(state, setState) => (
          <CollapsibleCard
            isOpen={state}
            header={"Collapsible card header"}
            onToggle={() => {
              setState(!state);
            }}>
            <Card.Body>
              <h4 style={{marginTop: "0"}}>{"Title"}</h4>

              <p>{"Description of the collapsible card."}</p>
            </Card.Body>
          </CollapsibleCard>
        )}
      </StateProvider>
    </div>
  ))
  .add("Collapsible Card with dynamic child", () => (
    <div style={{width: "300px"}}>
      <StateProvider initialState={[true, false]}>
        {(state, setState) => (
          <CollapsibleCard
            isOpen={state[0]}
            header={"Collapsible card header"}
            onToggle={() => {
              setState([!state[0], state[1]]);
            }}>
            <Card.Body>
              <h4 style={{marginTop: "0"}}>{"Title"}</h4>

              <p>{"Description of the collapsible card."}</p>

              <CollapsibleCard
                isOpen={state[1]}
                header={"Children Collapsible Card "}
                onToggle={() => {
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
  ))
  .add("Uncontrolled Collapsible Card", () => (
    <div style={{width: "300px"}}>
      <CollapsibleCard header={"Collapsible card header"}>
        <Card.Body>
          <h4 style={{marginTop: "0"}}>{"Title"}</h4>

          <p>{"Description of the collapsible card."}</p>
        </Card.Body>
      </CollapsibleCard>
    </div>
  ));

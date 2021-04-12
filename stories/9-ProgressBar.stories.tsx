import React from "react";
import {storiesOf} from "@storybook/react";

import ProgressBar from "../src/progress-bar/ProgressBar";

const colors = {
  background: "#A6A6A6",
  track: "#2F76FF",
  completed: "#00B300"
};

storiesOf("Progress Bar", module)
  .add("Line View", () => (
    <div style={{maxWidth: "350px"}}>
      <span>{"Empty"}</span>

      <ProgressBar
        percentage={0}
        view={"line"}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track
        }}
        children={{}}
      />

      <br />

      <span>{"Incompleted"}</span>

      <ProgressBar
        percentage={33}
        view={"line"}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track
        }}
        children={{}}
      />

      <br />

      <span>{"Completed"}</span>

      <ProgressBar
        percentage={100}
        view={"line"}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        children={{}}
      />
    </div>
  ))
  .add("Line View - Has Children", () => (
    <div style={{maxWidth: "350px"}}>
      <span>{"Children position: Top"}</span>

      <ProgressBar
        percentage={0}
        view={"line"}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track
        }}
        children={{content: <p>{"0 %"}</p>, position: "top"}}
      />

      <br />

      <span>{"Children position: Bottom"}</span>

      <ProgressBar
        percentage={33}
        view={"line"}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        children={{
          content: <p>{"33 %"}</p>,
          position: "bottom"
        }}
      />
    </div>
  ))
  .add("Bar View", () => (
    <div style={{maxWidth: "350px"}}>
      <ProgressBar
        percentage={0}
        view={"bar"}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        children={{}}
      />

      <br />

      <ProgressBar
        percentage={25}
        view={"bar"}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        children={{}}
      />

      <br />

      <ProgressBar
        percentage={100}
        view={"bar"}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        children={{}}
      />
    </div>
  ))
  .add("Bar View - Has Children", () => (
    <div style={{maxWidth: "350px"}}>
      <span>{"Children position: Top"}</span>

      <ProgressBar
        percentage={35}
        view={"bar"}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        children={{
          content: <p>{"35 %"}</p>,
          position: "top"
        }}
      />

      <br />

      <span>{"Children position: Bottom"}</span>

      <ProgressBar
        percentage={50}
        view={"bar"}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        children={{content: <p>{"50 %"}</p>, position: "bottom"}}
      />

      <br />

      <span>{"Children position: In"}</span>

      <ProgressBar
        percentage={0}
        view={"bar"}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        children={{content: <p>{"0 %"}</p>, position: "in"}}
      />

      <br/>

      <ProgressBar
        percentage={85}
        view={"bar"}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        children={{content: <p>{"85 %"}</p>, position: "in"}}
      />

      <br/>

      <ProgressBar
        percentage={100}
        view={"bar"}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        children={{content: <p>{"Completed!"}</p>, position: "in"}}
      />
    </div>
  ));

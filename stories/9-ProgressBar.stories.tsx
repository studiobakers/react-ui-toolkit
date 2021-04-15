import React from "react";
import {storiesOf} from "@storybook/react";

import ProgressBar from "../src/progress-bar/ProgressBar";

const colors = {
  background: "#A6A6A6",
  track: "#2F76FF",
  completed: "#00B300"
};

const progressBarStory = (
  <style>{`
  .progress-bar-story {
    height: 51.2px;
  }
`}</style>
);

storiesOf("Progress Bar", module)
  .add("Line View", () => (
    <div style={{maxWidth: "350px"}}>
      <span>{"Empty"}</span>

      <ProgressBar
        percentage={0}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track
        }}
      />

      <br />

      <span>{"Incompleted"}</span>

      <ProgressBar
        percentage={33}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track
        }}
      />

      <br />

      <span>{"Completed"}</span>

      <ProgressBar
        percentage={100}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
      />
    </div>
  ))
  .add("Line View - Has Children", () => (
    <div style={{maxWidth: "350px"}}>
      <span>{"Children position: Top"}</span>

      <p>{"0 %"}</p>

      <ProgressBar
        percentage={0}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track
        }}
      />

      <br />

      <span>{"Children position: Bottom"}</span>

      <ProgressBar
        percentage={33}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
      />

      <p>{"33 %"}</p>
    </div>
  ))
  .add("Bar View", () => (
    <div style={{maxWidth: "350px"}}>
      <span>{"Empty"}</span>

      <ProgressBar
        percentage={0}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        customClassName={"progress-bar-story"}
      />

      <br />

      <span>{"Incompleted"}</span>

      <ProgressBar
        percentage={25}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        customClassName={"progress-bar-story"}
      />

      <br />

      <span>{"Completed"}</span>

      <ProgressBar
        percentage={100}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        customClassName={"progress-bar-story"}
      />

      {progressBarStory}
    </div>
  ))
  .add("Bar View - Has Children", () => (
    <div style={{maxWidth: "350px"}}>
      <span>{"Children position: Top"}</span>

      <p>{"35 %"}</p>

      <ProgressBar
        percentage={35}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        customClassName={"progress-bar-story"}
      />

      <br />

      <span>{"Children position: Bottom"}</span>

      <ProgressBar
        percentage={50}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        customClassName={"progress-bar-story"}
      />

      <p>{"50 %"}</p>

      <br />

      <span>{"Children position: Inside"}</span>

      <ProgressBar
        percentage={0}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        children={<p>{"0 %"}</p>}
      />

      <br />

      <ProgressBar
        percentage={85}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        children={<p>{"85 %"}</p>}
      />

      <br />

      <ProgressBar
        percentage={100}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}
        children={<p>{"Completed!"}</p>}
      />

      {progressBarStory}
    </div>
  ));

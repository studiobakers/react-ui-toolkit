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
  .add("Progress Bar With Different Percentages", () => (
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
  .add("Progress Bar With Height Overridden by CSS", () => (
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
        percentage={50}
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
  .add("Progress Bar With Children", () => (
    <div style={{maxWidth: "350px"}}>
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

      <ProgressBar
        percentage={0}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}>
        {<p>{"0 %"}</p>}
      </ProgressBar>

      <br />

      <ProgressBar
        percentage={85}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}>
        {<p>{"85 %"}</p>}
      </ProgressBar>

      <br />

      <ProgressBar
        percentage={100}
        style={{
          backgroundColor: colors.background,
          trackColor: colors.track,
          completedColor: colors.completed
        }}>
        {<p>{"Completed!"}</p>}
      </ProgressBar>

      {progressBarStory}
    </div>
  ));

import type {Meta, StoryFn} from "@storybook/react";

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

const meta: Meta<typeof ProgressBar> = {
  title: "Progress Bar",
  component: ProgressBar
};

export default meta;

export const WithDifferentPercentages: StoryFn = () => (
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
);

export const WithHeightOverriddenByCSS: StoryFn = () => (
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
);

export const WithChildren: StoryFn = () => (
  <div style={{maxWidth: "350px"}}>
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
);

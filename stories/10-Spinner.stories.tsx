import type {Meta, StoryFn} from "@storybook/react";
import {Fragment} from "react";

import Spinner from "../src/spinner/Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Spinner",
  component: Spinner
};

export default meta;

export const Default: StoryFn = () => (
  <Fragment>
    <Spinner />

    <style>
      {`
        .spinner {
          width: 50px;
          height: 50px;
        }
      `}
    </style>
  </Fragment>
);

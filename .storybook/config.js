import React from "react";
import {configure, addDecorator} from "@storybook/react";
import {ToastContextProvider} from "../src/toast/ToastProvider";

// automatically import all files ending in *.stories.tsx
const req = require.context("../stories", true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}
 
const ToastDecorator = storyFn => (
  <ToastContextProvider>{storyFn()}</ToastContextProvider>
)

configure(loadStories, module);
addDecorator(ToastDecorator);

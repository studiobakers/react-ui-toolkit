import "./_toast-stack.scss";

import React from "react";
import ReactDOM from "react-dom";

import List from "../../list/List";
import Toast from "../Toast";
import {useToast} from "../util/toastHooks";

function ToastStack() {
  const {
    toastState: {toastItems}
  } = useToast();
  let toastRootNode = document.getElementById("toast-root");

  if (!toastRootNode) {
    toastRootNode = document.createElement("div");
  }

  toastRootNode.setAttribute("id", "toast-root");
  document.body.appendChild(toastRootNode);

  const toastStack = (
    <List customClassName={"toast-stack"} items={toastItems}>
      {(toastItem) => <Toast toastItem={toastItem} />}
    </List>
  );

  return ReactDOM.createPortal(toastStack, toastRootNode);
}

export default ToastStack;

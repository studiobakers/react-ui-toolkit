import "./_toast-stack.scss";

import React, {Fragment, useLayoutEffect, useState} from "react";
import ReactDOM from "react-dom";

import List from "../../list/List";
import Toast from "../Toast";
import {useToastContextState} from "../util/toastHooks";

interface ToastStackProps {
  customRootId?: string;
}

function ToastStack({customRootId}: ToastStackProps) {
  const state = useToastContextState();
  const [rootNode, setRootNode] = useState<null | Element>(null);

  useLayoutEffect(() => {
    const providedNode = customRootId && document.querySelector(`#${customRootId}`);

    if (providedNode) {
      setRootNode(providedNode);
    } else {
      const toastRootNode: Element = document.createElement("div");

      toastRootNode.setAttribute("id", "toast-root");
      document.body.append(toastRootNode);

      setRootNode(toastRootNode);
    }
  }, [customRootId]);

  return (
    rootNode &&
    ReactDOM.createPortal(
      state.toastStack.length ? (
        <List
          testid={"ToastStack"}
          items={state.toastStack}
          customClassName={"toast-stack"}
        >
          {(toast, testid) => <Toast testid={testid} data={toast} />}
        </List>
      ) : (
        <Fragment />
      ),
      rootNode
    )
  );
}

export default ToastStack;

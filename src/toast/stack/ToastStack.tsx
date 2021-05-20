import "./_toast-stack.scss";

import React, {useLayoutEffect, useState} from "react";
import ReactDOM from "react-dom";

import List from "../../list/List";
import Toast from "../Toast";
import {useToastContext} from "../util/toastHooks";

interface ToastStackProps {
  customRootId?: string;
}

function ToastStack({customRootId}: ToastStackProps) {
  const [state] = useToastContext();
  const [rootNode, setRootNode] = useState<null | Element>(null);

  useLayoutEffect(() => {
    const providedNode = customRootId && document.querySelector(`#${customRootId}`);

    if (providedNode) {
      setRootNode(providedNode);
    } else {
      const toastRootNode: Element = document.createElement("div");

      toastRootNode.setAttribute("id", "toast-root");
      document.body.insertBefore(toastRootNode, document.body.firstChild);

      setRootNode(toastRootNode);
    }
  }, [customRootId]);

  return (
    rootNode &&
    ReactDOM.createPortal(
      <List
        testid={"ToastStack"}
        items={state.toastStack}
        customClassName={"toast-stack"}>
        {(toast, testid) => <Toast testid={testid} data={toast} />}
      </List>,
      rootNode
    )
  );
}

export default ToastStack;

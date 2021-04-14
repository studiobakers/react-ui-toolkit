interface ToastItem {
  mode: "danger" | "warning" | "success";
  content: React.ReactNode;
  autoClose?: boolean;
  timeout?: number;
  customClassName?: string;
}

type ToastAction =
  | {
      type: "DISPLAY";
      payload: ToastItem;
    }
  | {type: "HIDE"};

export {ToastItem, ToastAction};

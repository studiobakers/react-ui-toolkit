interface ToastData {
  mode: "danger" | "success";
  component: React.ReactNode;
  autoClose?: boolean;
  timeout?: number;
  customClassName?: string;
}

type ToastAction =
  | {
      type: "DISPLAY";
      payload: ToastData;
    }
  | {type: "HIDE"};

export {ToastData, ToastAction};

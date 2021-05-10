interface ToastItem {
  mode: "danger" | "warning" | "success";
  content: React.ReactNode;
  autoClose?: boolean;
  timeout?: number;
  customClassName?: string;
  customToastId?: string;
}

type ToastAction =
  | {
      type: "DISPLAY";
      payload: ToastItem;
    }
  | {
      type: "HIDE";
      payload?: {
        customToastId: ToastItem["customToastId"];
      };
    };

export {ToastItem, ToastAction};

export interface ToastData {
  render: () => React.ReactNode;
  id?: string;
  autoClose?: boolean;
  timeout?: number;
  customClassName?: string;
}

export type ToastAction =
  | {
      type: "DISPLAY";
      toastData: Omit<ToastData, "id"> & {id: string};
    }
  | {type: "HIDE"; toastId: string}
  | {type: "HIDE_ALL"}
  | {
      type: "UPDATE";
      toastId: string;
      toastData: Partial<Omit<ToastData, "id">>;
    }
  | {
      type: "SET_LIMIT";
      limit: number;
    }
  | {
      type: "SET_AUTO_CLOSE";
      autoCloseToasts: boolean;
    }
  | {
      type: "SET_DEFAULT_AUTO_CLOSE_TIMEOUT_FOR_ALL_TOASTS";
      timeout: undefined | number;
    };

export interface ToastContextState {
  toastStack: (Omit<ToastData, "id"> & {id: string})[];
  autoCloseToasts: boolean;
  defaultAutoCloseTimeout: number;
  limit?: number;
}

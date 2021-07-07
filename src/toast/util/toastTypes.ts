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
      limit?: number;
    }
  | {type: "HIDE"; toastId: string}
  | {type: "HIDE_ALL"}
  | {
      type: "UPDATE";
      toastId: string;
      toastData: Partial<Omit<ToastData, "id">>;
    };

export interface ToastContextState {
  toastStack: (Omit<ToastData, "id"> & {id: string})[];
  autoCloseToasts: boolean;
  limit?: number;
}

import React from "react";
import {render, screen} from "@testing-library/react";
import {waitFor} from "@testing-library/dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import {Button, Toast, ToastContextProvider, useToaster} from "..";
import {ToastContextState} from "./util/toastTypes";
import {DEFAULT_TOAST_TIMEOUT} from "./util/toastConstants";

const testToastContentText = "This is a test toast";

const testToastData: ToastContextState["toastStack"][0] = {
  id: "TestToast",
  render() {
    return <p>{testToastContentText}</p>;
  }
};

const displayToastButtonText = "Display Toast";
const hideToastButtonText = "Hide Toast";

function ButtonWithToast({
  numberOfToasts = 1,
  autoClose,
  timeout,
  renderCustomToast
}: {
  numberOfToasts?: number;
  autoClose?: boolean;
  timeout?: number;
  renderCustomToast?: () => React.ReactNode;
}) {
  const toast = useToaster();

  return (
    <>
      <Button onClick={displayToasts}>{displayToastButtonText}</Button>
      <Button onClick={hideToast}>{hideToastButtonText}</Button>
    </>
  );

  function displayToasts() {
    for (let i = 0; i < numberOfToasts; i++) {
      toast.display({
        ...testToastData,
        id: `${testToastData.id}-${i + 1}`,
        autoClose,
        timeout,
        render: renderCustomToast || testToastData.render
      });
    }
  }

  function hideToast() {
    toast.hide(`${testToastData.id}-1`);
  }
}

describe("<ToastContextProvider />", () => {
  it("displays a toast that closes itself in default timeout", async () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <ToastContextProvider>{children}</ToastContextProvider>
    );

    render(<ButtonWithToast />, {wrapper});

    const button = await screen.findByText(displayToastButtonText);

    userEvent.click(button);

    expect(await screen.findByText(testToastContentText)).toBeVisible();

    await waitFor(
      () => {
        expect(screen.queryByText(testToastContentText)).not.toBeInTheDocument();
      },
      {timeout: DEFAULT_TOAST_TIMEOUT}
    );
  });

  it("disables autoclose for all toasts", async () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <ToastContextProvider autoCloseToasts={false}>{children}</ToastContextProvider>
    );

    render(<ButtonWithToast />, {wrapper});

    const button = await screen.findByText(displayToastButtonText);

    userEvent.click(button);

    expect(await screen.findByText(testToastContentText)).toBeVisible();

    await waitFor(
      () => {
        expect(screen.queryByText(testToastContentText)).toBeInTheDocument();
      },
      {timeout: DEFAULT_TOAST_TIMEOUT}
    );
  });

  it("displays at most 3 toasts", async () => {
    const limit = 3;
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <ToastContextProvider autoCloseToasts={false} limit={limit}>
        {children}
      </ToastContextProvider>
    );

    render(<ButtonWithToast numberOfToasts={5} />, {wrapper});

    const button = await screen.findByText(displayToastButtonText);

    userEvent.click(button);

    const elements = await screen.findAllByText(testToastContentText);

    expect(elements.length).toBe(limit);
  });

  it("all toasts disappears after 200ms", async () => {
    const timeout = 200;

    const wrapper = ({children}: {children: React.ReactNode}) => (
      <ToastContextProvider defaultAutoCloseTimeout={timeout}>
        {children}
      </ToastContextProvider>
    );

    render(<ButtonWithToast />, {wrapper});

    const button = await screen.findByText(displayToastButtonText);

    userEvent.click(button);

    expect(await screen.findByText(testToastContentText)).toBeVisible();

    await waitFor(
      () => {
        expect(screen.queryByText(testToastContentText)).toBeInTheDocument();
      },
      {timeout}
    );
  });

  it("autocloses itself in 2000ms", async () => {
    const timeout = 2000;
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <ToastContextProvider>{children}</ToastContextProvider>
    );

    render(<ButtonWithToast autoClose={true} timeout={timeout} />, {wrapper});

    const button = await screen.findByText(displayToastButtonText);

    userEvent.click(button);

    expect(await screen.findByText(testToastContentText)).toBeVisible();

    await waitFor(
      () => {
        expect(screen.queryByText(testToastContentText)).not.toBeInTheDocument();
      },
      {timeout}
    );
  });

  it("hides toast with specific id", async () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <ToastContextProvider autoCloseToasts={false}>{children}</ToastContextProvider>
    );

    render(<ButtonWithToast />, {wrapper});

    const displayButton = await screen.findByText(displayToastButtonText);

    userEvent.click(displayButton);

    expect(await screen.findByText(testToastContentText)).toBeVisible();

    const hideButton = await screen.findByText(hideToastButtonText);

    userEvent.click(hideButton);

    expect(screen.queryByText(testToastContentText)).not.toBeInTheDocument();
  });

  it("Displays toast with close button", async () => {
    const ToastCloseButtonText = "close this custom toast";

    function customToastRenderer() {
      return (
        <div>
          <p>{testToastContentText}</p>
          <Toast.CloseButton>{ToastCloseButtonText}</Toast.CloseButton>
        </div>
      );
    }

    const wrapper = ({children}: {children: React.ReactNode}) => (
      <ToastContextProvider autoCloseToasts={false}>{children}</ToastContextProvider>
    );

    render(<ButtonWithToast renderCustomToast={customToastRenderer} />, {
      wrapper
    });

    const displayButton = await screen.findByText(displayToastButtonText);

    userEvent.click(displayButton);
    expect(await screen.findByText(testToastContentText)).toBeVisible();

    const closeButton = await screen.findByText(ToastCloseButtonText);

    userEvent.click(closeButton);
    expect(screen.queryByText(testToastContentText)).not.toBeInTheDocument();
  });
});

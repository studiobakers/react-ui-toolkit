import React from "react";
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";
import ProgressBar, {ProgressBarProps} from "./ProgressBar";
import {testA11y} from "../core/utils/test/testUtils";

describe("<ProgressBar />", () => {
  afterEach(cleanup);

  const defaultProgressBarProps: ProgressBarProps = {
    testid: "progress-bar",
    percentage: 57,
    style: {backgroundColor: "blue", completedColor: "yellow", trackColor: "orange"}
  };

  it("should render correctly", () => {
    render(<ProgressBar {...defaultProgressBarProps} />);
  });

  it("should match snapshot", () => {
    const tree = create(<ProgressBar {...defaultProgressBarProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<ProgressBar {...defaultProgressBarProps} />);

    await testA11y(container);
  });

  it("should render children correctly", () => {
    const progressBarContent = <span data-testid={"progress-bar.content"}>{"Test"}</span>;

    const {getByTestId} = render(
      <ProgressBar {...defaultProgressBarProps}>{progressBarContent}</ProgressBar>
    );

    expect(getByTestId(defaultProgressBarProps.testid!)).toContainElement(
      getByTestId("progress-bar.content")
    );
  });

  it("progress bar's background color should be backgroundColor", () => {
    const {getByTestId} = render(<ProgressBar {...defaultProgressBarProps} />);

    expect(getByTestId(defaultProgressBarProps.testid!)).toHaveStyle(
      `background-color: ${defaultProgressBarProps.style.backgroundColor}`
    );
  });

  it("the width of the progress bar track should be `percentage` percent", () => {
    const {getByTestId} = render(<ProgressBar {...defaultProgressBarProps} />);

    expect(getByTestId(`${defaultProgressBarProps.testid!}.track`)).toHaveStyle(
      `width: ${defaultProgressBarProps.percentage}%`
    );
  });

  it("if the percentage is less than 100, background color of the progress bar track should be trackColor", () => {
    const {getByTestId} = render(<ProgressBar {...defaultProgressBarProps} />);

    expect(getByTestId(`${defaultProgressBarProps.testid!}.track`)).toHaveStyle(
      `background-color: ${defaultProgressBarProps.style.trackColor}`
    );
  });

  it("if the percentage is equal to 100, background color of the progress bar track should be completedColor", () => {
    const {getByTestId} = render(
      <ProgressBar {...defaultProgressBarProps} percentage={100} />
    );

    expect(getByTestId(`${defaultProgressBarProps.testid!}.track`)).toHaveStyle(
      `background-color: ${defaultProgressBarProps.style.completedColor}`
    );
  });
});

import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

import {testA11y} from "../../../core/utils/test/testUtils";
import FileInput, {FileInputProps} from "./FileInput";

describe("<FileInput />", () => {
  const defaultFileInputProps: FileInputProps = {
    testid: "file-input",
    name: "file-input",
    htmlFor: "file-input",
    onChange: jest.fn(),
    children: "Upload File"
  };

  it("should render correctly", () => {
    render(<FileInput {...defaultFileInputProps} />);
  });

  it("should match snapshot", () => {
    const tree = create(<FileInput {...defaultFileInputProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<FileInput {...defaultFileInputProps} />);

    await testA11y(container);
  });

  it("should render children correctly", () => {
    render(<FileInput {...defaultFileInputProps} />);

    expect(screen.getByText("Upload File")).toHaveTextContent("Upload File");
  });

  it("should display custom spinner correctly", () => {
    const customSpinnerContent = <p data-testid={"custom-spinner"}>{"Loading..."}</p>;

    render(
      <FileInput
        isPending={true}
        customSpinner={customSpinnerContent}
        {...defaultFileInputProps}
      />
    );

    const customSpinner = screen.getByText("Loading...");

    expect(screen.getByText("Upload File")).toContainElement(customSpinner);
  });

  it("should add disabled attribute to file input and file-input__label--is-disabled class to file input label when isDisabled is true", () => {
    render(<FileInput isDisabled={true} {...defaultFileInputProps} />);

    expect(screen.getByLabelText("Upload File")).toBeDisabled();
    expect(screen.getByText("Upload File")).toHaveClass("file-input__label--is-disabled");
  });

  it("should add disabled attribute to file input and file-input__label--is-disabled class to file input label when isPending is true", () => {
    render(<FileInput isPending={true} {...defaultFileInputProps} />);

    expect(screen.getByLabelText("Upload File")).toBeDisabled();
    expect(screen.getByText("Upload File")).toHaveClass("file-input__label--is-disabled");
  });
});

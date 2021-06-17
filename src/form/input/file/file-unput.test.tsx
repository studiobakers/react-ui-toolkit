import React from "react";
import {render, fireEvent} from "@testing-library/react";
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
    const {getByTestId} = render(<FileInput {...defaultFileInputProps} />);

    expect(getByTestId(`${defaultFileInputProps.testid}.label`)).toHaveTextContent(
      "Upload File"
    );
  });

  it("should upload file correctly", () => {
    const file = new File(["hipo"], "hipo.png", {type: "image/png"});

    render(<FileInput {...defaultFileInputProps} />);
    const fileInput = document.getElementsByTagName("input")[0]!;

    fireEvent.change(fileInput, {target: {files: [file]}});

    expect(fileInput.files![0]).toEqual(file);
    expect(defaultFileInputProps.onChange).toHaveBeenCalledTimes(1);
  });

  it("should upload multiple files correctly", () => {
    const files = [
      new File(["hipo"], "hipo.png", {type: "image/png"}),
      new File(["labs"], "labs.png", {type: "image/png"})
    ];

    render(<FileInput {...defaultFileInputProps} />);

    const fileInput = document.getElementsByTagName("input")[0]!;

    fireEvent.change(fileInput, {target: {files}});

    expect(fileInput.files).toHaveLength(files.length);
    expect(fileInput.files![0]).toStrictEqual(files[0]);
    expect(fileInput.files![1]).toStrictEqual(files[1]);
    expect(defaultFileInputProps.onChange).toHaveBeenCalledTimes(files.length);
  });

  it("should display custom spinner correctly", () => {
    const customSpinnerContent = <p data-testid={"custom-spinner"}>{"Loading..."}</p>;

    const {getByTestId} = render(
      <FileInput
        isPending={true}
        customSpinner={customSpinnerContent}
        {...defaultFileInputProps}
      />
    );

    const customSpinner = getByTestId("custom-spinner");

    expect(getByTestId(`${defaultFileInputProps.testid}.label`)).toContainElement(
      customSpinner
    );
  });

  it("should add disabled attribute to file input and file-input__label--is-disabled class to file input label when isDisabled is true", () => {
    const {getByTestId} = render(
      <FileInput isDisabled={true} {...defaultFileInputProps} />
    );

    expect(getByTestId(defaultFileInputProps.testid!)).toHaveAttribute("disabled");
    expect(getByTestId(defaultFileInputProps.testid!)).toBeDisabled();
    expect(getByTestId(`${defaultFileInputProps.testid}.label`)).toHaveClass(
      "file-input__label--is-disabled"
    );
  });

  it("should add disabled attribute to file input and file-input__label--is-disabled class to file input label when isPending is true", () => {
    const {getByTestId} = render(
      <FileInput isPending={true} {...defaultFileInputProps} />
    );

    expect(getByTestId(defaultFileInputProps.testid!)).toHaveAttribute("disabled");
    expect(getByTestId(defaultFileInputProps.testid!)).toBeDisabled();
    expect(getByTestId(`${defaultFileInputProps.testid}.label`)).toHaveClass(
      "file-input__label--is-disabled"
    );
  });
});

import React from "react";
import {render} from "@testing-library/react";
import "@testing-library/jest-dom";
import {create} from "react-test-renderer";

import {testA11y} from "../../../core/utils/test/testUtils";
import TypeaheadInput, {TypeaheadInputProps} from "./TypeaheadInput";

describe("<TypeaheadInput />", () => {
  const defaultTypeaheadInputProps: TypeaheadInputProps = {
    testid: "typeahead-input",
    name: "typeahead-input",
    onQueryChange: jest.fn(),
    placeholder: "typeahead input"
  };

  it("should render correctly", () => {
    render(<TypeaheadInput {...defaultTypeaheadInputProps} />);
  });

  it("should match snapshot", () => {
    const tree = create(<TypeaheadInput {...defaultTypeaheadInputProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should pass a11y test", async () => {
    const {container} = render(<TypeaheadInput {...defaultTypeaheadInputProps} />);

    await testA11y(container);
  });
});

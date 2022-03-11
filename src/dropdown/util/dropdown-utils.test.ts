import {DropdownOption} from "../list/item/DropdownListItem";
import {
  findIndexForClosestMatch,
  generateInitialFocusedDropdownOptionIndex
} from "./dropdownUtils";
import {DropdownPosition} from "./dropdownConstants";

describe("generateInitialFocusedDropdownOptionIndex", () => {
  const position: DropdownPosition = "left";
  const options: DropdownOption[] = [
    {id: "1", title: "Hipo"},
    {id: "2", title: "hIpO lAbS"},
    {id: "3", title: "lAbS"},
    {id: "4", title: "Labss"},
    {id: "5", title: ""},
    {id: "6", title: "hİpOğÜ_*!>labs"}
  ];

  it("should return provided selectedOption's index if it exists", () => {
    expect(
      generateInitialFocusedDropdownOptionIndex(position, options, options[1])
    ).toEqual(1);
  });

  it("should return 0 when provided selectedOption does not exists and position is not equal to top", () => {
    expect(
      generateInitialFocusedDropdownOptionIndex(position, options, {
        id: "-1",
        title: "test"
      })
    ).toEqual(0);

    expect(generateInitialFocusedDropdownOptionIndex(position, options, null)).toEqual(0);
    expect(
      generateInitialFocusedDropdownOptionIndex(position, options, undefined)
    ).toEqual(0);
  });

  it("should return last option's index when selectedOption does not exists and position is equal to top", () => {
    expect(
      generateInitialFocusedDropdownOptionIndex("top", options, {
        id: "-1",
        title: "test"
      })
    ).toEqual(options.length - 1);
  });

  expect(generateInitialFocusedDropdownOptionIndex("top", options, null)).toEqual(
    options.length - 1
  );
  expect(generateInitialFocusedDropdownOptionIndex("top", options, undefined)).toEqual(
    options.length - 1
  );
});

describe("findIndexForClosestMatch", () => {
  const options: DropdownOption[] = [
    {id: "1", title: "Hipo"},
    {id: "2", title: "hIpO lAbS"},
    {id: "3", title: "lAbS"},
    {id: "4", title: "Labss"},
    {id: "5", title: ""},
    {id: "6", title: "hİpOğÜ_*!>labs"}
  ];

  it("should return closest index by provided query", () => {
    expect(findIndexForClosestMatch(options, "HipO")).toEqual(0);
    // eslint-disable-next-line no-magic-numbers
    expect(findIndexForClosestMatch(options, "labs")).toEqual(2);
    expect(findIndexForClosestMatch(options, "hipo la")).toEqual(1);
  });

  it("should return 0 if the provided query is empty", () => {
    expect(findIndexForClosestMatch(options, "")).toEqual(0);
  });

  it("should return -1 if the provided query does not exists", () => {
    expect(findIndexForClosestMatch(options, "test")).toEqual(-1);
  });

  it("should handle special characters", () => {
    // eslint-disable-next-line no-magic-numbers
    expect(findIndexForClosestMatch(options, "hİpOğÜ_*!>")).toEqual(5);
  });
});

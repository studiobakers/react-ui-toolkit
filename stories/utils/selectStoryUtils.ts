import {Option} from "../../src/select/util/selectTypes";
import {initialState, Language} from "./constants/select/selectStoryConstants";

function handleMultiSelect(
  state: typeof initialState.multiSelect,
  setState: React.Dispatch<React.SetStateAction<typeof initialState.multiSelect>>,
  option: Option<Language>
) {
  const isSelected = state.value.findIndex((opt) => opt.id === option.id) > -1;

  let newValue = [] as typeof option[];

  if (isSelected) {
    newValue = state.value.filter((opt) => opt.id !== option.id);
  } else {
    newValue = [...state.value, option];
  }

  setState({...state, value: newValue});
}

export {handleMultiSelect};

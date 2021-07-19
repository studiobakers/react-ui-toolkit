import {AccordionAction, AccordionState} from "./accordionTypes";

function accordionReducer(
  state: AccordionState,
  action: AccordionAction
): AccordionState {
  let newState = state;

  switch (action.type) {
    case "TOGGLE": {
      const items = {...state.items};
      const {allowMultipleExpanded, allowZeroExpanded} = state;

      const expandedItems = Object.keys(items);

      if (items[action.accordionId]) {
        if (allowZeroExpanded || expandedItems.length > 1) {
          delete items[action.accordionId];
        }
      } else {
        if (!allowMultipleExpanded) {
          delete items[expandedItems[0]];
        }
        items[action.accordionId] = true;
      }

      newState = {
        ...state,
        items
      };

      break;
    }
    default:
  }

  return newState;
}

export default accordionReducer;

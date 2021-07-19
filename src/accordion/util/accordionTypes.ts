export interface AccordionData {
  render: () => React.ReactNode;
  id?: string;
  customClassName?: string;
}

export interface AccordionContextState {
  allowMultipleExpanded: boolean;
  allowZeroExpanded: boolean;
  items: {[key: string]: boolean};
}

export interface AccordionState {
  allowMultipleExpanded: boolean;
  allowZeroExpanded: boolean;
  items: {[key: string]: boolean};
}

export type AccordionAction = {
  type: "TOGGLE";
  accordionId: string;
};

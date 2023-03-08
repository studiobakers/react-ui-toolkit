import "./_list-item.scss";
import React from "react";
export interface ListItemProps {
    children?: React.ReactNode;
    testid?: string;
    customClassName?: string;
    clickableListItemProps?: {
        onClick: React.ReactEventHandler;
        tabIndex?: number;
    };
    id?: string;
    role?: string;
    ariaSelected?: boolean;
    listItemRef?: React.RefObject<HTMLLIElement>;
}
declare function ListItem({ id, testid, children, customClassName, clickableListItemProps, role, ariaSelected, listItemRef }: ListItemProps): JSX.Element;
export default ListItem;

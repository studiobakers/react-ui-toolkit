import "./_tab.scss";
import React from "react";
export type TabItem = {
    id: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
    isDisabled?: boolean;
};
interface UncontrolledTabProps {
    items: TabItem[];
    children: React.ReactNode[];
    testid?: string;
    initialActiveTabIndex?: number;
    customClassName?: string;
}
type ControlledTabProps = {
    activeTabIndex: number;
    onTabChange: (index: number) => void;
    initialActiveTabIndex?: number;
} | {
    activeTabIndex?: number;
    onTabChange?: (index: number) => void;
};
export type TabProps = ControlledTabProps & UncontrolledTabProps;
declare function Tab({ testid, items, initialActiveTabIndex, activeTabIndex: activeTabIndexFromProps, children, customClassName, onTabChange }: TabProps): JSX.Element;
export default Tab;

/// <reference types="react" />
import "./_tab-header-item.scss";
import { TabItem } from "../../Tab";
type TabHeaderItemProps = {
    tab: TabItem;
    onClick: (index: number) => void;
    isActive: boolean;
    index: number;
    testid?: string;
};
declare function TabHeaderItem({ testid, tab, onClick, index, isActive }: TabHeaderItemProps): JSX.Element;
export default TabHeaderItem;

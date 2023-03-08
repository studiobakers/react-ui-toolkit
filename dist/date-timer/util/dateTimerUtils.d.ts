import { RemainingTimeBreakdown } from "../../core/utils/time/timeTypes";
import { DateTimerItem, DateTimerProps } from "./dateTimerTypes";
declare function generateDateTimerItems({ titleMap, alwaysShowSeconds }: {
    titleMap: DateTimerProps["titleMap"];
    alwaysShowSeconds: boolean;
}, dateTimerData: RemainingTimeBreakdown): DateTimerItem[];
export { generateDateTimerItems };

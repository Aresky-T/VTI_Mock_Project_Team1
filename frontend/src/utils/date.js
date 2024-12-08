import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, differenceInWeeks, differenceInYears } from "date-fns";

export function calculateRelativeTime(inputDate) {
    if (!inputDate || !(inputDate instanceof Date)) return "";

    let timeDifference;
    const now = new Date();

    timeDifference = differenceInSeconds(now, inputDate);
    if (timeDifference < 60) {
        return timeDifference < 10 ? "Just now" : `${timeDifference} seconds`;
    }

    timeDifference = differenceInMinutes(now, inputDate);
    if (timeDifference < 60) {
        return timeDifference === 1 ? "1 min" : `${timeDifference} mins`;
    }

    timeDifference = differenceInHours(now, inputDate);
    if (timeDifference < 24) {
        return timeDifference === 1 ? "1 hour" : `${timeDifference} hours`;
    }

    timeDifference = differenceInDays(now, inputDate);
    if (timeDifference < 7) {
        return timeDifference === 1 ? "1 day" : `${timeDifference} days`;
    }

    timeDifference = differenceInYears(now, inputDate);
    if (timeDifference > 1) {
        return timeDifference === 1 ? "1 year" : `${timeDifference} years`;
    }

    timeDifference = differenceInWeeks(now, inputDate);
    return timeDifference === 1 ? "1 week" : `${timeDifference} weeks`;
};
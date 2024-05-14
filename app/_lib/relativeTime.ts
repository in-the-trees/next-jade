export const formatTimeRelatively = (
   date: Date | string,
   dynamic?: boolean,
): string => {
   const now = new Date();

   if (typeof date === "string") {
      date = new Date(date);
   }

   const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });
   const diff = (date.getTime() - now.getTime()) / 1000;

   const oneWeeksInSeconds = 1 * 7 * 24 * 60 * 60;
   if (!dynamic || Math.abs(diff) > oneWeeksInSeconds) {
      return date.toLocaleString("en-US", {
         month: "short",
         day: "2-digit",
         hour: "2-digit",
         minute: "2-digit",
         hour12: false,
      });
   }

   const units: Intl.RelativeTimeFormatUnit[] = [
      "year",
      "quarter",
      "month",
      "week",
      "day",
      "hour",
      "minute",
      "second",
   ];

   const divisors = [31536000, 7776000, 2592000, 604800, 86400, 3600, 60, 1];

   for (let i = 0; i < units.length; i++) {
      if (Math.abs(diff) >= divisors[i]) {
         const relativeDate: string = rtf.format(
            Math.round(diff / divisors[i]),
            units[i],
         );
         return relativeDate;
      }
   }

   return "date error";
};

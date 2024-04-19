export const formatTimeRelatively = (date: Date): string => {
   const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });
   const now = new Date();
   const diff = (date.getTime() - now.getTime()) / 1000;

   const twoWeeksInSeconds = 2 * 7 * 24 * 60 * 60;
   if (Math.abs(diff) >= twoWeeksInSeconds) {
      return new Date(date).toLocaleString("en-US", {
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

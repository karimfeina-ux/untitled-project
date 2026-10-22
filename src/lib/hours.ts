// Weekly schedule: key = weekday (0 = Sunday … 6 = Saturday), value = open ranges in minutes after midnight.
export type Schedule = Record<number, [number, number][]>;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Weekday + minutes in Barcelona local time. */
export function barcelonaNow(date: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { day: DAYS.indexOf(get("weekday")), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function isOpenAt(schedule: Schedule, date: Date): boolean {
  const { day, minutes } = barcelonaNow(date);
  return (schedule[day] ?? []).some(([o, c]) => minutes >= o && minutes < c);
}

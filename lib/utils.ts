/**
 * Converts a slug or camelCase/snake_case string into Title Case.
 * e.g. "plated-dinner" → "Plated Dinner", "fullName" → "Full Name"
 */
export function toTitleCase(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase → words
    .replace(/[-_]/g, " ") // hyphens/underscores → spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()) // capitalise each word
    .trim();
}

/**
 * Formats a date string (YYYY-MM-DD) as a human-readable date.
 * e.g. "2026-07-04" → "July 4, 2026"
 */
export function formatDate(value: string): string {
  if (!value) return value;
  const date = new Date(`${value}T12:00:00`);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formats a 24-hour time string (HH:MM) as 12-hour time with AM/PM.
 * e.g. "14:30" → "2:30 PM"
 */
export function formatTime(value: string): string {
  if (!value) return value;
  const [hourStr, minuteStr] = value.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = minuteStr ?? "00";
  if (isNaN(hour)) return value;
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${period}`;
}

/**
 * Formats a list of slugs/raw values into readable Title Case strings.
 */
export function formatList(items: string[]): string[] {
  return items.map(toTitleCase);
}

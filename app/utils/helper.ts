// Utility functions

/**
 * Makes the first character of a string uppercase.
 * @param str - The string to transform.
 * @returns The transformed string.
 */
export function makeFirstCharUpper(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats a date string into a more readable format.
 * @param dateString - The date string to format.
 * @returns The formatted date string.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

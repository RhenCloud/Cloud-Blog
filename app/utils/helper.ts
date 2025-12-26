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

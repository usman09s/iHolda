export function numberToAlphabet(num: number): string | null {
  if (num >= 1 && num <= 26) {
    // Convert the number to a character code for 'a' (97 for 1, 98 for 2, and so on).
    const charCode = num + 96;
    return String.fromCharCode(charCode);
  }
  return null; // Return null for out-of-range numbers
}

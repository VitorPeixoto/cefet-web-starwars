export const toRoman = number => {
  const mapping = {
      "1": "I",
      "2": "II",
      "3": "III",
      "4": "IV",
      "5": "V",
      "6": "VI"
  }
  return mapping[number];
}
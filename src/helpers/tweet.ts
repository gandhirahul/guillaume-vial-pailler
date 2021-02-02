export const removeTweetIdFromText = (id: number, text: string): string => {
  const idInText = `${id}. `;
  if (text.startsWith(idInText)) {
    return text.substr(idInText.length, text.length);
  }
  return text;
};

export const validate = (title: string, content: string) => {
  if (title === "" || title.length > 20) {
    return false;
  }
  if (content.length > 140) {
    return false;
  }
  return true;
};

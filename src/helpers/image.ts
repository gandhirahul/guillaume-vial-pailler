export const getMinimisedImage = (id: number, link: string): string => {
  if (link === `https://i.pravatar.cc/300?u=${id}`) {
    return `https://i.pravatar.cc/150?u=${id}`;
  }

  return link;
};

export const getCategoriesContact = (
  contactData: {}[],
  favoritesData: number[]
) => {
  const dataArr = contactData || [];

  const result = dataArr.reduce(
    (current: any, next: any) => {
      if (favoritesData.includes(next.id)) {
        current.favorites.push(next);
      } else {
        current.general.push(next);
      }
      return current;
    },
    { favorites: [], general: [] }
  );

  return result;
};

export const getCategoriesContact = (res: any) => {
  const dataArr = res.contact_aggregate.nodes || [];
  const favoritesArr = JSON.parse(
    localStorage.getItem("favoritesContact") || "[]"
  );
  const result = dataArr.reduce(
    (current: any, next: any) => {
      if (favoritesArr.includes(next.id)) {
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

// interface GetCategoriesContactProps {
//   dataContact: any;
//   dataFavorites: any;
// }

// export const getCategoriesContact = (props: GetCategoriesContactProps) => {
//   const { dataContact, dataFavorites } = props;
//   const dataArr = dataContact.contact_aggregate.nodes || [];

//   const result = dataArr.reduce(
//     (current: any, next: any) => {
//       if (dataFavorites.includes(next.id)) {
//         current.favorites.push(next);
//       } else {
//         current.general.push(next);
//       }
//       return current;
//     },
//     { favorites: [], general: [] }
//   );

//   return result;
// };

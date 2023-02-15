export const getProductsDetails = (limit?: Number) =>
  fetch('https://dummyjson.com/products?limit=' + limit)
    .then(response => {
      let res = response.json();
      return res;
    })
    .catch(err => {
      return 'Error';
    });

export const getCategories = () =>
  fetch('https://dummyjson.com/products')
    .then(response => {
      let res = response.json();
      return res;
    })
    .catch(err => {
      return 'Error';
    });

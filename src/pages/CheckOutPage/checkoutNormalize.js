const checkoutNormalize = (data) => {
  const newData = {
    first: data.name.first,
    last: data.name.last,
    country: data.address.country,
    city: data.address.city,
    street: data.address.street,
  };
  return newData;
};
export { checkoutNormalize };

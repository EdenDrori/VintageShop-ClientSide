const newDataForInputs = (data) => {
  const newData = {
    title: data.title,
    brand: data.brand,
    description: data.description,
    phone: data.phone,
    category: data.category,
    price: data.price,
    size: data.size,
    url: data.image.url,
    alt: data.image.alt,
    country: data.address.country,
    city: data.address.city,
    street: data.address.street,
    houseNumber: data.address.houseNumber
  };
  
  return newData;
};
export { newDataForInputs };

const normalizeDataItem = (inputsValue, childState, category) => {
  return {
    title: inputsValue.title,
    brand: inputsValue.brand,
    category: category,
    description: inputsValue.description,
    phone: inputsValue.phone,
    price: inputsValue.price,
    size: inputsValue.size,
    image: {
      url: childState,
      alt: inputsValue.alt,
    },
    address: {
      country: inputsValue.country,
      city: inputsValue.city,
      street: inputsValue.street,
      houseNumber: inputsValue.houseNumber,
      // zip: +inputsValue.zip,
    },
  };
};
export { normalizeDataItem };

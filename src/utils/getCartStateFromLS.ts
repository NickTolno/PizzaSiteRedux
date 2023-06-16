export const getCartFromLS = () => {
  const totalItems = localStorage.getItem('cartItems');
  const count = localStorage.getItem('cartTotalCount');
  const price = localStorage.getItem('cartTotalPrice');
  if (totalItems) {
    const items = JSON.parse(totalItems);
    const totalCount = Number(count);
    const totalPrice = Number(price);
    return { items, totalCount, totalPrice };
  }
  return { items: [], totalCount: 0, totalPrice: 0 };
}


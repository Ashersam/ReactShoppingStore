export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally; // product can ebe deleted but still can be in your cart or caccopunt
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}

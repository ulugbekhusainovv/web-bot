function totalPrice(arr) {
  return arr.reduce((a, c) => a + c.price * c.quantity, 0);
}

export default totalPrice;

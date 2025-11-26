let cart: any[] = [];

export function getCart() {
  return cart;
}

export function addToCart(item: any) {
  cart.push(item);
}

export function removeFromCart(id: number) {
  cart = cart.filter((item) => item.id !== id);
}

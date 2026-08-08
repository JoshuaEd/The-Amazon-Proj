export const cart = [];

export function addToCart(productId, productName, productPrice) {
  let price = 0;
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem) {
      price += cartItem.productPrice;
      console.log(price);
    }
  });
  let totalPrice = 0;
  cart.forEach((cartItem) => {
    if (
      productName === cartItem.productName ||
      productPrice === cartItem.productPrice ||
      productId === cartItem.productId
    ) {
      matchingItem = cartItem;
      price += Number(cartItem.productPrice) * 100;
      totalPrice = price;
      console.log(totalPrice);
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId,
      productName,
      productPrice,
      quantity: 1,
    });
  }
}


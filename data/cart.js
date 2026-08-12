export const cart = [
  {
    productId: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    quantity: 0,
  },
  {
    productId: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    quantity: 0,
  },
];

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
     
      console.log(matchingItem);
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

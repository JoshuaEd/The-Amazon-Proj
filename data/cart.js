export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
      quantity: 1,
      deliveryOptionId: "1",
    },
    {
      productId: "77919bbe-0e56-475b-adde-4f24dfed3a04",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, productName, productPrice) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
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
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}
// Deleting from cart
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

let checkOutQty = document.querySelector(`.quantity-label-${cart.productId}`);
export function updateCartQuantity(productId, newValue) {
  let matchingItem;
  cart.forEach((cartItem) => {
    //const productId = cartItem.productId;
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
      matchingItem.quantity = newValue;
      updateCartQuantity();
    }
    console.log(matchingItem);
  });
}

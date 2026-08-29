import { cart, saveToStorage, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import formatCurrency from "./utils/money.js";
import { removeFromCart } from "../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

let cartSummary = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });

  cartSummary += `
   <div class="cart-item-container
   js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-det ails">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                ${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link  link-primary" data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <span class="quantity-save-${matchingProduct.id} save-link link-primary">Save</span>
                <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
        </div>`;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMM D");
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)} -`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html += `  <div class="delivery-option">
                <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                   ${dateString}
                  </div>
                  <div class="delivery-option-price">
                   ${priceString} Shipping
                  </div>
                </div>
              </div>
              `;
  });
  return html;
}

document.querySelector(".order-summary").innerHTML += cartSummary;

//Deleting from cart//
document.querySelectorAll(".delete-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    console.log(cart);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    container.remove();
    updateCart();
  });
});

updateCart();

//Update Cart quantity

function updateCart() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(`.js-cart-item-quantity`).innerHTML =
    `${cartQuantity} Items`;
  document.querySelector(".items-summary").innerHTML =
    `Item: (${cartQuantity})`;
}

// Update Link
const updateLinks = document.querySelectorAll(`.update-quantity-link`);

updateLinks.forEach((updateLink) => {
  updateLink.addEventListener("click", () => {
    const productId = updateLink.dataset.productId;
    const cartItem = cart.find((item) => item.productId === productId);
    const saveLink = document.querySelector(`.quantity-save-${productId}`);
    const itemValue = document.querySelector(`.quantity-label-${productId}`);

    saveLink.style.display = "inline";
    updateLink.style.display = "none";
    itemValue.innerHTML = `<input type="text" class="save-input-${productId} save-input" value="${cartItem.quantity}">`;

    const inputEl = document.querySelector(`.save-input-${productId}`);

    saveLink.addEventListener("click", () => {
      const newValue = Number(inputEl.value);

      saveLink.style.display = "none";
      updateLink.style.display = "inline";
      itemValue.innerHTML = `<span class="quantity-label-${productId}">${newValue}</span>`;

      updateCartQuantity(productId, newValue);
      updateCart();
      saveToStorage();
    });
  });
});

updateLinks.forEach((updateLink) => {
  document.body.addEventListener("keydown", (event) => {
    if (event.key === "enter" || event.key === "Enter") {
      const productId = updateLink.dataset.productId;
      const cartItem = cart.find((item) => item.productId === productId);
      const saveLink = document.querySelector(`.quantity-save-${productId}`);
      const itemValue = document.querySelector(`.quantity-label-${productId}`);

      // saveLink.style.display = "inline";
      // updateLink.style.display = "none";
      // itemValue.innerHTML = `<input type="text" class="save-input-${productId} save-input" value="${cartItem.quantity}">`;

      const inputEl = document.querySelector(`.save-input-${productId}`);

      const newValue = Number(inputEl.value);

      saveLink.style.display = "none";
      updateLink.style.display = "inline";
      itemValue.innerHTML = `<span class="quantity-label-${productId}">${newValue}</span>`;

      updateCartQuantity(productId, newValue);
      updateCart();
      saveToStorage();

      console.log(event);

      saveLink.style.display = "none";
      updateLink.style.display = "inline";
      itemValue.innerHTML = `<span class="quantity-label-${productId}">${newValue}</span>`;
    }
  });
});

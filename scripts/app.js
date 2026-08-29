import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import  formatCurrency  from "./utils/money.js";


let productsContainer = document.querySelector(".products-grid");

let productHTML = "";

export function updateCart(productId, productName, productPrice) {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    let selector = Number(
      document.querySelector(`.product-quantity-selector-${productId}`).value,
    );
    if (selector > 1) {
      cartQuantity = cartItem.quantity += selector - 1;
      // document.querySelector('.cart-quantity').innerHTML += selector;
    }
    document.querySelector(".cart-quantity").innerHTML = cartQuantity;
  });

  const notification = document.querySelector(`.added-to-cart-${productId}`);
  let notificationTimeoutId = false;
  if (notification.classList.contains(`added-to-cart-${productId}`)) {
    notification.style.opacity = 1;
    notificationTimeoutId = true;
    setTimeout(() => {
      notificationTimeoutId = setTimeout(() => {
        notification.style.opacity = 0;
      }, 1000);
    }, 1000);
    clearTimeout(notificationTimeoutId);
    // clearInterval(notificationTimeoutId);
  }
  notificationTimeoutId = false;

}

products.forEach((product) => {
  productHTML += `
                        <div class="product-container">
                    <div class="product-image-container">
                      <img class="product-image" src="${product.image}">
                    </div>

                    <div class="product-name limit-text-to-2-lines">
                      ${product.name}
                    </div>

                    <div class="product-rating-container">
                      <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
                      <div class="product-rating-count link-primary">
                        ${product.rating.count}
                      </div>
                    </div>

                    <div class="product-price">
                      $${formatCurrency(product.priceCents / 100)}
                    </div>

                    <div class="product-quantity-container">
                      <select class="product-quantity-selector-${product.id}" >
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>

                    <div class="product-spacer"></div>

                    <div class="added-to-cart added-to-cart-${product.id}">
                      <img src="images/icons/checkmark.png">
                      Added
                    </div>

                    <button class="add-to-cart-button button-primary addtocart" data-product-name="${product.name}" data-product-id="${product.id}" data-product-price="${product.priceCents}">
                      Add to Cart
                    </button>
                  </div>
            `;
});

productsContainer.innerHTML += productHTML;
//let cartQuantity = JSON.parse(localStorage.getItem("cartQuantity") || 0);

document.querySelectorAll(".addtocart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId, productName, productPrice } = button.dataset;
    addToCart(productId, productName, productPrice);
    updateCart(productId, productName, productPrice);
  });
});



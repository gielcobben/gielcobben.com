"use strict";

var JS_CART = null;
var NOTIFY = false;
var pageID = document.querySelector("body").id;
var BUTTON_TEMPLATE_ADD = "Add one more";
var BUTTON_TEMPLATE_CART = "Add to cart";
var forms = document.querySelectorAll("form");
var itemCount = document.querySelector(".bag__count"); // Func

function currency(number) {
  if (number) {
    console.log("number ", number);
    return number.toLocaleString("nl-NL", {
      style: "currency",
      currency: "EUR"
    });
  }
}

function updateDOM() {
  var button = document.querySelector(".cart__submit");
  var products = document.querySelectorAll(".cart__product");

  if (button) {
    if (JS_CART.total) {
      button.innerHTML = "Checkout ".concat(currency(parseInt(JS_CART.total)));
    } else {
      button.style.display = "none";
    }
  }

  if (products.length <= 0 && button) {
    window.location.reload();
  }

  products.forEach(function(product, index) {
    var price = product.querySelector(".cart__product__price");
    var cartItem = JS_CART.items[index];
    price.innerHTML = currency(parseInt(cartItem.price));
  });
}

async function refresh() {
  JS_CART = await refreshCart();
  itemCount.textContent = JS_CART.item_count;

  if (pageID === "cart") {
    updateDOM();
  }
}

function refreshCart() {
  return new Promise(function(resolve) {
    Cart.refresh(function(cart) {
      resolve(cart);
    });
  });
}

function getProduct(options) {
  var id = null;
  options.forEach(function(option) {
    if (option.checked) {
      id = option.value;
    }
  });
  return id;
}

function notify() {
  var bar = document.querySelector(".cart__notification");
  clearTimeout(NOTIFY);
  bar.classList.add("is-active");
  NOTIFY = setTimeout(function() {
    bar.classList.remove("is-active");
  }, 4000);
}

function addToCart(event) {
  event.preventDefault();
  var form = event.target;
  var options = form.querySelectorAll(".product__option");
  var productID = getProduct(options);
  var button = form.querySelector("button");
  button.innerHTML = BUTTON_TEMPLATE_ADD;
  notify();
  Cart.addItem(productID, 1, refresh);
}

function isInCart(id) {
  var items = JS_CART.items;
  var inCart = items.filter(function(item) {
    return parseInt(item.option) === parseInt(id);
  });

  if (inCart.length > 0) {
    return inCart[0];
  } else {
    return false;
  }
}

function onRadioButtonChange(button, event) {
  if (event.target.checked) {
    button.disabled = false;
    var itemInCart = isInCart(event.target.value);

    if (itemInCart) {
      button.innerHTML = BUTTON_TEMPLATE_ADD;
    } else {
      button.innerHTML = BUTTON_TEMPLATE_CART;
    }
  }
}

function onRemoveItem(event) {
  event.preventDefault();
  var clickedElement = event.target;
  var productElement = clickedElement.closest("li");
  var quantityElement = productElement.querySelector("input");
  var itemIndex = parseInt(
    quantityElement.id.replace("item_", "").replace("_qty", "")
  );
  Cart.removeItem(itemIndex, refresh);
  productElement.remove();
}

function onQuantityChange(event) {
  var quantityElement = event.target;
  var productElement = quantityElement.closest("li");
  var value = quantityElement.value;
  var itemIndex = parseInt(
    quantityElement.id.replace("item_", "").replace("_qty", "")
  );

  if (value <= 0) {
    Cart.removeItem(itemIndex, refresh);
    productElement.remove();
  } else {
    Cart.updateItem(itemIndex, parseInt(quantityElement.value), refresh);
  }
}

function initCarousel(carousel) {
  var current = 0;
  var dots = carousel.querySelectorAll(".product__dot");
  var images = carousel.querySelectorAll(".product__image");
  dots[current].classList.add("is-active");
  images[current].classList.add("is-active");

  function handleImageClick() {
    images.forEach(function(image) {
      return image.classList.remove("is-active");
    });
    dots.forEach(function(dot) {
      return dot.classList.remove("is-active");
    });

    if (current === images.length - 1) {
      current = 0;
    } else {
      current = current + 1;
    }

    dots[current].classList.add("is-active");
    images[current].classList.add("is-active");
  }

  images.forEach(function(child) {
    return child.addEventListener("click", handleImageClick, false);
  });
} // Init

(function() {
  refresh(); // set latest cart global on page load;

  if (pageID === "home") {
    var carousels = document.querySelectorAll(".product__carousel");
    carousels.forEach(function(carousel) {
      initCarousel(carousel);
    });
    forms.forEach(function(form) {
      var radios = form.querySelectorAll("input");
      var button = form.querySelector("button");
      form.addEventListener("submit", addToCart, false);
      radios.forEach(function(radio) {
        radio.addEventListener(
          "change",
          function(event) {
            onRadioButtonChange(button, event);
          },
          false
        );
      });
    });
  }

  if (pageID === "cart") {
    var remove = document.querySelectorAll(".remove");
    var formCart = document.querySelector("#cart form");

    if (formCart) {
      var cartQuantityInputs = formCart.querySelectorAll("input");

      remove.forEach(function(removeElement) {
        removeElement.addEventListener("click", onRemoveItem, false);
      });

      cartQuantityInputs.forEach(function(quantityElement) {
        quantityElement.type = "number";
        quantityElement.addEventListener("input", onQuantityChange, false);
      });
    }
  }
})();

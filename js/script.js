document.addEventListener(
"DOMContentLoaded",
() => {
const App = {
products: [{
id: "virginia-gold",
category: "tobacco",
name: "ویرجینیا طلایی",
image: "images/virginiagold.webp",
description: "ویرجینیا طلایی از توتون های روشن و با کیفیت تهیه شده  با رنگ زرد؛ ظاهر لطیف و یکدستی دارد.رایحه این محصول فضایی گرم ملایم و کمی شیرین ایچاد میکند که حس تازگی و لطافت را در کنار عطر طبیعی توتون به همراه دارد. به دلیل قدرت نیکوتین پایین در گروه ترکیب های سبک قرار میگیرد و برای علاقه مندان به رایحه های نرم و متعادل انتخاب مناسبی است.",
status: "available",
order: 1
}],
cart: [],
elements: {},
state: {
search: "",
activeModal: null,
selectedProduct:null
}
};
App.elements.grids = {};
document.querySelectorAll(".product-grid").forEach((grid) => {
const category = grid.dataset.category;
App.elements.grids[category] = grid;
});
App.elements.productModal = document.getElementById("product-modal");
App.elements.productImage = document.getElementById("product-image");
App.elements.productTitle = document.getElementById("product-title");
App.elements.productDescription = document.getElementById("product-description");
App.elements.productStatus = document.getElementById("product-status");
App.elements.addProductBtn = document.getElementById("add-product-btn");
App.elements.closeProduct = document.querySelector(".close-product");
App.elements.cartModal = document.getElementById("cart-modal");
App.elements.cartItems = document.querySelector(".cart-items");
App.elements.clearCartBtn = document.querySelector(".clear-cart-btn");
App.elements.closeCart = document.querySelector(".close-cart");
App.elements.cartFloating = document.querySelector(".cart-floating");
App.elements.cartCount = document.querySelector(".cart-count");
App.elements.searchOverlay = document.getElementById("search-overlay");
App.elements.searchResults = document.getElementById("search-results");
App.elements.searchInput = document.querySelector(".search-box input");
App.elements.searchInput.addEventListener( "focus", openSearch );
App.elements.searchInput.addEventListener("input", (event) => {
App.state.search = event.target.value;
filterProducts();
});
App.elements.searchOverlay.addEventListener("click", (event) => {
if (event.target === App.elements.searchOverlay) { closeSearch(); } });
function renderProducts(products = App.products) {
Object.values(App.elements.grids).forEach((grid) => {
grid.innerHTML = "";
});
products.forEach((product) => {
const grid = App.elements.grids[product.category];
if (!grid) return;
const card = createProductCard(product);
grid.appendChild(card);
});
}
function createProductCard(product) {
const card = document.createElement("article");
card.className = "product-card";
card.innerHTML = `
<img
class="product-image"
src="${product.image}"
alt="${product.name}"
loading="lazy"
>
<div class="product-content">
<h3 class="product-title">${product.name}</h3>
<p class="product-status ${getStatusClass(product.status)}">
${getStatusText(product.status)}
</p>
<button class="add-cart-btn"
type="button"
aria-label="افزودن به سبد خرید">
+
</button>
</div>
`;
card.dataset.id = product.id;
card.dataset.category = product.category;
return card;
}
function openModal(product) {
App.elements.productImage.src = product.image;
App.elements.productImage.alt = product.name;
App.elements.productTitle.textContent = product.name;
App.elements.productDescription.textContent = product.description;
App.elements.productStatus.className = `product-status ${getStatusClass(product.status)}`;
App.elements.productModal.classList.add("show");
App.state.activeModal = "product";
App.elements.productStatus.textContent =
getStatusText(product.status);
App.state.selectedProduct = product;
}
App.elements.addProductBtn.addEventListener("click", () => {
const product = App.state.selectedProduct;
if (!product) return;
addToCart(product);
});
function openCart() {
renderCart();
App.elements.cartModal.classList.add("show");
App.state.activeModal = "cart";
}
App.elements.cartFloating.addEventListener( "click", openCart );
function closeCart() {
App.elements.cartModal.classList.remove("show");
App.state.activeModal = null;
}
App.elements.closeCart.addEventListener(
"click", closeCart);
App.elements.cartModal.addEventListener( "click", (event) => { 
if (event.target === App.elements.cartModal) { closeCart();
} });
function initProductEvents() {
Object.values(App.elements.grids).forEach((grid) => {
grid.addEventListener("click", (event) => {
const card = event.target.closest(".product-card");
if (!card) return;
const product = App.products.find(
(item) => item.id === card.dataset.id
);
if (!product) return;
if (event.target.closest(".add-cart-btn")) {
addToCart(product);
return;
}
openModal(product);
});
});
}
function getStatusText(status) {
switch (status) {
case "available":
return "موجود";
case "unavailable":
return "ناموجود";
default:
return "نامشخص";
}
}
function getStatusClass(status) {
switch (status) {
case "available":
return "status-available";
case "unavailable":
return "status-unavailable";
default:
return "status-unknown";
}
}
function closeModal() {
App.elements.productModal.classList.remove("show");
App.state.activeModal = null;
}
App.elements.closeProduct.addEventListener(
"click",
closeModal
);
App.elements.productModal.addEventListener("click", (event) => {
if (event.target === App.elements.productModal) {
closeModal();
}
});
document.addEventListener("keydown", (event) => {
if ( event.key === "Escape" && App.elements.searchOverlay.classList.contains("show") ) { closeSearch(); }
if ( event.key === "Escape") { if (App.state.activeModal === "product") {
closeModal();
} 
if (App.state.activeModal === "cart") {
closeCart();
}
}
});
renderProducts();
initProductEvents();

function addToCart(product) {
const item = App.cart.find(
(item) => item.id === product.id
);
if (item) {
item.quantity++;
} else {
App.cart.push({
id: product.id,
quantity: 1
});
} 
updateCartCount();
saveCart();
}
function updateCartCount() {
const total = App.cart.reduce(
(sum, item) => sum + item.quantity, 0 );
App.elements.cartCount.textContent = total;
renderCart();
}
function renderCart() {
if (App.cart.length === 0) {
App.elements.clearCartBtn.style.display = "none";
App.elements.cartItems.innerHTML = `
<p class="empty-cart"> محصولی وجود ندارد </p> `;
return;
 }
 App.elements.clearCartBtn.style.display = "block";
App.elements.cartItems.innerHTML = "";
App.cart.forEach((cartItem) => {
const cartRow = createCartItem(cartItem);
if (cartRow) {
App.elements.cartItems.appendChild(cartRow);
 }
 });
 }
function createCartItem(cartItem) {
const product = App.products.find( (item) => item.id === cartItem.id );
if (!product) return null;
const row = document.createElement("div");
row.className = "cart-row";
row.dataset.id = cartItem.id;
row.innerHTML = ` 
<h3>${product.name}</h3>
<div class="cart-controls">
<button class="decrease-btn">-</button>
<span>${cartItem.quantity}</span>
<button class="increase-btn">+</button>
</div>
`;
return row;
}
function increaseCartItem(id) {
const item = App.cart.find((item) => item.id === id);
if (!item) return;
item.quantity++;
updateCartCount();
saveCart();
}
function decreaseCartItem(id) {
const item = App.cart.find((item) => item.id === id);
if (!item) return;
item.quantity--;
if (item.quantity <= 0) {
App.cart = App.cart.filter((item) => item.id !== id);
}
updateCartCount();
saveCart();
}
function clearCart() {
App.cart = [];
updateCartCount();
saveCart();
}
App.elements.cartItems.addEventListener("click", (event) => {
const row = event.target.closest(".cart-row");
if (!row) return;
const id = row.dataset.id;
if (event.target.closest(".increase-btn")) {
increaseCartItem(id);
return;
}
if (event.target.closest(".decrease-btn")) {
decreaseCartItem(id);
}
});
App.elements.clearCartBtn.addEventListener("click", () => {
clearCart();
});
function saveCart() {
const data = {
cart: App.cart
};
localStorage.setItem(
"to-data",
JSON.stringify(data)
);
}
function loadCart() {
const savedCart = localStorage.getItem("to-data");
if (!savedCart) return;
const data = JSON.parse(savedCart);
App.cart = data.cart || [];
updateCartCount();
}
loadCart();
function openSearch() {

App.elements.searchOverlay.classList.add("show");
App.elements.searchResults.innerHTML = "";

}
function closeSearch() {
App.elements.searchOverlay.classList.remove("show");
App.elements.searchInput.value = "";
App.state.search = "";
App.elements.searchResults.innerHTML = "";
App.elements.searchInput.blur();
}
function filterProducts() { const search = App.state.search .toLowerCase() .trim();
if (search.length <2) { App.elements.searchResults.innerHTML = "";
return;
}
const filteredProducts = App.products.filter((product) => { return product.name .toLowerCase() .includes(search);
});
renderSearchResults(filteredProducts);


}
function renderSearchResults(products) {
App.elements.searchResults.innerHTML = "";
if (products.length === 0) {
App.elements.searchResults.innerHTML = `
<div class="empty-search"> محصولی یافت نشد </div>
`;
return;
}
products.forEach((product) => { 
const item = document.createElement("div");
item.className = "search-item";
item.dataset.id = product.id;
item.innerHTML = `
<img src="${product.image}" alt="${product.name}">
<div class="search-item-info">
<h3>${product.name}</h3>
<span>${getStatusText(product.status)}</span>
</div>
`;
App.elements.searchResults.appendChild(item);
});
}
App.elements.searchResults.addEventListener("click", (event) => {
const item = event.target.closest(".search-item");
if (!item) return;
const product = App.products.find( (product) => product.id === item.dataset.id );
if (!product) return;
closeSearch();
openModal(product);
});
});

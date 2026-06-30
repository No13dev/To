document.addEventListener(
"DOMContentLoaded",
() => {
const menuBtn =
document.querySelector(
".menu-btn" );
const sideMenu =
document.querySelector(
".side-menu" );
const closeMenu =
document.querySelector(
".close-menu" );
const sideLinks =
document.querySelectorAll(
".side-nav a" );
menuBtn
.addEventListener(
"click",
() => {
sideMenu
.classList
.toggle("show"); } );
closeMenu
.addEventListener(
"click",
() => {
sideMenu
.classList
.remove("show"); } );
sideLinks
.forEach((link) => {
link
.addEventListener(
"click",
() => {
sideMenu
.classList
.remove("show"); } ); });
document
.addEventListener(
"click",
(event) => {
if(
!sideMenu
.contains(event.target)
&&
!menuBtn
.contains(event.target)
){
sideMenu
.classList
.remove("show"); } } );
const productsToggle=
document.querySelector(
".products-toggle" );
const productsMenu =
document.querySelector(
".products-menu" );
productsToggle
.addEventListener(
"click",
() => {
productsMenu
.classList
.toggle("show"); } );
const cards =
document.querySelectorAll(
".product-card" );
let cart =
JSON.parse(
localStorage.getItem("cart") ) || [];
cards.forEach((card) => {
const plusBtn =
document.createElement(
"button");
plusBtn.textContent =
"+";
plusBtn.classList
.add("add-cart-btn");
card.appendChild(
plusBtn);
plusBtn
.addEventListener(
"click",
(event) => {
event.stopPropagation();
const product = {
name:
card.dataset.name,
category:
card.dataset.category
};
cart.push(product);
updateCart();
});
});
const modal =
document.querySelector(
".modal" );
const closeModal =
document.querySelector(
".close-modal" );
const modalImage =
document.querySelector(
"#modal-image" );
const modalTitle =
document.querySelector(
"#modal-title" );
const modalDescription =
document.querySelector(
"#modal-description" );
const modalStatus =
document.querySelector(
"#modal-status" );
cards.forEach((card) => {
card.addEventListener(
"click",
() => {
const name =
card.dataset.name;
const description =
card.dataset.description;
const status =
card.dataset.status;
const image =
card.dataset.image;
modalImage.src =
image;
modalTitle.textContent =
name;
modalDescription
.textContent =
description;
modalStatus
.textContent =
status;
modal.style.display =
"flex"; } ); });
closeModal
.addEventListener(
"click",
() => {
modal.style.display =
"none"; } );
modal
.addEventListener(
"click",
(event) => {
if(
event.target
=== modal
){
modal.style.display =
"none"; } } );
const orderBtn =
document.querySelectorAll(
".contact-btn" );
const orderModal =
document.querySelector(
".order-modal" );
const closeOrder =
document.querySelector(
".close-order" );
const orderContent =
document.querySelector(
".order-content" );
orderBtn
.forEach((btn) => {
btn .addEventListener(
"click", () => {
orderModal
.style.display =
"flex"; } ); });
closeOrder
.addEventListener(
"click",
() => {
orderModal
.style.display =
"none"; } );
orderModal
.addEventListener(
"click",
(event) => {
if(
event.target
=== orderModal
){
orderModal
.style.display =
"none"; } } );
orderContent
.addEventListener(
"click",
(event) => {
event
.stopPropagation(); } );
const cartBtn =
document.querySelector(
".cart-floating");
const cartModal =
document.querySelector(
".cart-modal");
const closeCart =
document.querySelector(
".close-cart");
const cartItems =
document.querySelector(
".cart-items");
const cartCount =
document.querySelector(
".cart-count");
function updateCart(){
cartCount.textContent =
cart.length;
cartItems.innerHTML =
"";
const grouped = {};
cart.forEach(
(item) => {
const key =
item.category +
"-" +
item.name;
if(
!grouped[key]
){
grouped[key] = {
category:
item.category,
name:
item.name,
count: 0
};
}
grouped[key]
.count++;
});
const categories = {};
for(
let key
in grouped
){
const item =
grouped[key];
if(
!categories[
item.category
]){
categories[
item.category
] = [];
}
categories[
item.category
].push(
item
);
}
for(
let category
in categories
){
const title =
document.createElement(
"h3");
title.textContent =
category;
cartItems
.appendChild(
title);
categories[
category
].forEach(
(item) => {
const row =
document
.createElement(
"div");
row.classList
.add(
"cart-row"
);
row.innerHTML =
`
<span>
${item.name}
</span>
<div class="cart-controls">
<button class="minus-btn">
-
</button>
<span>
${item.count}
</span>
<button class="plus-btn">
+
</button>
</div>
`;
const minusBtn =
row.querySelector(
".minus-btn"
);
const plusBtn =
row.querySelector(
".plus-btn"
);
minusBtn
.addEventListener(
"click",
() => {
const index =
cart.findIndex(
(product) =>
product.name===item.name &&
product.category===item.category);
if(
index !== -1
){
cart.splice(
index,
1
);
updateCart();
}
});
plusBtn
.addEventListener(
"click",
() => {
cart.push({
name:
item.name,
category:
item.category
});
updateCart();
});
cartItems
.appendChild(
row
);
});
localStorage.setItem(
"cart",
JSON.stringify(cart) );
}
}
updateCart();
cartBtn.addEventListener("click", () => { cartModal.style.display = "flex";
});
closeCart.addEventListener("click", () => {
cartModal.style.display = "none";
});
cartModal.addEventListener("click", (e) => {
if (e.target === cartModal) {
cartModal.style.display = "none";
} });
const sections =
document.querySelectorAll(
".product-section"
);
sections.forEach(
(section) => {
const grid =
section.querySelector(
".product-grid"
);
const leftBtn =
section.querySelector(
".scroll-left"
);
const rightBtn =
section.querySelector(
".scroll-right"
);
rightBtn.addEventListener(
"click",
() => {
grid.scrollBy({
left: 350,
behavior: "smooth"
});
});
leftBtn.addEventListener(
"click",
() => {
grid.scrollBy({
left: -350,
behavior: "smooth"
});
});
updateScrollButtons(
grid,
leftBtn,
rightBtn,
);
grid.addEventListener(
"scroll",
() => {
updateScrollButtons(
grid,
leftBtn,
rightBtn,
);
}
);
window.addEventListener(
"resize",
() => {
updateScrollButtons(
grid,
leftBtn,
rightBtn,
);
}
);
});
function updateScrollButtons(
grid,
leftBtn,
rightBtn
){
const hasScroll =
grid.scrollWidth >
grid.clientWidth;
if(hasScroll){
leftBtn.style.display = "block";
rightBtn.style.display = "block";
}else{
leftBtn.style.display = "none";
rightBtn.style.display = "none";
}
}
} );


import { products,categories } from "./data.js";
let cart = JSON.parse(localStorage.getItem("to-cart")) || [];
const cartCount = document.getElementById("cart-count");
function updateCartCount(){
const total = cart.reduce((sum,item)=> sum + item.quantity, 0);
cartCount.textContent = total;}
function saveCart(){ localStorage.setItem("to-cart", JSON.stringify(cart));}
function renderProducts(){products.forEach(product =>{
const container = document.getElementById(`${product.category}-products`);
if(!container) return;
container.insertAdjacentHTML("beforeend",createProductCard(product));});}

function createProductCard(product){
const isAvailable = product.status === "available";
return`
<article class="product-card">
<div class="product-image">
<img src="${product.image}"
alt="${product.name}" loading="lazy">
</div>
<div class="product-content">
<h3 class="product-title">${product.name}</h3>
<div class="product-meta">
<span class="product-weight">
${product.weight}
</span>
<span class="status ${isAvailable ? "available" : "unavailable"}">
${isAvailable ? "موجود" : "نا موجود"}
</span>
</div>
<div class="product-bottom">
<span class="product-price">
${product.price}</span>
<button class="add-btn" type="button" data-product-id="${product.id}"
${isAvailable ? "" : "disabled"}
aria-label="افزودن ${product.name} به سبد خرید">
+
</button>
</div>
</div>
</article>
`;
}
renderProducts();

document.addEventListener("click", (event) => { 
const button = event.target.closest(".add-btn");
if (!button) return;
const productId = button.dataset.productId;
const product = products.find(product => product.id === productId);
if (!product) return;
const existingItem = cart.find(item => item.id === product.id);
if (existingItem){existingItem.quantity++;
}else{
cart.push({...product,quantity: 1});}
updateCartCount();
saveCart();
});
    
function renderCart(){
const modal = document.getElementById("modal");
const modalContent = modal.querySelector(".modal-content");
const totalPrice = cart.reduce((sum, item) =>{
const price = parseInt(item.price.replace(/\D/g, ""));
return sum + (price * item.quantity);},0);
if (cart.length === 0){
modalContent.innerHTML = `<div class="cart-header">
<h2>سبد خرید</h2>
<button class="modal-close" type="button">*</button>
</div>
<p>سبد خرید خالی است</p>`;
return;}
modalContent.innerHTML=`<div class="cart-header">
<h2>سبد خرید</h2>
<button class="modal-close" type="button">*</button>
</div>
<div class="cart-items">
${cart.map(item=>`
<div class="cart-item">
<img src="${item.image}" alt="${item.name}">
<div class="cart-item-info">
<h3>${item.name}</h3>
<p>${item.price}</p>
<div class="cart-quantity">
<button class="cart-remove" data-product-id="${item.id}">حذف</button>
<button class="cart-minus" data-product-id="${item.id}">-</button>
<span> ${item.quantity}</span>
<button class="cart-plus" data-product-id="${item.id}">+</button>
</div>
</div>
</div>
`).join("")}
</div>
<div class="cart-total"> 
<span>مجموع</span>
<strong>${totalPrice}T</strong>
</div>
<div class="cart-actions">
<button class="cart-clear" type="button">حذف سبد<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg> </button>
<button class="cart-copy" type="button">کپی سبد <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448L480 448C515.3 448 544 419.3 544 384L544 183.4C544 166 536.9 149.3 524.3 137.2L466.6 81.8C454.7 70.4 438.8 64 422.3 64L288 64zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L352 496L352 512L160 512L160 256L176 256L176 192L160 192z"/></svg> </button> 
<button class="cart-order" type="button"> ثبت سفارش <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M439.4 96L448 96C483.3 96 512 124.7 512 160L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 160C128 124.7 156.7 96 192 96L200.6 96C211.6 76.9 232.3 64 256 64L384 64C407.7 64 428.4 76.9 439.4 96zM376 176C389.3 176 400 165.3 400 152C400 138.7 389.3 128 376 128L264 128C250.7 128 240 138.7 240 152C240 165.3 250.7 176 264 176L376 176zM320 408C350.9 408 376 382.9 376 352C376 321.1 350.9 296 320 296C289.1 296 264 321.1 264 352C264 382.9 289.1 408 320 408zM226.3 477C213.4 492.6 228.5 512 248.7 512L391.2 512C411.4 512 426.5 492.6 413.6 477C398.9 459.3 376.7 448 351.9 448L287.9 448C263.1 448 240.9 459.3 226.2 477z"/></svg> </button>
</div>`;}
const navContact = document.getElementById("nav-contact");
navContact.addEventListener("click", () => {
const modalContent = modal.querySelector(".modal-content");
modalContent.innerHTML=`
<div class="contact-modal">
<div class="cart-header">
<h2>ارتباط با ما</h2>
<button class="modal-close" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg></button>
</div>
<a class="contact-item" href="tel:+989014909612">
<span class="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/></svg></span>
<div>
<strong>تماس با ما</strong>
<p>09014909612</p>
</div>
</a>
<a class="contact-item" href="https://www.google.com/maps/place/%DA%A9%D8%A7%D9%81%D9%87+%D8%AA%D9%88%E2%80%AD/@35.8110288,51.0087644,18.96z/data=!4m6!3m5!1s0x3f8dbf003f02346b:0xf81a680308a422d5!8m2!3d35.8112039!4d51.008881!16s%2Fg%2F11zkkfj1d1?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener">
<span class="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/></svg></span>
<div>
<strong>آدرس</strong>
<p>کرج تقاطع بلوار چمران و مدرس نبش سینما هجرت قهوه تو</p>
</div>
</a>
<a class="contact-item" href="https://t.me/Roonin" target="_blank" rel="noopener">
<span class="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 72C183 72 72 183 72 320C72 457 183 568 320 568C457 568 568 457 568 320C568 183 457 72 320 72zM435 240.7C431.3 279.9 415.1 375.1 406.9 419C403.4 437.6 396.6 443.8 390 444.4C375.6 445.7 364.7 434.9 350.7 425.7C328.9 411.4 316.5 402.5 295.4 388.5C270.9 372.4 286.8 363.5 300.7 349C304.4 345.2 367.8 287.5 369 282.3C369.2 281.6 369.3 279.2 367.8 277.9C366.3 276.6 364.2 277.1 362.7 277.4C360.5 277.9 325.6 300.9 258.1 346.5C248.2 353.3 239.2 356.6 231.2 356.4C222.3 356.2 205.3 351.4 192.6 347.3C177.1 342.3 164.7 339.6 165.8 331C166.4 326.5 172.5 322 184.2 317.3C256.5 285.8 304.7 265 328.8 255C397.7 226.4 412 221.4 421.3 221.2C423.4 221.2 427.9 221.7 430.9 224.1C432.9 225.8 434.1 228.2 434.4 230.8C434.9 234 435 237.3 434.8 240.6z"/></svg></span>
<div>
<strong>تلگرام</strong>
<p>Roonin</p>
</div>
</a>
</div>
`;
modal.classList.remove("hidden");
});
const navCart = document.getElementById("nav-cart");
const modal = document.getElementById("modal");
navCart.addEventListener("click",()=>{
renderCart();
modal.classList.remove("hidden");});

document.addEventListener("click", (event)=>{
const plus = event.target.closest(".cart-plus");
const minus = event.target.closest(".cart-minus");
const remove = event.target.closest(".cart-remove");
const clearCart = event.target.closest(".cart-clear");
const copyCart = event.target.closest(".cart-copy");
const orderCart = event.target.closest(".cart-order");
if(clearCart){cart=[]; 
updateCartCount(); 
saveCart(); r
enderCart();
return;}
if(copyCart){
const cartText = cart.map(item =>`
${item.name} * ${item.quantity} - ${item.price}`).join("\n");
const totalPrice = cart.reduce((sum,item)=>{
const price = parseInt(item.price.replace(/\D/g,""));
return sum + (price * item.quantity);
},0);
const finalText = `}سبد خرید تو ${cartText} مجموع: ${totalPrice}T`;
navigator.clipboard.writeText(finalText);
return;
}
if(orderCart){
return;
}

if(plus) { 
const productId = plus.dataset.productId;
const item = cart.find( item => item.id === productId);
if(!item)return;
item.quantity++;
updateCartCount();
saveCart();
renderCart();
return;}
if(minus){
const productId = minus.dataset.productId;
const item = cart.find(
item => item.id === productId);
if(!item) return;
item.quantity--;
if(item.quantity<=0){
const index =cart.findIndex(
item => item.id === productId);
if (index !== -1){cart.splice(index,1);
}}
updateCartCount();
saveCart();
renderCart();
return;}
if(remove){
const productId = remove.dataset.productId;
const index = cart.findIndex( item=>item.id === productId);
if (index !== -1){
cart.splice(index,1);
}
updateCartCount();
saveCart();
renderCart();
return;
}});
document.addEventListener("click", (event) =>{
const closeButton = event.target.closest(".modal-close");
if (!closeButton)return;
document.getElementById("modal").classList.add("hidden");});
updateCartCount();
const navSearch = document.getElementById("nav-search");
const searchPanel = document.getElementById("search-panel");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const searchClose = document.getElementById("search-close");
navSearch.addEventListener("click", ()=> {searchPanel.classList.remove("hidden");
searchInput.focus();});
searchClose.addEventListener("click", ()=> {searchPanel.classList.add("hidden");
searchInput.value = "";});
searchInput.addEventListener("input",()=>{
const query = searchInput.value.trim().toLowerCase();
if(!query){searchResults.innerHTML = "";
return;}
const results = products.filter(product => product.name.toLowerCase().includes(query));
if(results.length === 0){
searchResults.innerHTML = `
<p>محصولی پیدا نشد</p>`;
return;}
searchResults.innerHTML = results.map(product => `
<button class="search-result" type="button" data-product-id="${product.id}">
<img src="${product.image}" alt="${product.name}">
<div class="search-result-info">
<strong>${product.name}</strong>
<span>${product.weight}</span>
<span>${product.price}</span>
</div>
</button>
`).join("");});
const navProducts = document.getElementById("nav-products");
navProducts.addEventListener("click",() =>{
const modalContent = modal.querySelector(".modal-content");
modalContent.innerHTML=`
<div class="product-modal">
<div class="cart-header">
<h2>دسته بندی محصولات</h2>
<button class="modal-close" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg> </button>
</div>
<div class="product-categories"> ${categories.map(category => `<button class="category-item" type="button" data-category="${category.id}">
${category.name}
</button>
`).join("")}
</div>
</div>
`;
modal.classList.remove("hidden");});

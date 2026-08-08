import { products } from "./data.js";
function renderProducts(){
products.forEach(product => {
const container = document.getElementById(
`${product.category}-products`);
if(!container)return;
container.insertAdjacentHTML("beforeend",createProductCard(product));});}
function createProductCard(product){ return
`<article class="product-card" data-id="${product.id}">
<div class="product-image">
<img src"${product.image}"
alt="${product.name}"
loading="lazy">
</div>
<div class="product-info">
<h3 class="product-name">
${product.name}</h3>
<div class="product-bottom">
<div class="product-meta">
<span class="product-weight">
${product.weight}
</span>
<span class="product-price">
${product.price}
</span>
</div>
<button class="add-btn" type="button" data-product-id="${product.id}"
aria-label="افزودن ${product.name}"
}
+
</button>
</div>
</div>
</article>
`;}
renderProducts();

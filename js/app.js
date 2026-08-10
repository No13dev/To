import { products } from "./data.js";

function renderProducts() {
    products.forEach(product => {
        const container = document.getElementById(
            `${product.category}-products`
        );

        if (!container) return;

        container.insertAdjacentHTML(
            "beforeend",
            createProductCard(product)
        );
    });
}

function createProductCard(product) {
    return `
        <article class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>

            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>

                <div class="product-meta">
                    <span>${product.weight}</span>
                    <span>${product.price}</span>
                </div>
            </div>
        </article>
    `;
}

renderProducts();

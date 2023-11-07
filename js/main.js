const watches = [
    { id: 1, name: 'Reloj Clásico', price: 99.99 },
    { id: 2, name: 'Reloj Deportivo', price: 149.99 },
    { id: 3, name: 'Reloj de Lujo', price: 499.99 },
    { id: 4, name: 'Reloj Inteligente', price: 199.99 },
    { id: 5, name: 'Reloj antigolpes', price: 1199.99 },
    { id: 6, name: 'Reloj antiagua', price: 1289.99 },
    { id: 7, name: 'Reloj oro', price: 3599.99 },
    { id: 8, name: 'Reloj plata', price: 2000 }
];

let cart = [];
let total = 0;

// Oculta el carrito al inicio
document.getElementById('cart').style.display = 'none';

function showCart() {
    document.getElementById('cart').style.display = 'block';
}

function hideCart() {
    document.getElementById('cart').style.display = 'none';
}

function addToCart(product) {
    if (cart.length === 0) {
        showCart(); // Muestra el carrito si es el primer producto que se añade
    }
    cart.push(product);
    total += product.price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    cartItems.innerHTML = '';
    cart.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length; // Actualizar la cantidad de productos en el carrito
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product');
    productCard.innerHTML = `
        <h3>${product.name}</h3>
        <p>Precio: $${product.price.toFixed(2)}</p>
        <button class="add-to-cart">Agregar al Carrito</button>
    `;
    productCard.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product));
    return productCard;
}

function resetCart() {
    cart = [];
    total = 0;
    updateCart();
    hideCart();
}

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-list');

    watches.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });

    const checkoutButton = document.getElementById('checkout-btn');
    checkoutButton.addEventListener('click', () => {
        const dineroRecibidoInput = document.getElementById('dinero-recibido');
        const dineroRecibido = parseFloat(dineroRecibidoInput.value);
        if (dineroRecibido >= total) {
            const vuelto = dineroRecibido - total;
            alert(`Compra exitosa. Vuelto: $${vuelto.toFixed(2)}`);
            resetCart();
        } else {
            alert('El dinero recibido es insuficiente.');
        }
    });
});

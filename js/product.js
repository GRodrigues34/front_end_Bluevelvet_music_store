


// Função para adicionar um novo produto
document.getElementById('add-product-btn').addEventListener('click', function() {
    const name = prompt("Nome do produto:");
    const brand = prompt("Marca do produto:");
    const category = prompt("Categoria do produto:");
    
    if (name && brand && category) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ name, brand, category });
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    }
});

// Função para editar um produto
function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products[index];

    const newName = prompt("Novo nome do produto:", product.name);
    const newBrand = prompt("Nova marca do produto:", product.brand);
    const newCategory = prompt("Nova categoria do produto:", product.category);

    if (newName && newBrand && newCategory) {
        products[index] = { name: newName, brand: newBrand, category: newCategory };
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    }
}

// Função para excluir um produto
function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem('products'));
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

// Função para fazer logout
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
});

// Carrega os produtos na inicialização
loadProducts();

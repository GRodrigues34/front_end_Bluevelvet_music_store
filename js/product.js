// Função para adicionar um novo produto
document.getElementById('add-product-btn').addEventListener('click', function() {
    const name = prompt("Nome do produto:");
    const brand = prompt("Marca do produto:");
    const category = prompt("Categoria do produto:");
    const price = prompt("Preço do produto:");
    const description = prompt("Descrição do produto:");
    const image = prompt("URL da imagem do produto:");
    const shortDescription = prompt("Descrição curta do produto:");
    const fullDescription = prompt("Descrição completa do produto:");
    const discount = prompt("Desconto do produto:");
    const enabled = prompt("O produto está habilitado? (Sim/Não)");
    const inStock = prompt("Quantidade em estoque:");
    const dimensions = prompt("Dimensões do produto:");
    const weight = prompt("Peso do produto:");
    const cost = prompt("Custo do produto:");
    const details = prompt("Detalhes do produto (separe por vírgula):").split(',');

    if (name && brand && category) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = {
            id: Date.now().toString(), // Gerando ID único com base no timestamp
            name,
            brand,
            category,
            price,
            description,
            image,
            shortDescription,
            fullDescription,
            discount,
            enabled,
            inStock,
            dimensions,
            weight,
            cost,
            details
        };
        products.push(product);
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
    const newPrice = prompt("Novo preço do produto:", product.price);
    const newDescription = prompt("Nova descrição do produto:", product.description);
    const newImage = prompt("Nova URL da imagem do produto:", product.image);
    const newShortDescription = prompt("Nova descrição curta do produto:", product.shortDescription);
    const newFullDescription = prompt("Nova descrição completa do produto:", product.fullDescription);
    const newDiscount = prompt("Novo desconto do produto:", product.discount);
    const newEnabled = prompt("O produto está habilitado? (Sim/Não):", product.enabled);
    const newInStock = prompt("Nova quantidade em estoque:", product.inStock);
    const newDimensions = prompt("Novas dimensões do produto:", product.dimensions);
    const newWeight = prompt("Novo peso do produto:", product.weight);
    const newCost = prompt("Novo custo do produto:", product.cost);
    const newDetails = prompt("Novos detalhes do produto (separe por vírgula):", product.details.join(',')).split(',');

    if (newName && newBrand && newCategory) {
        products[index] = {
            ...product, // Mantém os campos existentes não modificados
            name: newName,
            brand: newBrand,
            category: newCategory,
            price: newPrice,
            description: newDescription,
            image: newImage,
            shortDescription: newShortDescription,
            fullDescription: newFullDescription,
            discount: newDiscount,
            enabled: newEnabled,
            inStock: newInStock,
            dimensions: newDimensions,
            weight: newWeight,
            cost: newCost,
            details: newDetails
        };
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

// Função para carregar os produtos na tabela ou lista de visualização
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('product-list');
    
    // Limpa a lista de produtos
    productList.innerHTML = '';
    
    products.forEach((product, index) => {
        const productRow = document.createElement('div');
        productRow.classList.add('product-row');
        productRow.innerHTML = `
            <div><strong>${product.name}</strong></div>
            <div>${product.category}</div>
            <div>${product.brand}</div>
            <div>R$ ${product.price}</div>
            <div>${product.enabled === 'Sim' ? 'Ativo' : 'Desativado'}</div>
            <div><button onclick="editProduct(${index})">Editar</button></div>
            <div><button onclick="deleteProduct(${index})">Excluir</button></div>
            <div><a href="view.html?id=${product.id}">Ver Detalhes</a></div>
        `;
        productList.appendChild(productRow);
    });
}

// Função para fazer logout
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
});

// Carrega os produtos na inicialização
loadProducts();

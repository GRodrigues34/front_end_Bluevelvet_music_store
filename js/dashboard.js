// Configurações globais
const itemsPerPage = 10; // Produtos por página
let currentPage = 1; // Página atual
let filteredProducts = []; // Produtos filtrados (para busca e ordenação)

// Função para obter produtos do localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}


// Função para salvar produtos no localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Função para obter o usuário atual do localStorage
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Função para exibir informações do usuário logado
function displayUserInfo() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-role').textContent = user.role;
    } else {
        alert("User not authenticated. Redirecting to login.");
        window.location.href = "index.html";
    }
}

// Função para carregar produtos na tabela
function loadProducts(sortBy = 'id', searchKeyword = '', page = 1) {
    const allProducts = getProducts();

    // Filtragem por palavra-chave
    filteredProducts = allProducts.filter(product => {
        const keyword = searchKeyword.toLowerCase();
        return (
            product.name.toLowerCase().includes(keyword) ||
            product.brand.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword)
        );
    });

    // Ordenação
    if (sortBy !== 'id') {
        filteredProducts.sort((a, b) => {
            const fieldA = a[sortBy]?.toLowerCase() || '';
            const fieldB = b[sortBy]?.toLowerCase() || '';
            return fieldA.localeCompare(fieldB);
        });
    }

    // Paginação
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    renderProductTable(paginatedProducts);
    renderPaginationControls(filteredProducts.length, page);
}

// Função para renderizar a tabela de produtos
function renderProductTable(products) {
    const productTableBody = document.getElementById('productList');
    productTableBody.innerHTML = ''; // Limpa a tabela

    if (products.length === 0) {
        productTableBody.innerHTML = '<tr><td colspan="6">No products found.</td></tr>';
        return;
    }

    products.forEach((product, index) => {
        const productRow = document.createElement('tr');
        const hasMainImage = product.mainImage && product.mainImage.url; // Check if mainImage exists
    productRow.innerHTML = `
      <td>${index + 1}</td>
      <td>
        ${hasMainImage ? `<img src="${product.mainImage.url}" alt="${product.name}" style="width: 100px; height: 100px;">` : ''}</td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>
                <button class="view-details-btn">View Details</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        productTableBody.appendChild(productRow);

        // Adiciona eventos para os botões
        productRow.querySelector('.view-details-btn').addEventListener('click', () => viewProductDetails(product));
        productRow.querySelector('.edit-btn').addEventListener('click', () => editProduct(product));
        productRow.querySelector('.delete-btn').addEventListener('click', () => deleteProduct(product.id));
    });
}

// Função para renderizar controles de paginação
function renderPaginationControls(totalProducts, currentPage) {
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Limpa os controles

    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }
    paginationContainer.style.display = 'flex';

    // Botões de navegação
    const createButton = (text, disabled, onClick) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.disabled = disabled;
        button.addEventListener('click', onClick);
        return button;
    };

    // Botão "Primeiro"
    paginationContainer.appendChild(createButton('First', currentPage === 1, () => loadProducts('id', '', 1)));

    // Botão "Anterior"
    paginationContainer.appendChild(createButton('Previous', currentPage === 1, () => loadProducts('id', '', currentPage - 1)));

    // Botões de página
    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.appendChild(createButton(i, currentPage === i, () => loadProducts('id', '', i)));
    }

    // Botão "Próximo"
    paginationContainer.appendChild(createButton('Next', currentPage === totalPages, () => loadProducts('id', '', currentPage + 1)));

    // Botão "Último"
    paginationContainer.appendChild(createButton('Last', currentPage === totalPages, () => loadProducts('id', '', totalPages)));
}

// Função para editar produto
function editProduct(product) {
    localStorage.setItem('modifiedProduct', JSON.stringify(product));
    window.location.href = "edit-product.html";
}

// Função para deletar produto
function deleteProduct(productId) {
    const confirmation = confirm("Are you sure you want to delete this product?");
    if (!confirmation) return;

    let products = getProducts();
    products = products.filter(product => product.id !== productId);
    saveProducts(products);
    loadProducts(); // Atualiza a tabela
}

// Evento de logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
});

// Evento de ordenação
document.getElementById('sortSelect').addEventListener('change', (event) => {
    loadProducts(event.target.value, '', 1); // Reinicia na página 1
});

// Função para deletar produto
function deleteProduct(productId) {
    const confirmation = confirm("Are you sure you want to delete this product?");
    if (!confirmation) return;

    let products = getProducts();

    // Confirmação de exclusão por comparação direta com IDs
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        products.splice(productIndex, 1); // Remove o produto pelo índice
        saveProducts(products);
        loadProducts(); // Atualiza a tabela
        console.log("Product deleted successfully:", productId);
    } else {
        alert("Product not found.");
    }

    // Logs para depuração
    console.log("Updated products list:", products);
}



// Evento de busca
document.getElementById('searchInput').addEventListener('input', (event) => {
    loadProducts('id', event.target.value, 1); // Reinicia na página 1
});

// Evento para redirecionar à criação de produtos
document.getElementById('addProductBtn').addEventListener('click', () => {
    const user = getCurrentUser();
    if (user && (user.role === 'admin' || user.role === 'editor')) {
        window.location.href = 'create-product.html';
    } else {
        alert("You do not have permission to add products.");
    }
});

function viewProductDetails(product) {
    // Atualiza a URL com o ID do produto
localStorage.setItem('viewProduct', JSON.stringify(product));
    window.location.href = `view-product.html?id=${product.id}`;
}

// Inicialização do dashboard
document.addEventListener('DOMContentLoaded', () => {
    displayUserInfo();
    loadProducts(); // Carrega a tabela inicial
});


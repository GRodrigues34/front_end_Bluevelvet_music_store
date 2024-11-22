// Função para carregar os detalhes do produto
function loadProductDetails() {
    // Pega o ID do produto da URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert("ID do produto não encontrado.");
        return;
    }

    // Recupera todos os produtos armazenados no localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Encontra o produto pelo ID
    const product = JSON.parse(localStorage.getItem('viewProduct'));


    // Preenche os campos da página com os dados do produto
    document.getElementById('product-id').textContent = product.id;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('category').textContent = product.category;
    document.getElementById('brand').textContent = product.brand;
    document.getElementById('main-image').src = product.image;
    document.getElementById('main-image').alt = product.name;
    document.getElementById('short-description').textContent = product.shortDescription;
    document.getElementById('full-description').textContent = product.fullDescription;
    document.getElementById('list-price').textContent = `R$ ${product.price}`;
    document.getElementById('discount').textContent = `${product.discount}%`;
    document.getElementById('enabled').textContent = product.enabled === 'Sim' ? 'Ativo' : 'Desativado';
    document.getElementById('in-stock').textContent = product.inStock;
    document.getElementById('creation-time').textContent = new Date(parseInt(product.id)).toLocaleString(); // A criação foi gerada com base no ID
    document.getElementById('update-time').textContent = new Date(parseInt(product.id)).toLocaleString(); // O mesmo vale para o tempo de atualização
    document.getElementById('dimensions').textContent = product.dimensions;
    document.getElementById('weight').textContent = product.weight;
    document.getElementById('length').textContent = product.length;
    document.getElementById('width').textContent = product.width;
    document.getElementById('height').textContent = product.height;
    document.getElementById('cost').textContent = `R$ ${product.cost}`;

    // Preenche a lista de detalhes
    const detailsList = document.getElementById('product-details-list');
    detailsList.innerHTML = ''; // Limpa a lista de detalhes
    product.details.forEach(detail => {
        const listItem = document.createElement('li');
        listItem.textContent = detail;
        detailsList.appendChild(listItem);
    });
}

// Chama a função para carregar os detalhes do produto ao carregar a página
window.onload = loadProductDetails;

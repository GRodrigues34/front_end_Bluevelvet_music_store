// Função para obter o produto modificado do localStorage
function getModifiedProduct() {
  return JSON.parse(localStorage.getItem('modifiedProduct'));
}

// Função para obter todos os produtos do localStorage
function getProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

// Função para salvar os produtos no localStorage
function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

// Função para carregar os dados do produto no formulário
function loadProductData() {
  const product = getModifiedProduct();
  if (!product) {
      alert("Nenhum produto selecionado para edição.");
      window.location.href = "dashboard.html";
      return;
  }

  // Preenche os campos do formulário
  document.getElementById('name').value = product.name || '';
  document.getElementById('short-description').value = product.shortDescription || '';
  document.getElementById('full-description').value = product.fullDescription || '';
  document.getElementById('brand').value = product.brand || '';
  document.getElementById('category').value = product.category || '';
  document.getElementById('list-price').value = product.listPrice || 0;
  document.getElementById('discount').value = product.discount || 0;
  document.getElementById('stock').value = product.stock || 0;
  document.getElementById('enabled').checked = product.enabled || false;
  document.getElementById('unit-system').value = product.unitSystem || 'metric';
  document.getElementById('length').value = product.dimensions?.length || 0;
  document.getElementById('width').value = product.dimensions?.width || 0;
  document.getElementById('height').value = product.dimensions?.height || 0;
  document.getElementById('weight').value = product.dimensions?.weight || 0;
  document.getElementById('cost').value = product.cost || 0;

  // Configuração da imagem principal e imagens em destaque (não carregam arquivo, apenas informam)
  if (product.mainImage) {
      document.getElementById('main-image').dataset.currentImage = product.mainImage.url;
  }

  if (product.featuredImages) {
      document.getElementById('featured-images').dataset.currentImages = JSON.stringify(product.featuredImages);
  }
}

// Função para salvar os dados atualizados do formulário
function saveUpdatedProduct(event) {
  event.preventDefault();

  const updatedProduct = {
      ...getModifiedProduct(), // Mantém o ID original e outros valores
      name: document.getElementById('name').value,
      shortDescription: document.getElementById('short-description').value,
      fullDescription: document.getElementById('full-description').value,
      brand: document.getElementById('brand').value,
      category: document.getElementById('category').value,
      listPrice: parseFloat(document.getElementById('list-price').value),
      discount: parseFloat(document.getElementById('discount').value),
      stock: parseInt(document.getElementById('stock').value, 10),
      enabled: document.getElementById('enabled').checked,
      unitSystem: document.getElementById('unit-system').value,
      dimensions: {
          length: parseFloat(document.getElementById('length').value),
          width: parseFloat(document.getElementById('width').value),
          height: parseFloat(document.getElementById('height').value),
          weight: parseFloat(document.getElementById('weight').value),
      },
      cost: parseFloat(document.getElementById('cost').value),
      mainImage: {
          url: document.getElementById('main-image').dataset.currentImage || '',
      },
      featuredImages: JSON.parse(document.getElementById('featured-images').dataset.currentImages || '[]'),
  };

  const products = getProducts();
  const productIndex = products.findIndex(product => product.id === updatedProduct.id);

  if (productIndex !== -1) {
      products[productIndex] = updatedProduct; // Atualiza o produto na lista
      saveProducts(products);
      alert("Produto atualizado com sucesso!");
      window.location.href = "dashboard.html";
  } else {
      alert("Erro ao salvar o produto. Tente novamente.");
  }
}

// Função para manipular o botão de "voltar"
document.getElementById('back').addEventListener('click', () => {
  window.location.href = "dashboard.html";
});

// Função para testar preenchimento automático

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadProductData();

  // Configuração do envio do formulário
  document.getElementById('product-form').addEventListener('submit', saveUpdatedProduct);
});

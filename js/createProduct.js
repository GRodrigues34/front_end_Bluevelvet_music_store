document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('product-form');
  const productList = document.getElementById('product-list');
  const loginSection = document.getElementById('login-section');
  const productFormSection = document.getElementById('product-form-section');
  const loginButton = document.getElementById('login-btn');
  const addDetailButton = document.getElementById('add-detail-btn');
  const productDetailsContainer = document.getElementById('product-details');
  const unitSystem = document.getElementById('unit-system');

  const loadProducts = () => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    productList.innerHTML = '';
    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.mainImage.url}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.shortDescription}</p>
            <p><strong>Preço:</strong> $${product.listPrice}</p>
            <p><strong>Categoria:</strong> ${product.category}</p>
            <button class="view-details-btn">Ver Detalhes</button>
        `;
        productList.appendChild(productCard);

        // Botão para ver detalhes do produto
        const viewDetailsButton = productCard.querySelector('.view-details-btn');
        viewDetailsButton.addEventListener('click', () => {
            viewProductDetails(product); // Redireciona para a página de detalhes
        });
    });
  };

  loadProducts();

  // Função para exibir detalhes do produto
  function viewProductDetails(product) {
    // Atualiza a URL com o ID do produto
    window.location.href = `view-product.html?id=${product.id}`;
  }

  function viewProductDetails(product) {
    // Atualiza a URL com o ID do produto
localStorage.setItem('viewProduct', JSON.stringify(product));
    window.location.href = `view-product.html?id=${product.id}`;
}

  // Adicionar Detalhes do Produto
  addDetailButton.addEventListener('click', () => {
    const detailDiv = document.createElement('div');
    detailDiv.innerHTML = `
      <input type="text" placeholder="Nome">
      <input type="text" placeholder="Valor">
    `;
    productDetailsContainer.appendChild(detailDiv);
  });

  document.getElementById('back').addEventListener('click', function() {
    window.location.href = "dashboard.html";
  });

  // Atualizar unidades conforme a seleção
  unitSystem.addEventListener('change', () => {
    const isMetric = unitSystem.value === 'metric';
    const unitLabels = isMetric
      ? { length: 'cm', width: 'cm', height: 'cm', weight: 'kg' }
      : { length: 'polegadas', width: 'polegadas', height: 'polegadas', weight: 'libras' };

    document.getElementById('length').placeholder = `Comprimento (${unitLabels.length})`;
    document.getElementById('width').placeholder = `Largura (${unitLabels.width})`;
    document.getElementById('height').placeholder = `Altura (${unitLabels.height})`;
    document.getElementById('weight').placeholder = `Peso (${unitLabels.weight})`;
  });

  // Verificar unicidade antes de salvar
  const isNameUnique = (name) => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return !products.some((product) => product.name.toLowerCase() === name.toLowerCase());
  };

  // Salvar Produto
  const saveProduct = (product) => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
  };


   // Image upload functions
   function handleImageUpload(event, imageType) {
    const file = event.target.files[0];
    const newProduct = {};

    if (file && file.type.startsWith('image/png')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        newProduct[imageType] = {
          url: base64String, // Store image as base64 for localStorage
        };
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a PNG image.');
    }
  }

  // Event listener for main image upload
  document.getElementById('main-image').addEventListener('change', (event) => {
    handleImageUpload(event, 'mainImage');
  });

  // Event listener for featured images upload (multiple files)
  document.getElementById('featured-images').addEventListener('change', (event) => {
    const newProduct = {};
    const featuredImages = [];

    for (const file of event.target.files) {
      if (file.type.startsWith('image/png')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          featuredImages.push({ url: e.target.result });
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload only PNG images for featured images.');
      }
    }

    newProduct.featuredImages = featuredImages;


  // Manipulação de envio do formulário de produto
  productForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const productName = document.getElementById('name').value;
    const productDescription = document.getElementById('short-description').value;
    const productFullDescription = document.getElementById('full-description').value;
    const productPrice = parseFloat(document.getElementById('list-price').value);
    const productCategory = document.getElementById('category').value;
    const productBrand = document.getElementById('brand').value;
    const discountPercent = parseFloat(document.getElementById('discount').value) || 0;
    const stock = parseInt(document.getElementById('stock').value, 10);
    const enabled = document.getElementById('enabled').checked;
    const cost = document.getElementById('cost').value;
    const unitSystem = document.getElementById('unit-system').value;
    const productlength = document.getElementById('length').value;
    const width = document.getElementById('width').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const productDetails = [];

    // Captura os detalhes adicionais do produto
    const detailInputs = document.querySelectorAll('#product-details input');
    for (let i = 0; i < detailInputs.length; i += 2) {
      productDetails.push({
        name: detailInputs[i].value,
        value: detailInputs[i + 1].value
      });
    }

    // Verificar campos obrigatórios
    if (!productName || !productDescription || !productPrice || !productCategory || !productBrand) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!isNameUnique(productName)) {
      alert('Produto com esse nome já existe.');
      return;
    }

    const mainImageFile = document.getElementById('main-image').files[0];
    const featuredImagesFiles = document.getElementById('featured-images').files;

    const newProduct = {
      id: Date.now(),  // ID único gerado pelo timestamp
      name: productName,
      shortDescription: productDescription,
      fullDescription: productFullDescription,
      listPrice: productPrice,
      discountPercent: discountPercent,
      stock: stock,
      enabled: enabled,
      category: productCategory,
      brand: productBrand,
      unitSystem: unitSystem,
      cost: cost,
      length: productlength,
      width: width,
      height: height,
      weight: weight,
      mainImage: {
        url: mainImageFile ? URL.createObjectURL(mainImageFile) : null, // Handle potential absence of main image
      },
      featuredImages: Array.from(featuredImagesFiles).map(file => URL.createObjectURL(file)),
      productDetails: productDetails,
      creationTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
    };
    
    saveProduct(newProduct);
    alert('Produto adicionado com sucesso!');
    productForm.reset();
    productFormSection.style.display = 'block';
    loginSection.style.display = 'block';
  });
})});

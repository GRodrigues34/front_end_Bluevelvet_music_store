document.addEventListener('DOMContentLoaded', () => {
    // ... existing code from your product creation script
  
    // Function to pre-populate the form with product details
    const populateProductForm = (product) => {
      document.getElementById('name').value = product.name;
      document.getElementById('short-description').value = product.shortDescription;
      document.getElementById('full-description').value = product.fullDescription;
      document.getElementById('list-price').value = product.listPrice;
      document.getElementById('category').value = product.category;
      document.getElementById('brand').value = product.brand;
      document.getElementById('discount').value = product.discountPercent || 0;
      document.getElementById('stock').value = product.stock;
      document.getElementById('enabled').checked = product.enabled;
  
      // Clear existing details before populating
      document.getElementById('product-details').innerHTML = '';
  
      // Populate additional details
      product.productDetails.forEach(detail => {
        const detailDiv = document.createElement('div');
        detailDiv.innerHTML = `
          <input type="text" placeholder="Nome" value="${detail.name}">
          <input type="text" placeholder="Valor" value="${detail.value}">
        `;
        document.getElementById('product-details').appendChild(detailDiv);
      });
  
      // Update main image preview (if available)
      const mainImagePreview = document.getElementById('main-image-preview');
      if (product.mainImage && product.mainImage.url) {
        mainImagePreview.src = product.mainImage.url;
        mainImagePreview.style.display = 'block';
      } else {
        mainImagePreview.src = '';
        mainImagePreview.style.display = 'none';
      }
  
      // Update featured images preview (if available)
      const featuredImagesPreview = document.getElementById('featured-images-preview');
      featuredImagesPreview.innerHTML = '';
      if (product.featuredImages && product.featuredImages.length) {
        product.featuredImages.forEach(imageUrl => {
          const imageElement = document.createElement('img');
          imageElement.src = imageUrl;
          featuredImagesPreview.appendChild(imageElement);
        });
        featuredImagesPreview.style.display = 'block';
      } else {
        featuredImagesPreview.style.display = 'none';
      }
    };
  
    // Functionality to edit a product
    const editProduct = (productId) => {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      const productToEdit = products.find(product => product.id === productId);
  
      if (productToEdit) {
        populateProductForm(productToEdit);
  
        // Update form action to handle edit instead of create
        productForm.action = `edit-product.html?id=${productId}`;
  
        productForm.addEventListener('submit', (event) => {
          event.preventDefault();
  
          // ... existing logic from product creation submit event (modify as needed)
  
          const updatedProduct = {
            // ... populate updated product object with new values
          };
  
          // Update product in localStorage
          const updatedProducts = products.map(product => 
            product.id === productId ? updatedProduct : product
          );
          localStorage.setItem('products', JSON.stringify(updatedProducts));
  
          alert('Produto editado com sucesso!');
          productForm.reset();
          // ... potentially redirect to product list page
        });
  
        // Show edit form and hide product list/creation section
        productFormSection.style.display = 'block';
        loginSection.style.display = 'none';
        productList.style.display = 'none';
      } else {
        alert('Produto não encontrado.');
      }
    };
  
    // Handle edit button click (assuming you have buttons with product IDs)
    const editButtons = document.querySelectorAll('.edit-product-btn');
    editButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId; // Assuming button has data-product-id attribute
        editProduct(productId);
      });
    });
  
        // Load products and add edit buttons
        const loadProducts = () => {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
    
            products.forEach(product => {
                const li   
     = document.createElement('li');
                li.textContent = product.name;   
    
    
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.dataset.productId = product.id;
                editButton.addEventListener('click', () => {
                    editProduct(product.id);
                });
    
                li.appendChild(editButton);
                productList.appendChild(li);
            });
        };
    
        loadProducts();
    });

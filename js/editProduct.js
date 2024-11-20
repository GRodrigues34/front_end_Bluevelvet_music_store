document.getElementById('back').addEventListener('click', function(){
  window.location.href = "dashboard.html";
});

// Retrieve the product data from localStorage
const productData = JSON.parse(localStorage.getItem('modifiedProduct'));

// Populate the form fields with the product data
const form = document.getElementById('product-form');
const productName = productData.name;
form.elements['name'].value = productData.name;
form.elements['short-description'].value = productData.shortDescription;
form.elements['full-description'].value = productData.fullDescription || ""; // Handle potential missing property
form.elements['brand'].value = productData.brand;
form.elements['category'].value = productData.category;
form.elements['list-price'].value = productData.listPrice;
form.elements['discount'].value = productData.discountPercent || ""; // Handle potential missing property
form.elements['stock'].value = productData.stock;
form.elements['enabled'].checked = productData.enabled || false; // Handle potential missing property (assuming boolean)
form.elements['unit-system'].value = productData.unitSystem || ""; // Handle potential missing property
form.elements['length'].value = productData.length;

if (productData.width) {
  form.elements['width'].value = productData.width;
}
if (productData.height) {
  form.elements['height'].value = productData.height;
}
if (productData.weight) {
  form.elements['weight'].value = productData.weight;
}

form.elements['cost'].value = productData.cost;

form.elements['main-image'].value = productData.mainImage;
form.elements['featured-images'].value = productData.featuredImages;

// Handle product details (assuming they are stored in an array)
if (productData.productDetails && productData.productDetails.length > 0) {
  const productDetailsContainer = document.getElementById('product-details');
  productDetailsContainer.innerHTML = ""; // Clear existing details (optional)
  for (const detail of productData.productDetails) {
    // You might need to create additional elements to display each detail
    console.log("Detail:", detail); // Replace with your logic to display each detail
  }
}
document.getElementById('teste').addEventListener('click', function(){
  console.log(productData);
});


// ... rest of your code for handling form submission and "Back" button

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

// Update the product data with the form values
productData.name = form.elements['name'].value;
productData.shortDescription = form.elements['short-description'].value;
productData.fullDescription = form.elements['full-description'].value;
productData.brand = form.elements['brand'].value;
productData.category = form.elements['category'].value;
productData.listPrice = form.elements['list-price'].value;
productData.discount = form.elements['discount'].value; // Assuming discount is a number
productData.stock = form.elements['stock'].value;
productData.enabled = form.elements['enabled'].checked;
productData.mainImage = form.elements['main-image'].value;
productData.featuredImages = form.elements['featured-images'].value;

// Handle dimensions (assuming they are stored as separate properties)
productData.length = form.elements['length'].value;
productData.width = form.elements['width'].value;
productData.height = form.elements['height'].value;
productData.weight = form.elements['weight'].value;

productData.cost = form.elements['cost'].value;

// Handle product details (assuming they are stored in an array)
const productDetailsInput = document.getElementById('product-details'); // Assuming details are entered in a text area
productData.productDetails = productDetailsInput.value.split('\n'); // Split by newlines to create an array

  // Store the updated product data in localStorage
  const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(productData);
    localStorage.setItem('products', JSON.stringify(products));
  

    const produtosString = localStorage.getItem('products');

    // Filtra os produtos para encontrar o produto a ser excluído
    products = products.filter(product => product.name !== productName);

    // Atualiza o localStorage com a nova lista de produtos
    localStorage.setItem('produtos', JSON.stringify(products));


  // Display a success message and redirect to the desired page
  alert('Produto atualizado com sucesso!');
  window.location.href = 'dashboard.html';
});

// Handle the "Back" button click
document.getElementById('back').addEventListener('click', () => {
  window.location.href = 'product-list.html';
});
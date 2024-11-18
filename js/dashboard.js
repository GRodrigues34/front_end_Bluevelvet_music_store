document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
});

document.getElementById('addProductBtn').addEventListener('click', function(){
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if(user.role == "admin" || user.role == "editor"){
    window.location.href = "create-product.html"
    } else {
        alert("Invalid role");
    }
})

function displayUserInfo() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
  
    if (user) {
      const userNameElement = document.getElementById('user-name');
      const userRoleElement = document.getElementById('user-role');
  
      userNameElement.textContent = user.name;
      userRoleElement.textContent = user.role;  
    } else {
        alert("user not found");
        window.location.href = "index.html";
    }
}
displayUserInfo();

// Função para carregar produtos na tabela

 sort = document.getElementById('sortSelect').value;
const loadProducts = (sortBy = sort, currentPage = 1) => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
  
    // Sorting (optional)
    if (sortBy !== 'id') {
      products.sort((a, b) => {
        const sortField = sortBy.toLowerCase();
        if (a[sortField] < b[sortField]) return -1;
        if (a[sortField] > b[sortField]) return 1;
        return 0;
      });
    }
  
    // Pagination (optional)
    const productsPerPage = 10;
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, products.length);
    const paginatedProducts = products.slice(startIndex, endIndex);
  
    // Clear table body
    productList.innerHTML = '';
  
    const productTableBody = document.getElementById('productList');
  
    paginatedProducts.forEach((product, index) => {
      const productRow = document.createElement('tr');
      productRow.innerHTML = `
        <td>${index + startIndex + 1}</td> <td><img src="${product.mainImage.url}" alt="${product.name}" style="width: 100px; height: 100px;"></td>
        <td>${product.name}</td>
        <td>${product.brand}</td>
        <td>${product.category}</td>
        <td>
          <button>View Details</button>
          <button>Edit</button>
          <button class="delete-btn">Delete</button>
        </td>
      `;
      productTableBody.appendChild(productRow);
    });
};


// Carrega os produtos na inicialização
loadProducts();
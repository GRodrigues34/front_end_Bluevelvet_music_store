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
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tbody = document.getElementById('productList').getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}


// Carrega os produtos na inicialização
loadProducts();
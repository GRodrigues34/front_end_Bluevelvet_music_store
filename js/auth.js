// auth.js

// Função para realizar login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('login-error');

    // Recupera usuários do LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Verifica se o usuário existe e se a senha está correta
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Armazena o usuário atual no LocalStorage e redireciona para o painel
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        // Mensagem de erro se o e-mail ou senha estiverem incorretos
        errorMessage.textContent = "E-mail ou senha incorreto. Por favor, tente novamente.";
    }
});

// Função para registrar um novo usuário
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('role').value;

    // Verifica se já existe um usuário com o mesmo e-mail
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        alert("Usuário já registrado.");
        return;
    }

    // Adiciona o novo usuário ao LocalStorage
    users.push({ email, password, role });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Usuário registrado com sucesso!");
    window.location.href = "index.html";
});

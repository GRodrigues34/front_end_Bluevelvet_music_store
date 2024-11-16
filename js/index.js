document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

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
        errorMessage.style.display = 'block';
    }
});

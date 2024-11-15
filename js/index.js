document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('login-error');

    // Exemplo de validação simples
    if (email === "admin@bluevelvet.com" && password === "password123") {
        // Salvar no localStorage se 'lembrar-me' estiver marcado
        if (document.querySelector('input[name="remember-me"]').checked) {
            localStorage.setItem('isAuthenticated', 'true');
        }
        // Redirecionar para o painel
        window.location.href = "dashboard.html";
    } else {
        errorMessage.textContent = "E-mail ou senha incorreto. Por favor, tente novamente.";
    }
});

// helper function to display a message (could be extended for real alerts or modals)
function showMessage(message) {
    alert(message);
  }
  
  // handling form submission
  document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form default submission
  
    // retrieve form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
  
    // Validation
    if (!name || !email || !password || !role) {
      showMessage('All fields are required!');
      return;
    }
  
    // Check if user already exists
    const existingUser = JSON.parse(localStorage.getItem('users'))?.find(user => user.email === email);
    if (existingUser) {
      showMessage('User already exists! Please login.');
      return;
    }
  
    // Get existing users from Local Storage (or create an empty array)
    let users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Add new user
    users.push({ name, email, password, role });
  
    // Save users array back to Local Storage
    localStorage.setItem('users', JSON.stringify(users));
  
    showMessage('User registered successfully!');
    window.location.href = "index.html";
  
    // Clear form
    document.getElementById('registerForm').reset();
  });
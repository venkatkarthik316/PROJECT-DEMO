// Function to register a new user
function registerUser() {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;
    let message = document.getElementById("signup-message");
  
    if (username === "" || password === "") {
        message.innerText = "Please fill in all fields!";
        return;
    }
  
    // Check if user already exists
    if (localStorage.getItem(username)) {
        message.innerText = "User already exists!";
    } else {
        localStorage.setItem(username, password);
        message.style.color = "green";
        message.innerText = "Signup successful! Redirecting to login...";
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    }
  }
  
  // Function to log in a user
  function loginUser() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;
    let message = document.getElementById("login-message");
  
    if (username === "" || password === "") {
        message.innerText = "Please enter your credentials!";
        return;
    }
  
    let storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
        message.style.color = "green";
        message.innerText = "Login successful! Redirecting...";
        setTimeout(() => {
            window.location.href = "http://127.0.0.1:5500/website.html"; // Redirect to second website
        }, 1500);
    } else {
        message.innerText = "Invalid username or password!";
    }
  }
  
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', 'admin');
        window.location.href = "admin.html";
    } else if (username === "user" && password === "user123") {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', 'user');
        window.location.href = "index.html";
    } else {
        document.getElementById("loginError").innerText = "Login gagal!";
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    window.location.href = "login.html";
}

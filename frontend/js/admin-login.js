document.getElementById("adminLoginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value;

        const password =
            document.getElementById("password").value;


        // Demo admin credentials
        if (username === "admin" && password === "admin123") {

            localStorage.setItem("adminLoggedIn", "true");

            window.location.href = "admin-dashboard.html";

        } else {

            document.getElementById("message").innerHTML = `
                <div class="alert alert-danger">
                    Invalid username or password.
                </div>
            `;

        }

    });
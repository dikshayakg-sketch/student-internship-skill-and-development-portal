document.getElementById("registerForm").addEventListener("submit", async function(event) {

    event.preventDefault();

         const student = {
    name: document.getElementById("name").value,
    department: document.getElementById("department").value,
    year: parseInt(document.getElementById("year").value),
    skills: document.getElementById("skills").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
};

    try {

        const response = await fetch("http://localhost:8080/api/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        if (response.ok) {

            const data = await response.json();

            document.getElementById("message").innerHTML =
                `<div class="alert alert-success">
                    Registration successful! Student ID: ${data.id}
                </div>`;

            document.getElementById("registerForm").reset();

        } else {

            document.getElementById("message").innerHTML =
                `<div class="alert alert-danger">
                    Registration failed.
                </div>`;
        }

    } catch (error) {

        document.getElementById("message").innerHTML =
            `<div class="alert alert-danger">
                Cannot connect to the backend.
                Make sure Spring Boot is running.
            </div>`;

        console.error(error);
    }

});
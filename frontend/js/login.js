document.getElementById("loginForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        try {

            const response = await fetch(
                "http://localhost:8080/api/students"
            );

            if (!response.ok) {
                throw new Error("Failed to load students");
            }

            const students = await response.json();

            // Find student using email AND password
            const student = students.find(function(student) {

                return student.email === email &&
                       student.password === password;

            });


            if (student) {

                // Save student information
                localStorage.setItem(
                    "studentId",
                    student.id
                );

                localStorage.setItem(
                    "studentName",
                    student.name
                );

                localStorage.setItem(
                    "studentEmail",
                    student.email
                );

                // Go to dashboard
                window.location.href =
                    "dashboard.html";

            } else {

                document.getElementById("message").innerHTML = `
                    <div class="alert alert-danger">
                        Invalid email or password.
                    </div>
                `;
            }

        } catch (error) {

            document.getElementById("message").innerHTML = `
                <div class="alert alert-danger">
                    Cannot connect to backend.
                    Make sure Spring Boot is running.
                </div>
            `;

            console.error(error);
        }

    });
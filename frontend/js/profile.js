const studentId = localStorage.getItem("studentId");

if (!studentId) {
    alert("Please login first.");
    window.location.href = "login.html";
}


// Load student profile
async function loadProfile() {

    try {

        const response = await fetch(
            `http://localhost:8080/api/students/${studentId}`
        );

        if (!response.ok) {
            throw new Error("Failed to load profile");
        }

        const student = await response.json();

        document.getElementById("name").value =
            student.name;

        document.getElementById("department").value =
            student.department;

        document.getElementById("year").value =
            student.year;

        document.getElementById("skills").value =
            student.skills;

        document.getElementById("email").value =
            student.email;

    } catch (error) {

        document.getElementById("message").innerHTML = `
            <div class="alert alert-danger">
                Unable to load profile.
            </div>
        `;

        console.error(error);
    }
}


// Update student profile
document.getElementById("profileForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const updatedStudent = {

            name:
                document.getElementById("name").value,

            department:
                document.getElementById("department").value,

            year:
                parseInt(
                    document.getElementById("year").value
                ),

            skills:
                document.getElementById("skills").value,

            email:
                document.getElementById("email").value
        };


        try {

            const response = await fetch(
                `http://localhost:8080/api/students/${studentId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(updatedStudent)
                }
            );


            if (!response.ok) {
                throw new Error(
                    "Failed to update profile"
                );
            }


            const student = await response.json();


            // Update local storage
            localStorage.setItem(
                "studentName",
                student.name
            );

            localStorage.setItem(
                "studentEmail",
                student.email
            );


            document.getElementById("message").innerHTML = `
                <div class="alert alert-success">
                    Profile updated successfully!
                </div>
            `;


        } catch (error) {

            document.getElementById("message").innerHTML = `
                <div class="alert alert-danger">
                    Unable to update profile.
                </div>
            `;

            console.error(error);
        }

    });


// Load profile when page opens
loadProfile();
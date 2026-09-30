const studentId = localStorage.getItem("studentId");
const selectedInternshipId = localStorage.getItem("selectedInternshipId");

if (!studentId) {
    alert("Please login first.");
    window.location.href = "login.html";
}


// ==========================================
// APPLY FOR INTERNSHIP
// ==========================================
async function applyForInternship() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/applications",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    studentId: parseInt(studentId),
                    internshipId: parseInt(selectedInternshipId),
                    status: "Applied"
                })
            }
        );

        // Read the response first
        const responseText = await response.text();

        // Handle duplicate application
        if (!response.ok) {

            if (responseText.includes("already applied")) {

                document.getElementById("message").innerHTML = `
                    <div class="alert alert-warning">
                        You have already applied for this internship.
                    </div>
                `;

                localStorage.removeItem("selectedInternshipId");

                loadApplications();

                return;
            }

            throw new Error(responseText || "Application failed");
        }

        // Convert successful response to JSON
        const data = JSON.parse(responseText);

        document.getElementById("message").innerHTML = `
            <div class="alert alert-success">
                Application submitted successfully!
                <br>
                Application ID: ${data.id}
            </div>
        `;

        localStorage.removeItem("selectedInternshipId");

        loadApplications();

    } catch (error) {

        document.getElementById("message").innerHTML = `
            <div class="alert alert-danger">
                ${error.message || "Unable to submit application."}
            </div>
        `;

        console.error("Application error:", error);
    }
}

// ==========================================
// LOAD MY APPLICATIONS
// ==========================================

async function loadApplications() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/applications"
        );

       if (!response.ok) {

    const errorText = await response.text();

    if (errorText.includes("already applied")) {

        document.getElementById("message").innerHTML = `
            <div class="alert alert-warning">
                You have already applied for this internship.
            </div>
        `;

        localStorage.removeItem("selectedInternshipId");

        return;
    }

    throw new Error("Application failed");
}

        const applications = await response.json();

        const applicationList =
            document.getElementById("applicationList");

        const myApplications =
            applications.filter(function(application) {

                return application.studentId == studentId;

            });


        if (myApplications.length === 0) {

            applicationList.innerHTML = `
                <div class="alert alert-info">
                    You have not applied for any internships yet.
                </div>
            `;

            return;
        }


        applicationList.innerHTML = "";


        // Load internship information for each application

        for (const application of myApplications) {

            try {

                const internshipResponse =
                    await fetch(
                        `http://localhost:8080/api/internships/${application.internshipId}`
                    );

                let internship = null;

                if (internshipResponse.ok) {

                    internship =
                        await internshipResponse.json();

                }


                applicationList.innerHTML += `

                    <div class="card shadow mb-4">

                        <div class="card-body">

                            <h4 class="text-primary">
                                ${internship
                                    ? internship.role
                                    : "Internship"}
                            </h4>

                            <h6>
                                ${internship
                                    ? internship.companyName
                                    : "Company information unavailable"}
                            </h6>

                            <hr>

                            <p>
                                <strong>Application ID:</strong>
                                ${application.id}
                            </p>

                            <p>
                                <strong>Internship ID:</strong>
                                ${application.internshipId}
                            </p>

                            ${
                                internship
                                ? `
                                   

                                <p>
    <strong>Required Skills:</strong>
    ${internship.requiredSkills}
</p>

<p>
    <strong>Description:</strong>
    ${internship.description || "No description available"}
</p>

<p>
    <strong>Duration:</strong>
    ${internship.duration}
</p>

                                    <p>
                                        <strong>Location:</strong>
                                        ${internship.location}
                                    </p>
                                `
                                : ""
                            }

                            <p>
                                <strong>Status:</strong>

                                <span class="badge bg-primary">
                                    ${application.status}
                                </span>

                            </p>

                        </div>

                    </div>

                `;
            }

            catch (error) {

                console.error(
                    "Unable to load internship details:",
                    error
                );

            }
        }

    }

    catch (error) {

        document.getElementById("applicationList").innerHTML = `
            <div class="alert alert-danger">
                Cannot load applications.
                Please make sure Spring Boot is running.
            </div>
        `;

        console.error(error);
    }
}


// ==========================================
// START PAGE
// ==========================================

if (selectedInternshipId) {

    applyForInternship();

} else {

    loadApplications();

}
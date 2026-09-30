// ==========================================
// CHECK ADMIN LOGIN
// ==========================================

if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem("adminLoggedIn");

    window.location.href = "admin-login.html";
}


// ==========================================
// HIDE ALL SECTIONS
// ==========================================

function hideAllSections() {

    document.getElementById("addInternshipForm").style.display = "none";

    document.getElementById("internshipSection").style.display = "none";

    document.getElementById("studentSection").style.display = "none";

    document.getElementById("applicationSection").style.display = "none";
}


// ==========================================
// SHOW ADD INTERNSHIP FORM
// ==========================================

function showAddInternshipForm() {

    hideAllSections();

    document.getElementById("addInternshipForm").style.display = "block";

    document.getElementById("result").innerHTML = "";

    window.scrollTo({
        top: document.getElementById("addInternshipForm").offsetTop - 80,
        behavior: "smooth"
    });
}


// ==========================================
// ADD INTERNSHIP
// ==========================================

document.getElementById("internshipForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const internship = {

            companyName:
                document.getElementById("companyName").value,

            role:
                document.getElementById("role").value,

            requiredSkills:
                document.getElementById("requiredSkills").value,

            duration:
                document.getElementById("duration").value,

            location:
                document.getElementById("location").value,

            description:
                document.getElementById("description").value
        };


        try {

            const response = await fetch(
                "http://localhost:8080/api/internships",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(internship)
                }
            );


            if (!response.ok) {
                throw new Error("Failed to add internship");
            }


            const data = await response.json();


            document.getElementById("result").innerHTML = `
                <div class="alert alert-success">
                    Internship added successfully!
                    <br>
                    Internship ID: ${data.id}
                </div>
            `;


            document.getElementById("internshipForm").reset();

            loadInternships();

        } catch (error) {

            document.getElementById("result").innerHTML = `
                <div class="alert alert-danger">
                    Unable to add internship.
                    Make sure Spring Boot is running.
                </div>
            `;

            console.error(error);
        }

    });


// ==========================================
// LOAD INTERNSHIPS
// ==========================================

async function loadInternships() {

    hideAllSections();

    document.getElementById("internshipSection").style.display = "block";


    try {

        const response = await fetch(
            "http://localhost:8080/api/internships"
        );


        if (!response.ok) {
            throw new Error("Failed to load internships");
        }


        const internships = await response.json();


        const internshipList =
            document.getElementById("internshipList");


        if (internships.length === 0) {

            internshipList.innerHTML = `
                <div class="alert alert-info">
                    No internships available.
                </div>
            `;

            return;
        }


        internshipList.innerHTML = "";


        internships.forEach(function(internship) {

            internshipList.innerHTML += `

                <div class="card shadow mb-4">

                    <div class="card-body">

                        <h4 class="text-primary">
                            ${internship.role}
                        </h4>

                        <h6>
                            ${internship.companyName}
                        </h6>

                        <hr>

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

                        <button
                            class="btn btn-warning me-2"
                            onclick="editInternship(${internship.id})">
                            Edit
                        </button>

                        <button
                            class="btn btn-danger"
                            onclick="deleteInternship(${internship.id})">
                            Delete
                        </button>

                    </div>

                </div>

            `;

        });


        window.scrollTo({
            top: document.getElementById("internshipSection").offsetTop - 80,
            behavior: "smooth"
        });


    } catch (error) {

        document.getElementById("internshipList").innerHTML = `
            <div class="alert alert-danger">
                Unable to load internships.
            </div>
        `;

        console.error(error);
    }
}


// ==========================================
// EDIT INTERNSHIP
// ==========================================

async function editInternship(id) {

    const companyName = prompt("Enter company name:");

    if (companyName === null) {
        return;
    }


    const role = prompt("Enter internship role:");

    if (role === null) {
        return;
    }


    const requiredSkills = prompt("Enter required skills:");

    if (requiredSkills === null) {
        return;
    }


    const duration = prompt("Enter duration:");

    if (duration === null) {
        return;
    }


    const location = prompt("Enter location:");

    if (location === null) {
        return;
    }


    const description = prompt("Enter internship description:");

    if (description === null) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:8080/api/internships/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    companyName: companyName,
                    role: role,
                    requiredSkills: requiredSkills,
                    duration: duration,
                    location: location,
                    description: description

                })
            }
        );


        if (!response.ok) {
            throw new Error("Failed to update internship");
        }


        alert("Internship updated successfully.");

        loadInternships();


    } catch (error) {

        alert("Unable to update internship.");

        console.error(error);
    }
}


// ==========================================
// DELETE INTERNSHIP
// ==========================================

async function deleteInternship(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this internship?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:8080/api/internships/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {
            throw new Error("Failed to delete internship");
        }


        alert("Internship deleted successfully.");

        loadInternships();


    } catch (error) {

        alert("Unable to delete internship.");

        console.error(error);
    }
}


// ==========================================
// LOAD STUDENTS
// ==========================================

async function loadStudents() {

    hideAllSections();

    document.getElementById("studentSection").style.display = "block";


    try {

        const response = await fetch(
            "http://localhost:8080/api/students"
        );


        if (!response.ok) {
            throw new Error("Failed to load students");
        }


        const students = await response.json();


        const studentList =
            document.getElementById("studentList");


        if (students.length === 0) {

            studentList.innerHTML = `
                <div class="alert alert-info">
                    No students registered.
                </div>
            `;

            return;
        }


        studentList.innerHTML = "";


        students.forEach(function(student) {

            studentList.innerHTML += `

                <div class="card shadow mb-3">

                    <div class="card-body">

                        <h5>
                            ${student.name}
                        </h5>

                        <p>
                            <strong>Student ID:</strong>
                            ${student.id}
                        </p>

                        <p>
                            <strong>Department:</strong>
                            ${student.department}
                        </p>

                        <p>
                            <strong>Year:</strong>
                            ${student.year}
                        </p>

                        <p>
                            <strong>Skills:</strong>
                            ${student.skills}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${student.email}
                        </p>

                    </div>

                </div>

            `;

        });


        window.scrollTo({
            top: document.getElementById("studentSection").offsetTop - 80,
            behavior: "smooth"
        });


    } catch (error) {

        document.getElementById("studentList").innerHTML = `
            <div class="alert alert-danger">
                Unable to load students.
            </div>
        `;

        console.error(error);
    }
}


// ==========================================
// LOAD APPLICATIONS
// ==========================================

async function loadApplications() {

    hideAllSections();

    document.getElementById("applicationSection").style.display = "block";


    try {

        const response = await fetch(
            "http://localhost:8080/api/applications"
        );


        if (!response.ok) {
            throw new Error("Failed to load applications");
        }


        const applications = await response.json();


        const applicationList =
            document.getElementById("applicationList");


        if (applications.length === 0) {

            applicationList.innerHTML = `
                <div class="alert alert-info">
                    No applications available.
                </div>
            `;

            return;
        }


        applicationList.innerHTML = "";


        applications.forEach(function(application) {

            applicationList.innerHTML += `

                <div class="card shadow mb-3">

                    <div class="card-body">

                        <h5>
                            Application #${application.id}
                        </h5>

                        <p>
                            <strong>Student ID:</strong>
                            ${application.studentId}
                        </p>

                        <p>
                            <strong>Internship ID:</strong>
                            ${application.internshipId}
                        </p>

                        <label class="form-label">
                            <strong>Status:</strong>
                        </label>

                        <select
                            id="status-${application.id}"
                            class="form-select form-select-sm mb-2">

                            <option
                                value="Applied"
                                ${application.status === "Applied" ? "selected" : ""}>
                                Applied
                            </option>

                            <option
                                value="Under Review"
                                ${application.status === "Under Review" ? "selected" : ""}>
                                Under Review
                            </option>

                            <option
                                value="Selected"
                                ${application.status === "Selected" ? "selected" : ""}>
                                Selected
                            </option>

                            <option
                                value="Rejected"
                                ${application.status === "Rejected" ? "selected" : ""}>
                                Rejected
                            </option>

                        </select>


                        <button
                            class="btn btn-success btn-sm"
                            onclick="updateApplicationStatus(${application.id})">

                            Update

                        </button>

                    </div>

                </div>

            `;

        });


        window.scrollTo({
            top: document.getElementById("applicationSection").offsetTop - 80,
            behavior: "smooth"
        });


    } catch (error) {

        document.getElementById("applicationList").innerHTML = `
            <div class="alert alert-danger">
                Unable to load applications.
            </div>
        `;

        console.error(error);
    }
}


// ==========================================
// UPDATE APPLICATION STATUS
// ==========================================

async function updateApplicationStatus(id) {

    const status =
        document.getElementById(
            `status-${id}`
        ).value;


    try {

        const getResponse = await fetch(
            `http://localhost:8080/api/applications/${id}`
        );


        if (!getResponse.ok) {
            throw new Error("Application not found");
        }


        const application =
            await getResponse.json();


        const response = await fetch(
            `http://localhost:8080/api/applications/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    studentId:
                        application.studentId,

                    internshipId:
                        application.internshipId,

                    status:
                        status

                })
            }
        );


        if (!response.ok) {
            throw new Error("Failed to update application");
        }


        alert(
            "Application status updated successfully."
        );


        loadApplications();


    } catch (error) {

        alert(
            "Unable to update application status."
        );

        console.error(error);
    }
}
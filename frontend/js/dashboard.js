const studentId = localStorage.getItem("studentId");
const studentName = localStorage.getItem("studentName");
const studentEmail = localStorage.getItem("studentEmail");

if (!studentId) {
    window.location.href = "login.html";
}

document.getElementById("studentId").textContent = studentId;
document.getElementById("studentName").textContent = studentName;
document.getElementById("profileName").textContent = studentName;
document.getElementById("studentEmail").textContent = studentEmail;

function logout() {

    localStorage.removeItem("studentId");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentEmail");

    window.location.href = "login.html";
}
// ==========================================
// LOAD APPLICATION STATISTICS
// ==========================================

async function loadApplicationStatistics() {

    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:8080/api/applications"
        );

        if (!response.ok) {
            throw new Error("Failed to load applications");
        }

        const applications = await response.json();

        // Get applications of the logged-in student
        const myApplications = applications.filter(
            function(application) {
                return application.studentId == studentId;
            }
        );

        // Total applications
        const total = myApplications.length;

        // Selected applications
        const selected = myApplications.filter(
            function(application) {
                return application.status === "Selected";
            }
        ).length;

        // Pending applications
        const pending = myApplications.filter(
            function(application) {
                return application.status === "Applied" ||
                       application.status === "Under Review";
            }
        ).length;


        // Display numbers
        document.getElementById(
            "totalApplications"
        ).textContent = total;

        document.getElementById(
            "selectedApplications"
        ).textContent = selected;

        document.getElementById(
            "pendingApplications"
        ).textContent = pending;

    } catch (error) {

        console.error(
            "Unable to load application statistics:",
            error
        );

    }
}


// ==========================================
// START STATISTICS
// ==========================================

loadApplicationStatistics();
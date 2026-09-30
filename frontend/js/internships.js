let allInternships = [];


// ==========================================
// LOAD INTERNSHIPS
// ==========================================

async function loadInternships() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/internships"
        );

        if (!response.ok) {
            throw new Error("Failed to load internships");
        }

        allInternships = await response.json();

        createLocationFilter();

        displayInternships(allInternships);

    } catch (error) {

        document.getElementById("internshipList").innerHTML = `
            <div class="alert alert-danger text-center">
                Cannot connect to the backend.
                Make sure Spring Boot is running.
            </div>
        `;

        console.error(error);
    }
}


// ==========================================
// CREATE LOCATION FILTER
// ==========================================

function createLocationFilter() {

    const locationFilter =
        document.getElementById("locationFilter");

    locationFilter.innerHTML =
        `<option value="">All Locations</option>`;

    const locations = [];

    allInternships.forEach(function(internship) {

        if (
            internship.location &&
            !locations.includes(internship.location)
        ) {

            locations.push(internship.location);

        }
    });

    locations.sort();

    locations.forEach(function(location) {

        locationFilter.innerHTML += `
            <option value="${location}">
                ${location}
            </option>
        `;
    });
}


// ==========================================
// DISPLAY INTERNSHIPS
// ==========================================

function displayInternships(internships) {

    const internshipList =
        document.getElementById("internshipList");

    internshipList.innerHTML = "";


    if (internships.length === 0) {

        internshipList.innerHTML = `
            <div class="alert alert-info text-center">
                No internships found.
            </div>
        `;

        return;
    }


    internships.forEach(function(internship) {

        const card = `

            <div class="col-md-6 col-lg-4 mb-4">

                <div class="card shadow h-100">

                    <div class="card-body">

                        <h4 class="card-title">
                            ${internship.role}
                        </h4>

                        <h6 class="text-primary">
                            ${internship.companyName}
                        </h6>

                        <hr>

                        <p>
    <strong>Skills:</strong>
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
                            class="btn btn-primary w-100"
                            onclick="applyForInternship(${internship.id})">
                            Apply
                        </button>

                    </div>

                </div>

            </div>

        `;

        internshipList.innerHTML += card;
    });
}


// ==========================================
// FILTER INTERNSHIPS
// ==========================================

function filterInternships() {

    const searchText =
        document.getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    const selectedLocation =
        document.getElementById("locationFilter").value;

    const selectedDomain =
        document.getElementById("domainFilter")
        .value
        .toLowerCase();


    const filteredInternships =
        allInternships.filter(function(internship) {

            const company =
                (internship.companyName || "")
                .toLowerCase();

            const role =
                (internship.role || "")
                .toLowerCase();

            const skills =
                (internship.requiredSkills || "")
                .toLowerCase();

            const location =
                (internship.location || "")
                .toLowerCase();


            // Search
            const searchMatch =
                searchText === "" ||
                company.includes(searchText) ||
                role.includes(searchText) ||
                skills.includes(searchText);


            // Location
            const locationMatch =
                selectedLocation === "" ||
                location === selectedLocation.toLowerCase();


            // Domain
            const domainMatch =
                selectedDomain === "" ||
                skills.includes(selectedDomain) ||
                role.includes(selectedDomain);


            return (
                searchMatch &&
                locationMatch &&
                domainMatch
            );
        });


    displayInternships(filteredInternships);
}


// ==========================================
// APPLY FOR INTERNSHIP
// ==========================================

function applyForInternship(internshipId) {

    const studentId =
        localStorage.getItem("studentId");


    if (!studentId) {

        alert("Please login first.");

        window.location.href =
            "login.html";

        return;
    }


    localStorage.setItem(
        "selectedInternshipId",
        internshipId
    );


    window.location.href =
        "applications.html";
}


// ==========================================
// SEARCH EVENT
// ==========================================

document.getElementById("searchInput")
    .addEventListener(
        "input",
        filterInternships
    );


// ==========================================
// LOCATION EVENT
// ==========================================

document.getElementById("locationFilter")
    .addEventListener(
        "change",
        filterInternships
    );


// ==========================================
// DOMAIN EVENT
// ==========================================

document.getElementById("domainFilter")
    .addEventListener(
        "change",
        filterInternships
    );


// ==========================================
// START
// ==========================================

loadInternships();
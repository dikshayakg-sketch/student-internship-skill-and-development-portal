# Student Internship & Skill Development Portal

A full-stack web application that helps college students find internships based on their skills and track their internship applications.

## Features

### Student
- Student registration and login
- Student profile management
- Browse internships
- Search internships
- Filter internships by location and domain
- Apply for internships
- Prevent duplicate applications
- Track application status

### Admin
- Admin login
- Add internships
- View internships
- Edit internships
- Delete internships
- View registered students
- View student applications
- Update application status

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- Bootstrap

### Backend
- Java
- Spring Boot
- REST API
- Spring Data JPA
- Hibernate
- Maven

### Database
- MySQL

### Testing
- Postman

## Project Structure

```text
Student-Internship-Portal/
├── frontend/
│   ├── index.html
│   ├── register.html
│   ├── login.html
│   ├── dashboard.html
│   ├── profile.html
│   ├── internships.html
│   ├── applications.html
│   ├── admin-login.html
│   ├── admin-dashboard.html
│   ├── css/
│   └── js/
│
└── backend/
    └── portal/
        ├── src/
        ├── pom.xml
        └── ...
Backend API
Students
POST /api/students
GET /api/students
GET /api/students/{id}
PUT /api/students/{id}
DELETE /api/students/{id}
Internships
POST /api/internships
GET /api/internships
GET /api/internships/{id}
PUT /api/internships/{id}
DELETE /api/internships/{id}
Applications
POST /api/applications
GET /api/applications
GET /api/applications/{id}
PUT /api/applications/{id}
DELETE /api/applications/{id}
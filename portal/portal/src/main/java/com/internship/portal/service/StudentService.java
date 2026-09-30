
package com.internship.portal.service;

import com.internship.portal.model.Student;
import com.internship.portal.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Create student
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // Update student
    public Student updateStudent(Long id, Student student) {

    Student existingStudent = studentRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Student not found"));

    existingStudent.setName(student.getName());
    existingStudent.setDepartment(student.getDepartment());
    existingStudent.setYear(student.getYear());
    existingStudent.setSkills(student.getSkills());
    existingStudent.setEmail(student.getEmail());

    return studentRepository.save(existingStudent);
}
    // Delete student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
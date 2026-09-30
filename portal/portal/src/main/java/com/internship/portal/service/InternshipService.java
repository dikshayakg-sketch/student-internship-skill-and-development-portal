package com.internship.portal.service;

import com.internship.portal.model.Internship;
import com.internship.portal.repository.InternshipRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InternshipService {

    private final InternshipRepository internshipRepository;

    public InternshipService(InternshipRepository internshipRepository) {
        this.internshipRepository = internshipRepository;
    }

    // CREATE
    public Internship createInternship(Internship internship) {
        return internshipRepository.save(internship);
    }

    // READ ALL
    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    // READ ONE
    public Optional<Internship> getInternshipById(Long id) {
        return internshipRepository.findById(id);
    }

    // UPDATE
    public Internship updateInternship(Long id, Internship internship) {

        Internship existingInternship = internshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        existingInternship.setCompanyName(internship.getCompanyName());
        existingInternship.setRole(internship.getRole());
        existingInternship.setRequiredSkills(internship.getRequiredSkills());
        existingInternship.setDuration(internship.getDuration());
        existingInternship.setLocation(internship.getLocation());
        existingInternship.setDescription(internship.getDescription());

        return internshipRepository.save(existingInternship);
    }

    // DELETE
    public void deleteInternship(Long id) {
        internshipRepository.deleteById(id);
    }
}

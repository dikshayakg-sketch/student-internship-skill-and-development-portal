
package com.internship.portal.service;

import com.internship.portal.model.Application;
import com.internship.portal.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    // CREATE
    public Application createApplication(Application application) {

    boolean alreadyApplied =
            applicationRepository.existsByStudentIdAndInternshipId(
                    application.getStudentId(),
                    application.getInternshipId()
            );

    if (alreadyApplied) {
        throw new RuntimeException(
                "You have already applied for this internship"
        );
    }

    return applicationRepository.save(application);
}
    // READ ALL
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    // READ ONE
    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    // UPDATE
    public Application updateApplication(Long id, Application application) {

        Application existingApplication = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        existingApplication.setStudentId(application.getStudentId());
        existingApplication.setInternshipId(application.getInternshipId());
        existingApplication.setStatus(application.getStatus());

        return applicationRepository.save(existingApplication);
    }

    // DELETE
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}
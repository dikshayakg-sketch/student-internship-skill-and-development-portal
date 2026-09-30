package com.internship.portal.controller;

import com.internship.portal.model.Application;
import com.internship.portal.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // CREATE
    @PostMapping
public ResponseEntity<?> createApplication(
        @RequestBody Application application) {

    try {

        Application createdApplication =
                applicationService.createApplication(application);

        return ResponseEntity.ok(createdApplication);

    } catch (RuntimeException e) {

        return ResponseEntity
                .badRequest()
                .body(e.getMessage());
    }
}

    // READ ALL
    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
public Application updateApplication(
        @PathVariable Long id,
        @RequestBody Application application) {

    return applicationService.updateApplication(id, application);
}

    // DELETE
    @DeleteMapping("/{id}")
public ResponseEntity<String> deleteApplication(
        @PathVariable Long id) {

    applicationService.deleteApplication(id);

    return ResponseEntity.ok("Application deleted successfully");
}
}

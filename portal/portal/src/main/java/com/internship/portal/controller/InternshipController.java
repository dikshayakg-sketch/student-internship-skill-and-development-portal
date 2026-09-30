package com.internship.portal.controller;

import com.internship.portal.model.Internship;
import com.internship.portal.service.InternshipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
@CrossOrigin(origins = "*")
public class InternshipController {

    private final InternshipService internshipService;

    public InternshipController(InternshipService internshipService) {
        this.internshipService = internshipService;
    }

    // CREATE
    @PostMapping
    public Internship createInternship(@RequestBody Internship internship) {
        return internshipService.createInternship(internship);
    }

    // READ ALL
    @GetMapping
    public List<Internship> getAllInternships() {
        return internshipService.getAllInternships();
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<Internship> getInternshipById(@PathVariable Long id) {
        return internshipService.getInternshipById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public Internship updateInternship(
            @PathVariable Long id,
            @RequestBody Internship internship) {

        return internshipService.updateInternship(id, internship);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInternship(@PathVariable Long id) {

        internshipService.deleteInternship(id);

        return ResponseEntity.ok("Internship deleted successfully");
    }
}

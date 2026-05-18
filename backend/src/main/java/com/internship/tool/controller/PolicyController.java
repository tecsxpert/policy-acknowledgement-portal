package com.internship.tool.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import jakarta.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

import com.internship.tool.entity.Policy;
import com.internship.tool.service.PolicyService;
import com.internship.tool.repository.PolicyRepository;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins = "http://localhost:5173")
public class PolicyController {

    private final PolicyService service;
    private final PolicyRepository repository;

    public PolicyController(
            PolicyService service,
            PolicyRepository repository
    ) {
        this.service = service;
        this.repository = repository;
    }

    @PostMapping
    public Policy create(@RequestBody Policy policy) {
        return service.save(policy);
    }
    @PostMapping("/upload")
public String uploadFile(
        @RequestParam("file") MultipartFile file) {

    if (file.isEmpty()) {
        return "File is empty";
    }

    if (!file.getContentType().equals("text/csv")) {
        return "Only CSV files allowed";
    }

    if (file.getSize() > 1024 * 1024) {
        return "File size exceeds 1MB";
    }

    return "File uploaded successfully: " +
            file.getOriginalFilename();
}

    @GetMapping
    public List<Policy> getAll() {
        return service.getAll();
    }
    @GetMapping("/stats")
public Map<String, Long> getStats() {

    List<Policy> policies = repository.findAll();

    long total = policies.size();

    long approved = policies.stream()
            .filter(p -> "Approved".equalsIgnoreCase(p.getStatus()))
            .count();

    long pending = policies.stream()
            .filter(p -> "Pending".equalsIgnoreCase(p.getStatus()))
            .count();

    long rejected = policies.stream()
            .filter(p -> "Rejected".equalsIgnoreCase(p.getStatus()))
            .count();

    Map<String, Long> stats = new HashMap<>();

    stats.put("total", total);
    stats.put("approved", approved);
    stats.put("pending", pending);
    stats.put("rejected", rejected);

    return stats;
}

    @GetMapping("/search")
    public List<Policy> searchPolicies(@RequestParam String q) {
        return repository.findByTitleContainingIgnoreCase(q);
    }
    @GetMapping("/{id}")
public Policy getPolicyById(@PathVariable Long id) {

    return repository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Policy not found"));
}
@GetMapping("/export")
public void exportCsv(HttpServletResponse response) throws Exception {

    response.setContentType("text/csv");

    response.setHeader(
        "Content-Disposition",
        "attachment; filename=policies.csv"
    );

    PrintWriter writer = response.getWriter();

    writer.println("ID,Title,Status,Category");

    List<Policy> policies = service.getAll();

    for (Policy policy : policies) {

        writer.println(
            policy.getId() + "," +
            policy.getTitle() + "," +
            policy.getStatus() + "," +
            policy.getCategory()
        );
    }

    writer.flush();
    writer.close();
}

    @PutMapping("/{id}")
    public Policy updatePolicy(
            @PathVariable Long id,
            @RequestBody Policy updatedPolicy
    ) {

        Policy policy = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Policy not found"));

        policy.setTitle(updatedPolicy.getTitle());
        policy.setDescription(updatedPolicy.getDescription());
        policy.setStatus(updatedPolicy.getStatus());
        policy.setCategory(updatedPolicy.getCategory());

        return repository.save(policy);
    }

    @DeleteMapping("/{id}")
    public void deletePolicy(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
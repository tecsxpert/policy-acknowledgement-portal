package com.internship.tool.config;

import com.internship.tool.entity.Policy;
import com.internship.tool.repository.PolicyRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final PolicyRepository repository;

    public DataSeeder(PolicyRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (repository.count() == 0) {

            Policy policy1 = new Policy();

            policy1.setTitle("Leave Policy");
            policy1.setDescription("Employee leave rules");
            policy1.setStatus("Approved");
            policy1.setCategory("HR");

            repository.save(policy1);


            Policy policy2 = new Policy();

            policy2.setTitle("WFH Policy");
            policy2.setDescription("Work from home guidelines");
            policy2.setStatus("Pending");
            policy2.setCategory("IT");

            repository.save(policy2);


            Policy policy3 = new Policy();

            policy3.setTitle("Security Policy");
            policy3.setDescription("Security rules");
            policy3.setStatus("Rejected");
            policy3.setCategory("Security");

            repository.save(policy3);
        }
    }
}
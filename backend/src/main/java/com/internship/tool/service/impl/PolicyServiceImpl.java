package com.internship.tool.service;

import com.internship.tool.entity.Policy;
import com.internship.tool.repository.PolicyRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PolicyServiceImpl implements PolicyService {

    private final PolicyRepository repository;

    public PolicyServiceImpl(
            PolicyRepository repository
    ) {

        this.repository = repository;

    }

    @Override
    public Policy save(Policy policy) {

        return repository.save(policy);

    }

    @Override
    public List<Policy> getAll() {

        return repository.findAll();

    }

    @Override
    public Optional<Policy> getById(Long id) {

        return repository.findById(id);

    }

    @Override
    public Policy updatePolicy(
            Long id,
            Policy updatedPolicy
    ) {

        Policy policy = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Policy not found"
                        ));

        policy.setTitle(updatedPolicy.getTitle());

        policy.setDescription(
                updatedPolicy.getDescription()
        );

        policy.setStatus(
                updatedPolicy.getStatus()
        );

        policy.setCategory(
                updatedPolicy.getCategory()
        );

        return repository.save(policy);

    }

    @Override
    public void deletePolicy(Long id) {

        repository.deleteById(id);

    }
}
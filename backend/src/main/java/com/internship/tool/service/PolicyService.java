package com.internship.tool.service;

import com.internship.tool.entity.Policy;

import java.util.List;
import java.util.Optional;

public interface PolicyService {

    Policy save(Policy policy);

    List<Policy> getAll();

    Optional<Policy> getById(Long id);

    Policy updatePolicy(Long id, Policy policy);

    void deletePolicy(Long id);
}
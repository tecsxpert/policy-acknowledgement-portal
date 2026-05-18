package com.internship.tool.controller;

import com.internship.tool.service.PolicyService;
import com.internship.tool.repository.PolicyRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.internship.tool.entity.Policy;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doNothing;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PolicyController.class)
public class PolicyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PolicyService service;

    @MockBean
    private PolicyRepository policyRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllPolicies() throws Exception {

        Policy policy = new Policy();

        policy.setId(1L);
        policy.setTitle("Leave Policy");

        when(service.getAll())
                .thenReturn(Arrays.asList(policy));

        mockMvc.perform(get("/api/policies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title")
                        .value("Leave Policy"));
    }

    @Test
    void testGetPolicyById() throws Exception {

        Policy policy = new Policy();

        policy.setId(1L);
        policy.setTitle("WFH Policy");

       when(policyRepository.findById(1L))
        .thenReturn(Optional.of(policy));

        mockMvc.perform(get("/api/policies/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title")
                        .value("WFH Policy"));
    }

    @Test
    void testCreatePolicy() throws Exception {

        Policy policy = new Policy();

        policy.setTitle("Remote Policy");

        when(service.save(policy))
                .thenReturn(policy);

        mockMvc.perform(post("/api/policies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(policy)))
                .andExpect(status().isOk());
    }

    @Test
    void testUpdatePolicy() throws Exception {

        Policy policy = new Policy();

        policy.setId(1L);
        policy.setTitle("Updated Policy");

        when(policyRepository.findById(1L))
        .thenReturn(Optional.of(policy));

when(policyRepository.save(policy))
        .thenReturn(policy);

        mockMvc.perform(put("/api/policies/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(policy)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title")
                        .value("Updated Policy"));
    }

    @Test
    void testDeletePolicy() throws Exception {

        doNothing().when(service)
                .deletePolicy(1L);

        mockMvc.perform(delete("/api/policies/1"))
                .andExpect(status().isOk());
    }
}
package com.prou.smartstaff.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.prou.smartstaff.model.Employee;

public interface EmployeeRepository extends MongoRepository<Employee, String> {
    // Custom query to find employees who have a specific skill
    List<Employee> findBySkillsIn(List<String> skills);
}
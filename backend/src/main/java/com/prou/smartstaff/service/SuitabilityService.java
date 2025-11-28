package com.prou.smartstaff.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prou.smartstaff.model.Employee;
import com.prou.smartstaff.model.Task;
import com.prou.smartstaff.repository.EmployeeRepository;

@Service
public class SuitabilityService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Map<String, Object>> suggestEmployees(Task task) {
        List<Employee> allEmployees = employeeRepository.findAll();

        return allEmployees.stream()
            .map(emp -> {
                double score = calculateScore(emp, task);
                Map<String, Object> result = new HashMap<>();
                result.put("employee", emp);
                result.put("score", score);
                return result;
            })
            .sorted((a, b) -> Double.compare((Double) b.get("score"), (Double) a.get("score"))) // Sort highest score first
            .collect(Collectors.toList());
    }

    private double calculateScore(Employee emp, Task task) {
        double score = 0;

        // 1. Skill Match (Weight: 50%)
        if (emp.getSkills() != null && task.getRequiredSkills() != null) {
            long matchingSkills = task.getRequiredSkills().stream()
                .filter(emp.getSkills()::contains)
                .count();
            if (matchingSkills > 0) {
                score += (matchingSkills / (double) task.getRequiredSkills().size()) * 50;
            }
        }

        // 2. Availability (Weight: 30%) - Less active tasks = Higher score
        if (emp.getActiveTaskCount() == 0) score += 30;
        else if (emp.getActiveTaskCount() < 3) score += 15;

        // 3. Performance (Weight: 20%)
        score += (emp.getPerformanceRating() / 5.0) * 20;

        return score;
    }
}
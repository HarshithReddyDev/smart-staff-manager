package com.prou.smartstaff.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.prou.smartstaff.model.Task;

public interface TaskRepository extends MongoRepository<Task, String> {
    // Find all tasks assigned to a specific person
    List<Task> findByAssignedEmployeeId(String employeeId);
    
    // Find tasks by status (e.g., "Pending")
    List<Task> findByStatus(String status);
}
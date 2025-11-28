package com.prou.smartstaff.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prou.smartstaff.model.Task;
import com.prou.smartstaff.repository.TaskRepository;
import com.prou.smartstaff.service.SuitabilityService;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private SuitabilityService suitabilityService;

    // 1. Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // 2. Create a new task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }
    
    // 3. Assign a task to an employee (Updates the task)
    @PutMapping("/{id}/assign/{employeeId}")
    public Task assignTask(@PathVariable String id, @PathVariable String employeeId) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setAssignedEmployeeId(employeeId);
        task.setStatus("In Progress");
        return taskRepository.save(task);
    }

    // 4. THE SMART ENDPOINT: Get AI Recommendations for a Task
    // Usage: POST /api/tasks/recommendations (Body: Task object)
    @PostMapping("/recommendations")
    public List<Map<String, Object>> getRecommendations(@RequestBody Task task) {
        return suitabilityService.suggestEmployees(task);
    }
}
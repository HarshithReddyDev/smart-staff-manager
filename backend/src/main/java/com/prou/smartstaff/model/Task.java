package com.prou.smartstaff.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "tasks")
public class Task {
    @Id
    private String id;

    private String title;
    private String description;
    
    // Skills required to complete this task (e.g., "Java", "React")
    private List<String> requiredSkills; 
    
    private String priority; // "High", "Medium", "Low"
    private String status;   // "Pending", "In Progress", "Completed"
    
    // The ID of the employee assigned to this task
    private String assignedEmployeeId; 
}
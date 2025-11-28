package com.prou.smartstaff.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "employees")
public class Employee {

    @Id
    private String id;
    
    private String name;
    private String role; // e.g., "Senior Developer", "Intern"
    
    // Skills are crucial for the matching algorithm
    private List<String> skills; 
    
    // We cache this to avoid expensive DB counts later
    private int activeTaskCount = 0; 
    
    // 1.0 to 5.0 rating
    private double performanceRating; 
}
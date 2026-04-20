package org.college.taskmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskAssignmentRequest {
    private Long leaderId;
    private Long employeeId;
    private String title;
    private String description;
}

package org.college.taskmanagement.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String status; // Pending, In Progress, Completed

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee assignedTo;

    @ManyToOne
    @JoinColumn(name = "leader_id")
    private Employee assignedBy;

    public void setStatus(String status) {
        this.status = status;
    }
}

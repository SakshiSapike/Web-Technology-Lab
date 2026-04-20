package org.college.taskmanagement.service;

import org.college.taskmanagement.model.Employee;
import org.college.taskmanagement.model.Task;
import org.college.taskmanagement.repository.EmployeeRepository;
import org.college.taskmanagement.repository.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repo;
    private final EmployeeRepository employeeRepo;

    public TaskService(TaskRepository repo, EmployeeRepository employeeRepo) {
        this.repo = repo;
        this.employeeRepo = employeeRepo;
    }

    public Task save(Task task) {
        return repo.save(task);
    }

    public Task assignTask(Long leaderId, Long employeeId, Task task) {
        Employee leader = employeeRepo.findById(leaderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Leader not found"));
        if (leader.getRole() == null || !leader.getRole().equalsIgnoreCase("LEADER")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only a leader can assign tasks");
        }

        Employee employee = employeeRepo.findById(employeeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        task.setAssignedBy(leader);
        task.setAssignedTo(employee);
        if (task.getStatus() == null || task.getStatus().isBlank()) {
            task.setStatus("Pending");
        }
        return repo.save(task);
    }

    public Task updateStatus(Long id, String status) {
        Task task = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
        task.setStatus(status);
        return repo.save(task);
    }

    public List<Task> getAll() {
        return repo.findAll();
    }

    public List<Task> getTasksByEmployee(Long id) {
        return repo.findByAssignedToId(id);
    }

    public List<Task> getTasksByLeader(Long id) {
        return repo.findByAssignedById(id);
    }
}

<?php
// Simple admin dashboard with core employee metrics.
require_once 'connect.php';

$stats = [
    'total' => 0,
    'departments' => 0,
    'new_this_month' => 0,
];

try {
    $res = $conn->query("SELECT COUNT(*) AS c FROM `{$employeeTable}`");
    if ($row = $res->fetch_assoc()) $stats['total'] = (int)$row['c'];

    $res = $conn->query("SELECT COUNT(DISTINCT department) AS c FROM `{$employeeTable}`");
    if ($row = $res->fetch_assoc()) $stats['departments'] = (int)$row['c'];

    $res = $conn->query("SELECT COUNT(*) AS c FROM `{$employeeTable}` WHERE YEAR(joining_date)=YEAR(CURDATE()) AND MONTH(joining_date)=MONTH(CURDATE())");
    if ($row = $res->fetch_assoc()) $stats['new_this_month'] = (int)$row['c'];
} catch (Exception $e) {
    // leave defaults
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard — EmployeeHub</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="app-layout">
        <aside class="sidebar">
            <div class="logo">EM</div>
            <div style="margin-bottom:6px"><strong>EmployeeHub</strong><div class="muted">Admin Workspace</div></div>
            <nav>
                <a href="dashboard.php" class="active">Dashboard</a>
                <a href="index.php">Add Employee</a>
                <a href="display.php?admin=1">Update Employee details</a>
            </nav>
        </aside>

        <main class="main-content">
            <div class="container panel">
                <div class="topnav" style="margin-bottom:18px">
                    <div class="brand">
                        <div class="logo">EM</div>
                        <div>
                            <h3 style="margin:0">Employee Dashboard</h3>
                            <div class="muted">Monitor employee data and manage the team.</div>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-secondary" onclick="document.body.classList.toggle('dark')">Dark Mode</button>
                        <a class="btn btn-secondary" href="display.php?admin=1">View All</a>
                        <a class="btn btn-primary" href="index.php">Add Employee</a>
                    </div>
                </div>

                <div class="cards-grid">
                    <div class="metric-card">
                        <h4>TOTAL EMPLOYEES</h4>
                        <p><?php echo $stats['total']; ?></p>
                        <div class="muted">Active records stored in the database.</div>
                    </div>
                    <div class="metric-card">
                        <h4>DEPARTMENTS</h4>
                        <p><?php echo $stats['departments']; ?></p>
                        <div class="muted">Distinct departments represented.</div>
                    </div>
                </div>

            </div>
        </main>
    </div>
</body>
</html>

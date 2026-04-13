<?php
// Database connection file for the employee management project.

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'employe';
$portsToTry = [3307, 3306];
$connectionError = null;
$employeeTable = null;

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

foreach ($portsToTry as $port) {
    try {
        $conn = new mysqli($host, $username, $password, $database, $port);
        $conn->set_charset('utf8mb4');
        break;
    } catch (mysqli_sql_exception $e) {
        $connectionError = $e;
    }
}

if (!isset($conn) || !($conn instanceof mysqli)) {
    $message = $connectionError ? $connectionError->getMessage() : 'Unknown database connection error.';
    error_log('MySQL connection error: ' . $message);
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Database Connection Error</title>
        <style>
            body {
                margin: 0;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(180deg, #f8fafc, #e2e8f0);
                color: #0f172a;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                padding: 24px;
                box-sizing: border-box;
            }
            .error-card {
                max-width: 720px;
                width: 100%;
                background: #ffffff;
                border-radius: 18px;
                padding: 28px;
                box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
            }
            h1 {
                margin-top: 0;
                color: #b91c1c;
            }
            code {
                background: #f1f5f9;
                padding: 2px 6px;
                border-radius: 6px;
            }
            ul {
                padding-left: 18px;
            }
        </style>
    </head>
    <body>
        <div class="error-card">
            <h1>Database connection failed</h1>
            <p>The app could not connect to MySQL using database <code><?php echo htmlspecialchars($database); ?></code>.</p>
            <p>Ports tried: <code><?php echo htmlspecialchars(implode(', ', $portsToTry)); ?></code></p>
            <p>MySQL said: <code><?php echo htmlspecialchars($message); ?></code></p>
            <p>Check these items in XAMPP:</p>
            <ul>
                <li>Start Apache and MySQL from the XAMPP control panel.</li>
                <li>Confirm the database name is <code>employe</code>.</li>
                <li>If MySQL uses a different port, update <code>connect.php</code>.</li>
                <li>Make sure the employee table exists inside that database.</li>
            </ul>
        </div>
    </body>
    </html>
    <?php
    exit;
}

$tableCandidates = ['employee', 'employees'];
foreach ($tableCandidates as $tableCandidate) {
    $safeTable = $conn->real_escape_string($tableCandidate);
    $tableResult = $conn->query("SHOW TABLES LIKE '{$safeTable}'");
    if ($tableResult && $tableResult->num_rows > 0) {
        $employeeTable = $tableCandidate;
        $tableResult->free();
        break;
    }
}

if ($employeeTable === null) {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Missing Employee Table</title>
        <style>
            body {
                margin: 0;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(180deg, #f8fafc, #e2e8f0);
                color: #0f172a;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                padding: 24px;
                box-sizing: border-box;
            }
            .error-card {
                max-width: 780px;
                width: 100%;
                background: #ffffff;
                border-radius: 18px;
                padding: 28px;
                box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
            }
            pre {
                background: #0f172a;
                color: #e2e8f0;
                padding: 16px;
                border-radius: 12px;
                overflow-x: auto;
            }
        </style>
    </head>
    <body>
        <div class="error-card">
            <h1>Employee table not found</h1>
            <p>The app looked for tables named <code>employee</code> and <code>employees</code> in database <code><?php echo htmlspecialchars($database); ?></code>, but neither exists.</p>
            <p>Create one of them with this SQL:</p>
<pre>CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    department VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    joining_date DATE NOT NULL,
    salary DECIMAL(10,2) NOT NULL
);</pre>
        </div>
    </body>
    </html>
    <?php
    exit;
}
?>

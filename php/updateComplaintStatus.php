<?php

    include 'db_connect.php';

    $complaintNo = $_POST['complaintNo'];
    $status = $_POST['status'];

    $sql = "UPDATE complaint
            SET status = ?
            WHERE complaintNo = ?";

    $stmt = mysqli_prepare($connect, $sql);

    mysqli_stmt_bind_param($stmt, "si", $status, $complaintNo);

    if(mysqli_stmt_execute($stmt))
    {
        echo "Complaint status updated successfully";
    }
    else
    {
        echo "Failed to update complaint";
    }

    mysqli_stmt_close($stmt);

    mysqli_close($connect);
?>
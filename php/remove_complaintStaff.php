<?php

    include 'db_connect.php';

    $complaintNo = $_POST['complaintNo'];

    $sql = "DELETE FROM complaint
            WHERE complaintNo = ?";

    $stmt = mysqli_prepare($connect, $sql);

    mysqli_stmt_bind_param($stmt, "i", $complaintNo);

    if(mysqli_stmt_execute($stmt))
    {
        echo "Complaint removed successfully";
    }
    else
    {
        echo "Failed to remove complaint";
    }

    mysqli_stmt_close($stmt);

    mysqli_close($connect);
?>
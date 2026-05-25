<?php

    include "db_connect.php";

    $feedbackNo = $_POST['feedbackNo'];

    $sql = "DELETE FROM feedback
            WHERE feedbackNo = ?";

    $stmt = mysqli_prepare($connect, $sql);

    mysqli_stmt_bind_param($stmt, "i", $feedbackNo);

    if(mysqli_stmt_execute($stmt))
    {
        echo "Feedback deleted successfully";
    }
    else
    {
        echo "Failed to delete feedback";
    }

    mysqli_stmt_close($stmt);

    mysqli_close($connect);

?>
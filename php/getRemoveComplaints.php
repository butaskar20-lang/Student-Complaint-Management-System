<?php

    session_start();
    include "db_connect.php";

    $studentID = $_SESSION["studentID"];

    $sql = "SELECT * FROM complaint
            WHERE studentID = ?
            AND status = 'Pending' 
            ORDER BY complaintNo DESC"; //only show pending complaints for deletion

    $stmt = mysqli_prepare($connect, $sql);

    mysqli_stmt_bind_param(
        $stmt,
        "s",
        $studentID
    );

    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);


    // =====================================================
    // RETURN PLAIN TEXT DATA
    // =====================================================

    while($row = mysqli_fetch_assoc($result)){

        echo $row["complaintNo"] . "|" .
            $row["categoryName"] . "|" .
            $row["complaintDate"] . "|" .
            $row["complaintRemark"] . "|" .
            $row["status"] . "\n";
    }

    mysqli_stmt_close($stmt);

    mysqli_close($connect);
?>
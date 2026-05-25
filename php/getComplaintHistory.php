<?php

    session_start();
    include "db_connect.php";

    // make sure student is logged in
	if(!isset($_SESSION["studentID"])){

		die("Please login first.");
	}

    //retrieves currently logged in student id from session storage
    $studentID = $_SESSION["studentID"];

    //gets complaint history 2gether with feedback existence
    // and satisfaction rating if feedback exists, 
    //using LEFT JOIN to include complaints without feedback
    $sql = "
        SELECT
            c.complaintNo,
            c.categoryName,
            c.complaintTitle,
            c.status,
            
            CASE
                WHEN f.feedbackNo IS NOT NULL THEN 'Yes'
                ELSE 'No'
            END AS feedbackExists

        FROM complaint c

        LEFT JOIN feedback f ON c.complaintNo = f.complaintNo
        AND c.studentID = f.studentID

        WHERE c.studentID = ?
        ORDER BY c.complaintNo DESC";

    $stmt = mysqli_prepare($connect, $sql);

    mysqli_stmt_bind_param(
        $stmt,
        "s",
        $studentID
    );

    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    //outputs data separate by |
    while($row = mysqli_fetch_assoc($result)){

        echo $row["complaintNo"] . "|" .
            $row["categoryName"] . "|" .
            $row["complaintTitle"] . "|" .
            $row["status"] . "|" .
            $row["feedbackExists"] . "\n";
    }

    mysqli_stmt_close($stmt);

    mysqli_close($connect);
?>
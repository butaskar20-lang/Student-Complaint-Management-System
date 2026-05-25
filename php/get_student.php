<?php
    
    include "db_connect.php";

    $studentID = $_POST["studentID"];

    $sql = "SELECT * FROM student
            WHERE studentID = ?";

    $stmt = mysqli_prepare($connect, $sql);

    mysqli_stmt_bind_param(
        $stmt,
        "s",
        $studentID
    );

    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    if(mysqli_num_rows($result) > 0)
    {
        $row = mysqli_fetch_assoc($result);

        echo $row["stuName"];
    }

    else
    {
        echo "not found";
    }

    mysqli_stmt_close($stmt);

    mysqli_close($connect);
?>
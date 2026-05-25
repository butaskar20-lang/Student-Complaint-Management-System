<?php

    include 'db_connect.php';

    $studentID = $_POST['studentID'];
    $stuName = $_POST['stuName'];
    $stuEmail = $_POST['stuEmail'];
    $stuPassword = password_hash($_POST['stuPassword'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO student(studentID, stuName, stuEmail, stuPassword)
            VALUES(?,?,?,?)";

    $stmt = mysqli_prepare($connect, $sql);

    mysqli_stmt_bind_param($stmt, "ssss",
        $studentID,
        $stuName,
        $stuEmail,
        $stuPassword);

    if(mysqli_stmt_execute($stmt))
    {
        echo "Student inserted successfully";
    }
    else
    {
        echo "Failed to insert student";
    }

    mysqli_stmt_close($stmt);

    mysqli_close($connect);

?>
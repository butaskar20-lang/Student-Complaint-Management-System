<?php

    include "db_connect.php";

    if(
        !isset($_POST["studentID"]) ||
        !isset($_POST["newPassword"])
    ){
        echo "Missing data.";
        exit();
    }

    $studentID = trim($_POST["studentID"]);

    $newPassword = trim($_POST["newPassword"]);


    if($studentID == ""){
        echo "Please enter Student ID.";
        exit();
    }

    if($newPassword == ""){
        echo "Please enter new password.";
        exit();
    }


    // CHECK IF STUDENT EXISTS
    $checkSql =
        "SELECT * FROM student
         WHERE studentID = ?";

    $checkStmt = mysqli_prepare($connect, $checkSql);

    mysqli_stmt_bind_param(
        $checkStmt,
        "s",
        $studentID
    );

    mysqli_stmt_execute($checkStmt);

    $checkResult = mysqli_stmt_get_result($checkStmt);


    if(mysqli_num_rows($checkResult) == 0){
        echo "Student not found.";
        exit();
    }


    // UPDATE PASSWORD
    $sql =
        "UPDATE student
        SET stuPassword = ?
        WHERE studentID = ?";

    $stmt = mysqli_prepare($connect, $sql);

    mysqli_stmt_bind_param(
        $stmt,
        "ss",
        $newPassword,
        $studentID
    );

    if(mysqli_stmt_execute($stmt)){
        echo "Student updated successfully.";
    }else{
        echo "Update failed.";
    }

    mysqli_stmt_close($stmt);

    mysqli_close($connect);

?>
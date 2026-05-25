<?php

    session_start();
    include "db_connect.php";

    //check session
    if(!isset($_SESSION["studentID"])){

        die("No session found.");
    }

    $studentID = $_SESSION["studentID"];


    // ============================================
    // GET STUDENT DATA
    // ============================================

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


    //check if student exists
    if(mysqli_num_rows($result) > 0){

        $row = mysqli_fetch_assoc($result);

        // ============================================
        // RETURN DATA
        // ============================================

        echo
            $row["stuName"] . "|" .
            $row["studentID"] . "|" .
            $row["stuEmail"] . "|" .
            $row["stuContactNum"];
    }else{
        echo "No student found.| | | ";
    }

    mysqli_stmt_close($stmt);

    mysqli_close($connect);

?>
<?php

    session_start();
    include "db_connect.php";

    //check session
    if(!isset($_SESSION["staffID"])){

        die("No session found.");
    }

    $staffID = $_SESSION["staffID"];


    // ============================================
    // GET STAFF DATA
    // ============================================

    $sql = "SELECT * FROM staff
            WHERE staffID = ?";

    $stmt = mysqli_prepare($connect, $sql);

    mysqli_stmt_bind_param(
        $stmt,
        "s",
        $staffID
    );

    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);


    //check if staff exists
    if(mysqli_num_rows($result) > 0){

        $row = mysqli_fetch_assoc($result);

        // ============================================
        // RETURN DATA
        // ============================================

        echo
            $row["staffUsername"] . "|" .
            $row["staffID"];
    }else{
        echo "No staff found.| | | ";
    }

    mysqli_stmt_close($stmt);

    mysqli_close($connect);

?>
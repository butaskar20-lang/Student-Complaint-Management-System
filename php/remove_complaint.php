<?php
    session_start();
    include "db_connect.php";

    //prevent null session crashes
    if(!isset($_SESSION["studentID"])){
        die("Please login first.");
    }

    //ensure student has filed a complaint beforehand
    if(!isset($_GET["complaintNo"])){
        die("Complaint No missing.");
    }

    $complaintNo = $_GET["complaintNo"];

        
        //gets logged in student id from session
		//$_SESSION["studentid"] retrieves student id stored during login
		$studentid = $_SESSION["studentID"];

        $sql = "DELETE FROM complaint

                WHERE complaintNo = ?
                AND studentID = ?
                AND status = 'Pending'"; //only delete pending complaints

        $stmt = mysqli_prepare($connect, $sql);

        mysqli_stmt_bind_param(
            $stmt,
            "is",
            $complaintNo,
            $studentid
        );


        if(mysqli_stmt_execute($stmt)){

            echo "success";
            
        }else{

            echo "failed";
            
        }

        mysqli_stmt_close($stmt);

    mysqli_close($connect);
?>

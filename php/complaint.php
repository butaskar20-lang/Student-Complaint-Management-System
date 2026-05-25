<?php
    // ==========================================================================
    // SCMS Complaint Submission System 
    // ==========================================================================
    // Start session
    session_start();
    include 'db_connect.php'; // provides $connect

    if(!isset($_SESSION["studentID"])){
        die("Student session not found.");
    }
    

    //store logged in studentid via POST method, store temporarily in $_POST structure
    $studentID = $_SESSION["studentID"];

    $categoryName = $_POST["categoryName"];

    $complaintTitle = $_POST["complaintTitle"];

    $complaintRemark = $_POST["complaintRemark"];


    // ==========================================================================
    // PROCESS FORM SUBMISSION
    // ==========================================================================
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $sql = "INSERT INTO complaint(
            studentID,
            categoryName,
            complaintTitle,
            complaintRemark,
            complaintDate
        )
        VALUES(?, ?, ?, ?, NOW())";


        $stmt = mysqli_prepare($connect, $sql);

        mysqli_stmt_bind_param(
            $stmt,
            "ssss",
            $studentID,
            $categoryName,
            $complaintTitle,
            $complaintRemark
        );


        if(mysqli_stmt_execute($stmt)){

            echo "
                <script>

                    alert('Complaint Submitted Successfully');
                    window.location.href = '../html/history.html';

                </script>
            ";
        }
        else{
            echo "
                <script>

                    alert('Failed to Submit Complaint');
                    window.location.href = '../html/category.html';

                </script>
            ";
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }

    // Close database connection
    mysqli_close($connect);

?>
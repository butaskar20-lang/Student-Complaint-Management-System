<?php
    session_start();
    include "db_connect.php";

    $studentID = $_SESSION["studentID"];

    $feedbackRating = $_POST["feedbackRating"];
    $feedbackRemark = $_POST["feedbackRemark"];

    $sql = "INSERT INTO feedback(
                studentID,
                feedbackRating,
                feedbackRemark
            )
            VALUES(
                ?, ?, ?
            )";

    $stmt = mysqli_prepare($connect, $sql);

    mysqli_stmt_bind_param(
        $stmt,
        "sis",
        $studentID,
        $feedbackRating,
        $feedbackRemark
    );

    if(mysqli_stmt_execute($stmt)){

        echo "
        <script>

            alert('Feedback submitted successfully');
            window.location.href = '../html/userDashboard.html';

        </script>
        ";
    }else{
        echo "
        <script>

            alert('Unsuccessful feedback submission');
            window.location.href = '../html/category.html';

        </script>
        ";

    }


?>
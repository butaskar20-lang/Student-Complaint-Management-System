<?php

    include "db_connect.php";

    $sql = "SELECT * FROM feedback
            ORDER BY feedbackNo DESC";

    $result = mysqli_query($connect, $sql);

    while($row = mysqli_fetch_assoc($result)){

        echo $row["feedbackNo"] . "|" .
            $row["complaintNo"] . "|" .
            $row["studentID"] . "|" .
            $row["feedbackComment"] . "\n";
    }



    mysqli_close($connect);

?>
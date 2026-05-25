<?php

    include "db_connect.php";

    $sql = "SELECT * FROM complaint
            ORDER BY complaintNo DESC";

    $result = mysqli_query($connect, $sql);

    while($row = mysqli_fetch_assoc($result)){

        echo $row["complaintNo"] . "|" .
            $row["studentID"] . "|" .
            $row["complaintTitle"] . "|" .
            $row["status"] . "\n";
    }


    mysqli_close($connect);
?>
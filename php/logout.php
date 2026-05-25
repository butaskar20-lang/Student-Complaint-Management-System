<?php
    //starts or resumes existing session storage
    session_start();

     //session_destroy() removes all stored session data from the server
    session_destroy();

    //header() redirects browser to another page
    //sends user back to login screen after logout process finishes
    header("Location: ../html/login.html");

    //exit() stops remaining php execution immediately
    exit();

?>
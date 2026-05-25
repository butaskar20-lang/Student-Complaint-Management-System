<?php
        //define all required info
        $hostname = "localhost:3307";
        $username = "root";
        $password = "";
        $dbname = "scms";
        $connect = "";
    try{
        //create a connection with mysql
        $connect = mysqli_connect($hostname, $username, $password, $dbname);

    }catch(mysqli_sql_exception $e){
        DIE ("Connection failed: " . $e->getMessage()); //if cant connect to mysql, error is displayed
    }
?>
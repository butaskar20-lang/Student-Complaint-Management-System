<?php
	// Start session
	session_start();

	include 'db_connect.php';

	//checks if the registration data was submitted using the http post method
	//$_SERVER: a built-in php superglobal array that holds info ab headers, paths, and server locations
	//[REQUEST_METHOD]: the speciffic key in that array that reveals how the page was requested (GET/POST)
	// == "POST" : checks if the request type is POST (used when submitting a form)
	if($_SERVER["REQUEST_METHOD"] == "POST"){

		//collect the data sent from the form
		$studentid = $_POST["studentID"];
		$studentname = $_POST["stuName"];
		$studentemail = $_POST["stuEmail"];
		$contactnumber = $_POST["stuContactNum"];

		// hash pswd
		//$_POST["password"]: gets the password typed by user
		//PASSWORD_DEFAULT: tells php to use the recommended hashing algorithm automatically
		$password = password_hash($_POST["stuPassword"], PASSWORD_DEFAULT);

		// sql command
		//prepared statement method -> VALUES (?, ?, ?, ?, ?)
		//prevent/reduce risk of sql injection cuz the placeholders separate sql code from user data
		//preventing attackers from injecting malicious commands into db thru form fields
				
		//if user uses special characters (Michelle O'bama), standard query string can break n cause syntax error
		//placeholders handle them automatically
		
		$sql = "INSERT INTO student
				(studentID,
				stuName,
				stuEmail,
				stuContactNum,
				stuPassword)

				
				VALUES (?, ?, ?, ?, ?)";

		//$stmt : statement object
		//stores the prepared sql statement created by mysql
		//reminder $connect (db connection obj) = mysqli_connect($hostname, $username, $password) in db_connect
		//prepare(): prepares the sql query b4 execution & helps prevent sql injection by seperating the sql structure from user data
		//1. db parses & compiles the sql query structure using placeholders (?) b4 any user data is introduced
		//2. user input is sent to the db seperately from the query logic
		//3. the db engine inserts the input directly into the placeholders, treating it exclusively as literal data (never executable code)
		
		//$sql contains the insert query
		$stmt = mysqli_prepare($connect, $sql);

		//bind_param() inserts actual values into the placeholders, binding the variables to the sql statement safely
		mysqli_stmt_bind_param(
			$stmt,
			//s=string, 5s because all 5 variables are strings
			
			"sssss", //tells mysql the data type of each variables
			$studentid,
			$studentname,
			$studentemail,
			$contactnumber,
			$password
		);
		
		//check whether execution was successful
		//execute() runs the sql query in the db
		//$stmt->execute(): sends the completed sql statement to mysql, inserting the data into the table
		if($stmt->execute()){
			//if successful, redirect user to login page
			header("Location: ../html/login.html");
			exit();

		}else{
			//registration failed, show error message
			echo "
				<script>
					alert('Invalid Login Information');
					window.location.href = '../html/registration.html';
				</script>
			";
		}

		$stmt->close(); //closes the prepared sql statement, removing the prepared statement from memory
	}

	$connect->close(); //closes the db connection, disconnects php from mysql db
	
?>
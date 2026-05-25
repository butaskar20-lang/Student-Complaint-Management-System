<?php
	//function that initializes a sesh/resumes an existing one
	//like an on switch for php's sesh handling system, allows storing & retrieving data across diff pages of a website
	//when sesh start, server will store info sent in previous page(s) temporarily to b used across multiple pages within the website
	
	session_start(); //like cookies but data stored here is more secure
	//connects php to db
	include 'db_connect.php';

	$userid = $_POST["userid"];
	$password = $_POST["password"];

	//check if form uses post method
	if($_SERVER["REQUEST_METHOD"] == "POST"){

		//stores user input from login form into variables
		//check for both staff and students
		$userid = trim($_POST["userid"]);
		$password = trim($_POST["password"]);


		//====check student table=========
		// '?': placeholder, actual value inserted using bind_param() l8r
		//query to search for matching student id
		$sql = "SELECT * FROM student WHERE studentID = ?";
				
		//stmt: statement obj
		//prepare(): prepares the sql query b4 execution safely (x sql injection)
		$studentStmt = mysqli_prepare($connect, $sql);

		//bind_param() inserts actual values into the placeholders, binding the variables to the sql statement safely
		//inserts user input into placeholder, 's' is data type string
		mysqli_stmt_bind_param(
       		$studentStmt,
        	"s",
       		$userid
    	);
	
		//sends the completed sql statement to mysql, inserting the data into the table
		mysqli_stmt_execute($studentStmt); //executes query

		//to retrieve a result set from a prepared statement as a mysqli_result obj
		//converts the executed statement into a format that allows easy data fetching
		$studentResult = mysqli_stmt_get_result($studentStmt); //retrieves data returned from db

		//check if matching student exists
		//num_rows = counts returned rows
		//0= matching student exists
		if(mysqli_num_rows($studentResult) > 0){

			//stores db row into associative array that allows use of strings as keys to access data
			//fetch_assoc() = converts db row into array format
			$studentRow = mysqli_fetch_assoc($studentResult);

			//compares typed password with hashed pswd
			//password_verify() compares typed pswd with the hashed pswd in db, returns true if it matches
			if(password_verify($password, $studentRow["stuPassword"])){

				//stores logged in student id into session
				//$_SESSION:stores data across multiple pages to remember logged in user
				$_SESSION["studentID"] = $studentRow["studentID"];
				$_SESSION["stuName"] = $studentRow["stuName"];
	
				//if successful, redirect user to respective dashboard page
				//========change path name l8r if needed===========
				header("Location: ../html/userDashboard.html"); //header(): redirects browser to another page
				exit(); //stops php execution after redirect
				
			}else{
				echo "
						<script>
							alert('Invalid Login Information');
							window.location.href = '../html/login.html';
						</script>
					";
			}
	
		}else{

			//========check staff table | staff login section======
			
			//query to search for matching staff username
			// '?' = placeholder
			$staffSQL = "SELECT * FROM staff WHERE staffID = ?";
			
			$staffStmt = mysqli_prepare($connect, $staffSQL);//prepare 2nd query
			
			mysqli_stmt_bind_param($staffStmt, "s", $userid);//binds user input into placeholder
			
			mysqli_stmt_execute($staffStmt);//executes staff query
			
			$staffResult = mysqli_stmt_get_result($staffStmt); //stores staff query result
			
			//check if matching staff exists
			if(mysqli_num_rows($staffResult) > 0){
				
				//converts returned row into array
				$staffRow = mysqli_fetch_assoc($staffResult);

				// verifies staff password with staff pswd in the database
				if($password == $staffRow["staffPassword"]){

					// stores logged in staff ID into session
					$_SESSION["staffID"] = $staffRow["staffID"];

					// redirect staff/admin dashboard
					//==============change if needed=================
					header("Location: ../html/staffDashboard.html");
					exit(); //stop php execution

				}else{
					//shown if staff pswd is incorrect
					echo "
						<script>
							alert('Invalid Login Information');
							window.location.href = '../html/login.html';
						</script>
					";
				}

			}else{
				//redirect user back to login page if no matching student or staff account found
				echo "
					<script>
						alert('Account not found.');
						window.location.href = '../html/login.html';
					</script>
				";
			}

			mysqli_stmt_close($staffStmt);//close second prepared statement
		}

		mysqli_stmt_close($studentStmt);//close 1st prepared statement
	}
	//closes db connection
	$connect->close();

?>

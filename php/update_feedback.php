<?php
	session_start(); //starts sesh to access logged in student info
	
	include 'db_connect.php';

	//check login
	if(!isset($_SESSION["studentID"])){
		die("Please login first.");
	}

	//checks whetherr form was submitted
	if($_SERVER["REQUEST_METHOD"] == "POST"){

		// gets logged in student ID from session
		$studentid = $_SESSION["studentID"];

		// gets updated feedback information from form
		$rating = $_POST["satisfactionRating"];
		$comment = $_POST["feedbackComment"];

		// gets complaint number to identify which feedback to update
		$complaintNo = $_POST["complaintNo"];

		//update query
		$sql = "UPDATE feedback
				SET satisfactionRating = ?,
					feedbackComment = ?

				WHERE complaintNo = ?
				AND studentID = ?"; //make sure the specific student updates their own feedback

		$stmt = $connect->prepare($sql); //prepares query securely

		//binds variables into placeholders
		$stmt->bind_param(
			"isis",
			$rating,
			$comment,
			$complaintNo,
			$studentid
		);
		
		//executes update query
		if($stmt->execute()){
			echo "
				<script>
					alert('Feedback Updated Successfully');

					window.location.href = '../html/history.html';
				</script>
			";

		}else{
			echo "
				<script>
					alert('Failed To Update Feedback');

					window.location.href = '../html/history.html';

				</script>
			";
		}

		$stmt->close();//close prepared statement
	}

	$connect->close();//close db connection

?>
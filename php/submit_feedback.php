<?php
	
	session_start(); //starts sesh to access logged in student info
	include 'db_connect.php';
	
	//prevents null session crashes
	if(!isset($_SESSION["studentID"])){
		die("Please login first.");
	}

	

	//check if form was submitted
	if($_SERVER["REQUEST_METHOD"] == "POST"){

		//gets logged in student id from session
		//$_SESSION["studentid"] retrieves student id stored during login
		$studentid = $_SESSION["studentID"];
		
		$complaintNo = $_POST["complaintNo"];

		//gets feedback form data and complaint
		$rating = $_POST["satisfactionRating"];
		$comment = $_POST["feedbackComment"];

		// check if student has already submitted feedback for this complaint, cuz we only want 1 feedback per complaint per student
		// they can only update existing feedbacks, not create multiple feedbacks for the same complaint

		$checkSQL = "

			SELECT *
			FROM feedback
			WHERE complaintNo = ?
			AND studentID = ?

		";

		$checkStmt = $connect->prepare($checkSQL);

		$checkStmt->bind_param(
			"is",
			$complaintNo,
			$studentid
		);

		$checkStmt->execute();

		$result = $checkStmt->get_result();

		//if feedback already exists for this complaint, alert student to update feedback instead

		if($result->num_rows > 0){

			echo "
				<script>

					alert(
						'Feedback already exists for this complaint. Please use Update Feedback.'
					);

					window.location.href = '../html/history.html';

				</script>
			";

			exit();
		}


		//insert query
		// '?': placeholders, actual values inserted using bind_param()
		$sql = "INSERT INTO feedback
				(complaintNo,
				studentID,
				satisfactionRating,
				feedbackComment)

				VALUES (?, ?, ?, ?)";

		//prepares sql statement
		$stmt = $connect->prepare($sql);

		//binds values into placeholders
		$stmt->bind_param(
			"isis", // 'i' : integer, 's': string
			$complaintNo,
			$studentid,
			$rating,
			$comment
		);

		//execute insert query
		if($stmt->execute()){

			echo "

				<script>

					alert('Feedback Submitted Successfully');

					window.location.href = '../html/history.html';

				</script>

			";
		}else{

			echo "

				<script>

					alert('Feedback Submitted Unsuccessfully. Please Try Again.');

					window.location.href = '../html/category.html';

				</script>

			";
		}

		$stmt->close();//close statement
	}

	$connect->close();//close db connection

?>
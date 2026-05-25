// ==============================
// FORM VALIDATION
// ==============================
//executes code once html doc is fully parsed & dom tree (browsers structural rep of a webpage) is built
document.addEventListener("DOMContentLoaded", function(){ 
	var userPwsd = document.getElementById("psw");
	var letter = document.getElementById("letter");
	var capital = document.getElementById("capital");
	var number = document.getElementById("number");
	var length = document.getElementById("length");

	// When the user clicks on the password field, show the message box aka make it visible & force it to take up the full width available, starting on a new line
	userPwsd.onfocus = function() {
		document.getElementById("message").style.display = "block";
	}

	// When the user clicks outside of the password field, hide the message box
	userPwsd.onblur = function() {
		document.getElementById("message").style.display = "none";
	}

	// When the user starts to type something inside the password field
	userPwsd.onkeyup = function() { //onkeyup: when user releases a key on the keyboard
		// Validate lowercase letters
		//[..] brackets: defines character class, matching any single character contained within them
		//a-z: specifies a range of characters from lowercase a to z 
		// /g or global flag: instruct the engine to find all matches in the string rather than stopping after the first one
		var lowerCaseLetters = /[a-z]/g; //regex pattern that checks for lowercase letters
		
		//userPwsd.value gets whatever the user typed into the password field, then the
		// match() method checks whether the typed password contains lowercase letters 
		if(userPwsd.value.match(lowerCaseLetters)) {
			letter.classList.remove("invalid"); //remove "invalid" class if requirement is fulfilled
			letter.classList.add("valid"); //add "valid" class to apply valid styling
		} else {
			letter.classList.remove("valid"); //remove "valid" class if requirement is not fulfilled
			letter.classList.add("invalid"); //add "invalid" class to apply invalid styling
		}

		// Validate capital letters
		var upperCaseLetters = /[A-Z]/g; //regex pattern that checks for uppercase letters A-Z
		if(userPwsd.value.match(upperCaseLetters)) { //checks whether password contains uppercase letters
			capital.classList.remove("invalid");
			capital.classList.add("valid");
		} else {
			capital.classList.remove("valid");
			capital.classList.add("invalid");
		}

		// Validate numbers
		var numbers = /[0-9]/g;//regex pattern that checks for numbers 0-9
		if(userPwsd.value.match(numbers)) {//check whether password contains numbers
			number.classList.remove("invalid");
			number.classList.add("valid");
		} else {
			number.classList.remove("valid");
			number.classList.add("invalid");
		}

		// Validate length
		if(userPwsd.value.length >= 8) {//check if password length is 8 characters or more
			length.classList.remove("invalid");
			length.classList.add("valid");
		} else {
			length.classList.remove("valid");
			length.classList.add("invalid");
		}
	}
});


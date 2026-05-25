// ==============================
// LOGIN FORM VALIDATION
// ==============================

// gets login form
// addEventListener() listens for user interaction on the login form.
const loginForm = document.getElementById("loginForm");


// runs when form is submitted
//submit() manually sends the validated form to the backend.
loginForm.addEventListener("submit", function(event){

    // Retrieves value typed into the userid input field.
    const userid = document.querySelector('input[name="userid"]').value.trim();

    //Retrieves password entered by the user.
    const password = document.querySelector('input[name="password"]').value.trim();



    // ==============================
    // EMPTY FIELD VALIDATION
    // ==============================

    // checks if user ID is empty
    if(userid === ""){

        alert("Please enter your User ID.");

        // stops form submission
        // preventDefault() stops the browser's automatic form submission.
        event.preventDefault();

        return;
    }



    // checks if password is empty
    // === strict equality operator checks if password is exactly an empty string, preventing submission if true
    if(password === ""){

        alert("Please enter your password.");

        // stops form submission
        event.preventDefault();

        return;
    }



    // ==============================
    // PASSWORD LENGTH VALIDATION
    // ==============================

    // optional simple validation
    if(password.length < 8){
        // displays a popup warning message
        alert("Password must contain at least 8 characters.");

        event.preventDefault(); 

        //stop function execution, prevent invalid form data from being sent to the server
        return;
    }

});


document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // FETCH PROFILE DATA
    // ==========================================

    // fetch() sends an asynchronous request to the server to retrieve the student's profile information.
    fetch("../php/getStudentProfile.php")

    // .then() waits for the server response before continuing execution. It processes the raw response into text format.
    .then(function(response){

        // response.text() converts raw server output into readable text format, allowing js to process the data returned by php
        return response.text();
    })

    // .then() takes the processed data and updates the profile page with the student's information.
    .then(function(data){

        // getElementById() locates each profile field element on the page 
        // and updates its text content with the corresponding data from the server.
        const column = data.split("|");

        document.getElementById("stuName").textContent = column[0];

        document.getElementById("studentID").textContent = column[1];

        document.getElementById("stuEmail").textContent = column[2];

        document.getElementById("stuContactNum").textContent = column[3];

    });

});
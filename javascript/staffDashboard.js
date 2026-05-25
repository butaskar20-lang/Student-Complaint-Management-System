function openModal(id){
    document.getElementById(id).classList.add("active");
}

function closeModal(id){
    document.getElementById(id).classList.remove("active");
}


// INSERT STUDENT
function insertStudent(){

    // VALIDATION
    let id = document.getElementById("ins-id").value;
    let name = document.getElementById("ins-name").value;
    let email = document.getElementById("ins-email").value;
    let pass = document.getElementById("ins-pass").value;

    let formData = new FormData();

    formData.append("studentID", id);
    formData.append("stuName", name);
    formData.append("stuEmail", email);
    formData.append("stuPassword", pass);

    fetch("../php/insert_student.php", {method: "POST", body: formData})
    .then(response => response.text())
    .then(data =>
    {
        alert(data);
        closeModal("insertModal");
    });
}

// =========================================
// SEARCH STUDENT
// =========================================

function searchStudent(){
    let studentID = document.getElementById("upd-id").value;

    let formData = new FormData();

    formData.append("studentID", studentID);

    fetch("../php/get_student.php", {method: "POST", body: formData})

    .then(response => response.text())

    .then(data =>
    {
        if(data == "not found"){
            alert("Student not found");

            document.getElementById("studentResult").style.display = "none";

        }else{
            document.getElementById("studentResult").style.display = "block";

            document.getElementById("upd-name").value = data;
        }
    });
}


// UPDATE STUDENT
function updateStudent(){
    // VALIDATION
    let id = document.getElementById("upd-id").value;
    let pass = document.getElementById("upd-pass").value;

    // VALIDATION
    if(id === ""){
        alert("Please enter Student ID.");
        return;
    }

    if(pass === ""){
        alert("Please enter new password.");
        return;
    }


    let formData = new FormData();

    // Appends the student ID and new password to the FormData object with the keys "studentID" and "newPassword" respectively
    formData.append("studentID", id);
    formData.append("newPassword", pass);

    // Sends an AJAX POST request to update the student's password with the specified student ID and new password, and
    fetch("../php/update_student.php", {method: "POST", body: formData})
    .then(response => response.text())
    .then(data =>
    {
        alert(data);
        closeModal("updateModal");
    });
}


// REMOVE COMPLAINT
function removeComplaint(){
    // VALIDATION
    // Checks if the complaint number input field is empty; if it is, displays an alert and exits the function to prevent further execution
    let complaintNo = document.getElementById("rem-id").value;

    let formData = new FormData();

    formData.append("complaintNo", complaintNo);

    // Sends an AJAX POST request to remove the complaint with the specified complaint number and 
    // handles the response by displaying an alert with the response message and closing the modal
    fetch("../php/remove_complaintStaff.php", {method: "POST", body: formData})
    .then(response => response.text())
    .then(data =>
    {
        alert(data);
        closeModal("removeModal");
    });
}


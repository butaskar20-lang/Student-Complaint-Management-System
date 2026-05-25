document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // FETCH PROFILE DATA
    // ==========================================

    fetch("../php/getStaffProfile.php")

    .then(function(response){

        return response.text();
    })

    .then(function(data){

        const column = data.split("|");

        document.getElementById("staffName").textContent = column[0];

        document.getElementById("staffID").textContent = column[1];

    });

});
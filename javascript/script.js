
// ==============================
// FEEDBACK RATING INTERACTION
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    //feedback rating card interaction - clicking on card selects the radio button
    const cards = document.querySelectorAll(".rating-card");

    cards.forEach(function(card){

        card.addEventListener("click", function(){

            const radio = card.querySelector("input");

            radio.checked = true;
        });
    });

    //get complaint number from URL and assign to hidden input field
    const urlParams = new URLSearchParams(window.location.search);
    const complaintNo = urlParams.get("complaintNo");

    //insert into hidden input field in feedback form
    if(complaintNo){

        document.getElementById("complaintNo").value = complaintNo;

        console.log("Complaint No:", complaintNo);
    }
    
});
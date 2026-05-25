document.addEventListener("DOMContentLoaded", function(){

    // GET ALL CATEGORY CARDS
    // querySelectorAll() selects every category card element on the page.
    const cards = document.querySelectorAll(".category-card");

    // LOOP THROUGH EACH CARD

    cards.forEach(function(card){

        // Make cards clickable
        card.style.cursor = "pointer";

        // WHEN CATEGORY IS CLICKED
        //addEventListener() waits for user clicks on each category.
        //Creates interactive behavior whenever a card is selected.
        card.addEventListener("click", function(){

          
            // GET CATEGORY TITLE
            // querySelector() finds the title element within the clicked card and retrieves its text content.
            const categoryName = card.querySelector(".card-title").textContent.trim();


            // REDIRECT WITH URL PARAMETERS
            // encodeURIComponent() ensures special characters in category names are safely included in the URL.
            window.location.href = `complaint.html?name=${encodeURIComponent(categoryName)}`;
        });
    });
});
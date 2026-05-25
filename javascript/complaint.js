window.onload = function(){

    
    // GET URL PARAMETERS
    
    const urlParams = new URLSearchParams(window.location.search);

   
    // GET CATEGORY NAME
   

    const categoryName = urlParams.get("name");

    console.log(categoryName);

  
    // DISPLAY CATEGORY

    document.getElementById("chosenCategory").textContent = categoryName;


    // STORE INSIDE HIDDEN INPUT
  

    document.getElementById("categoryName").value = categoryName;
};
document.addEventListener("DOMContentLoaded", () => {
    const insertBtn = document.getElementById("insertBtn");
    
    if (insertBtn) {
        insertBtn.addEventListener("click", () => {
            window.location.href = "category.html";
        });
    }
});
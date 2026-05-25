document.addEventListener("DOMContentLoaded", () => {

    const tableBody = document.getElementById("removeComplaintTableBody");

    const selectAllCheck = document.getElementById("selectAllCheckbox");

    const deleteBtn = document.getElementById("deleteSelectedBtn");

    const counterText = document.getElementById("selectionCountText");

    const searchInput =document.getElementById("removeSearch");

    let complaintData = [];



    // =================================================
    // FETCH DATABASE DATA
    // =================================================

    fetch("../php/getRemoveComplaints.php")

    .then(function(response){

        return response.text();
    })

    .then(function(data){

        if(data.trim() == ""){

            renderTable([]);

            return;
        }

        const rows =
            data.trim().split("\n");

        complaintData = [];

        rows.forEach(function(row){

            const column = row.split("|");

            complaintData.push({

                id: column[0],
                category: column[1],
                date: column[2],
                details: column[3],
                status: column[4]
            });
        });

        renderTable(complaintData);
    });



    // =================================================
    // RENDER TABLE
    // =================================================

    function renderTable(data){

        tableBody.innerHTML = "";

        if(data.length === 0){

            tableBody.innerHTML = `

                <tr>

                    <td colspan="6"
                        style="text-align:center;">

                        No complaints found.

                    </td>

                </tr>
            `;

            return;
        }


        data.forEach(function(item){

            const tr = document.createElement("tr");

            tr.setAttribute("data-id", item.id);

            tr.innerHTML = `

                <td style="text-align:center;"> 
                    <input type="checkbox" class="portal-checkbox row-checkbox">
                </td>

                <td style="font-weight:600;">

                    ${item.id}

                </td>

                <td>

                    ${item.category}

                </td>

                <td>

                    ${item.date}

                </td>

                <td style="font-style:italic;">

                    "${item.details}"

                </td>

                <td>

                    <div class="status-ring ring-warning">

                        <i class="fa-solid fa-clock"></i>

                    </div>

                </td>
            `;

            tableBody.appendChild(tr);
        });

        attachRowEvents();

        updateActionControls();
    }



    // =================================================
    // CHECKBOX EVENTS
    // =================================================

    function attachRowEvents(){

        const checkBoxes =
            document.querySelectorAll(".row-checkbox");

        checkBoxes.forEach(function(box){

            box.addEventListener("change", function(e){

                const tr = e.target.closest("tr");

                if(e.target.checked){

                    tr.classList.add("row-selected");
                }

                else{

                    tr.classList.remove("row-selected");
                }

                updateActionControls();
            });
        });
    }



    // =================================================
    // UPDATE COUNTER
    // =================================================

    // This function updates the state of action controls (like delete button and selection counter) based on the number of selected checkboxes
    function updateActionControls(){

        // Gets all checkboxes that are currently checked and all checkboxes in total
        const selectedBoxes = document.querySelectorAll(".row-checkbox:checked");

        // Gets all checkboxes in the table to compare with the number of selected checkboxes for "Select All" functionality
        const totalBoxes = document.querySelectorAll(".row-checkbox");

        // If there are any selected checkboxes, enables the delete button and updates the counter text to show how many items are selected 
        if(selectedBoxes.length > 0){

            // Enables the delete button by removing the "disabled" attribute
            deleteBtn.removeAttribute("disabled");

            // Updates the counter text to show the number of selected items
            counterText.textContent =
                `${selectedBoxes.length}
                 item(s) selected`;
        }

        else{

            // If no checkboxes are selected, disables the delete button and resets the counter text
            deleteBtn.setAttribute("disabled","true");

            // Resets the counter text to indicate that no rows are selected
            counterText.textContent = "No rows selected";
        }


        if(
            totalBoxes.length > 0 && selectedBoxes.length == totalBoxes.length // If all checkboxes are selected, checks the "Select All" checkbox; otherwise, unchecks it
        ){

            selectAllCheck.checked = true; // Checks the "Select All" checkbox if all individual checkboxes are selected
        }

        else{

            selectAllCheck.checked = false; // Unchecks the "Select All" checkbox if not all individual checkboxes are selected
        }
    }



    // =================================================
    // SELECT ALL
    // =================================================

    selectAllCheck.addEventListener("change", function(e){

        const checkboxes = document.querySelectorAll(".row-checkbox");

        checkboxes.forEach(function(box){

            box.checked = e.target.checked;

            const tr = box.closest("tr");

            if(e.target.checked){

                tr.classList.add("row-selected");
            }

            else{

                tr.classList.remove("row-selected");
            }
        });

        updateActionControls();
    });



    // =================================================
    // SEARCH BAR
    // =================================================

    if(searchInput){

    searchInput.addEventListener("input", function(e){

        const val = e.target.value.trim();

        // SHOW ALL DATA IF SEARCH BOX EMPTY
        if(val === "")
            {
                renderTable(complaintData);
                return;
            }

            // FILTER ONLY EXACT COMPLAINT NUMBER
            const filtered = complaintData.filter(function(x){

                return x.id === val;
            });

            renderTable(filtered);
        });
    }



    // =================================================
    // DELETE SELECTED
    // =================================================

    deleteBtn.addEventListener("click", function(){

        const selectedBoxes = document.querySelectorAll(".row-checkbox:checked");

        if(selectedBoxes.length === 0){

            return;
        }


        if(confirm(

            `Remove ${selectedBoxes.length}
            selected complaint(s)?`

        )){

            selectedBoxes.forEach(function(box){

                const tr = box.closest("tr");

                const targetId = tr.getAttribute("data-id");


                fetch(`../php/remove_complaint.php?complaintNo=${targetId}`)

                .then(function(response){

                    return response.text();
                })

                .then(function(data){

                    if(data.trim() === "success"){

                        // Remove table row
                        tr.remove();


                        // Remove from array
                        complaintData = complaintData.filter(function(c){
                            return(c.id != targetId);
                        });

                        updateActionControls();

                        alert("Complaint deleted successfully.");
                    }else{

                        alert(

                            "Failed to delete complaint."
                        );
                    }
                })

                .catch(function(){

                    alert(

                        "Database connection error."
                    );
                });
            });
        }
    });
});
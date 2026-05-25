document.addEventListener("DOMContentLoaded", function () {

    const complaintBody =  document.getElementById("complaintBody");

    const searchInput = document.getElementById("searchComplaint");

    let complaintData = [];



    // =========================================
    // LOAD COMPLAINTS
    // =========================================

    fetch("../php/getComplaintList.php")

    .then(function(response){

        return response.text();
    })

    .then(function(data){

        complaintData = [];

        if(data.trim() == ""){

            renderTable([]);

            return;
        }

        const rows = data.trim().split("\n");

        rows.forEach(function(row){

            const column = row.split("|");

            // Extracts data from each row and creates a complaint object
            complaintData.push({

                complaintNo: column[0],
                studentID: column[1],
                title: column[2],
                status: column[3]
            });

        });

        renderTable(complaintData);

    });



    // =========================================
    // RENDER TABLE
    // =========================================

    function renderTable(data){

        complaintBody.innerHTML = "";

        if(data.length === 0){

            complaintBody.innerHTML = `

                <tr>
                    <td colspan="5">
                        No complaints found.
                    </td>
                </tr>
            `;

            return;
        }

        // For each complaint item, creates a table row with complaint details and status dropdown
        data.forEach(function(item){

            // Determines the feedback button text based on complaint status
            let row = document.createElement("tr");

            row.innerHTML = `

                <td>${item.complaintNo}</td>

                <td>${item.studentID}</td>

                <td>${item.title}</td>

                <td>

                    <select class="status-dropdown" id="status${item.complaintNo}">

                        <option class="status-dropdown-choice" value="Pending"
                        ${item.status == "Pending" ? "selected" : ""}>
                        Pending
                        </option>

                        <option class="status-dropdown-choice" value="In Process"
                        ${item.status == "In Process" ? "selected" : ""}>
                        In Process
                        </option>

                        <option class="status-dropdown-choice" value="Complete"
                        ${item.status == "Complete" ? "selected" : ""}>
                        Complete
                        </option>

                    </select>

                </td>

                <td>

                    <button class="update-status-btn" onclick="updateStatus('${item.complaintNo}')">

                    Update

                    </button>

                </td>
            `;

            complaintBody.appendChild(row);

        });

    }


    // SEARCH
    // Listens for input in the search field and filters complaints by exact complaint number
    searchInput.addEventListener("input", function(e){

        // GET USER INPUT
        const val = e.target.value.trim();

        // SHOW ALL DATA IF SEARCH IS EMPTY
        if(val === ""){
            renderTable(complaintData);
            return;
        }

        // FILTER USING EXACT COMPLAINT NUMBER
        const filtered = complaintData.filter(function(item){

            return item.complaintNo === val;

        });

        renderTable(filtered);

    });
});





// =========================================
// UPDATE STATUS
// =========================================

// This function is called when the "Update" button is clicked for a complaint
// It retrieves the selected status from the dropdown, sends an AJAX request to update the status in the database,
//  and reloads the page to reflect changes.
// ajax allows web pages to update content dynamically by exchanging data with a server in the background without requiring a full page reload
function updateStatus(complaintNo){

    let status = document.getElementById("status" + complaintNo).value;

    let formData = new FormData();

    formData.append("complaintNo", complaintNo);

    formData.append("status", status);

    fetch("../php/updateComplaintStatus.php",
    {
        method: "POST",
        body: formData
    })

    .then(function(response){

        return response.text();
    })

    .then(function(data){

        alert(data);

        location.reload();

    });

}
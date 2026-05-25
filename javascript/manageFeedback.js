document.addEventListener("DOMContentLoaded", function () {

    const feedbackBody =
        document.getElementById("feedbackBody");

    const searchInput =
        document.getElementById("searchFeedback");

    let feedbackData = [];



    // =====================================
    // LOAD FEEDBACK
    // =====================================

    fetch("../php/getFeedbackList.php")

    .then(function(response){

        return response.text();
    })

    .then(function(data){

        feedbackData = [];

        if(data.trim() == ""){

            renderTable([]);

            return;
        }

        const rows =
            data.trim().split("\n");

        rows.forEach(function(row){

            const column =
                row.split("|");

            feedbackData.push({

                feedbackNo: column[0],
                complaintNo: column[1],
                studentID: column[2],
                feedback: column[3]
            });

        });

        renderTable(feedbackData);

    });



    // =====================================
    // RENDER TABLE
    // =====================================

    function renderTable(data){

        feedbackBody.innerHTML = "";

        if(data.length === 0){

            feedbackBody.innerHTML = `

                <tr>
                    <td colspan="5">
                        No feedback found.
                    </td>
                </tr>
            `;

            return;
        }

        data.forEach(function(item){

            let row =
                document.createElement("tr");

            row.innerHTML = `

                <td>${item.feedbackNo}</td>

                <td>${item.complaintNo}</td>

                <td>${item.studentID}</td>

                <td>${item.feedback}</td>

                <td>

                    <button class="delete-feedback-btn" onclick="deleteFeedback('${item.feedbackNo}')">

                    Delete

                    </button>

                </td>
            `;

            feedbackBody.appendChild(row);

        });

    }



    // =====================================
    // SEARCH
    // =====================================

    searchInput.addEventListener("input", function(e){

        // GET USER INPUT
        const val = e.target.value.trim();

        // SHOW ALL DATA IF SEARCH IS EMPTY
        if(val === ""){
            renderTable(feedbackData);
            return;
        }

        // FILTER USING EXACT FEEDBACK NUMBER
        const filtered = feedbackData.filter(function(item){

                return item.feedbackNo === val;

        });

        renderTable(filtered);

    });

});



// =====================================
// DELETE FEEDBACK
// =====================================

function deleteFeedback(feedbackNo){

    // Creates a FormData object to send the feedback number to the server for deletion
    let formData = new FormData();

    // Appends the feedback number to the FormData object with the key "feedbackNo"
    formData.append("feedbackNo", feedbackNo);

    // Sends an AJAX POST request to delete the feedback with the specified feedback number
    fetch("../php/deleteFeedback.php",{method: "POST", body: formData})

    // After receiving the response from the server, displays an alert with the response message and reloads the page to reflect changes
    .then(function(response){

        return response.text();
    })

    // After receiving the response from the server, displays an alert with the response message and reloads the page to reflect changes
    .then(function(data){

        alert(data);

        location.reload();

    });

}
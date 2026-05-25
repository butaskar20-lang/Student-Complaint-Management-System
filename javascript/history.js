/* stores all complaint data globally for searching/filtering */
let complaintData = [];


/* renders complaint table dynamically */
function renderTable(data){

    const table = document.getElementById("historyTableBody");

    table.innerHTML = "";

    // no complaint records found
    if(data.length === 0){

        table.innerHTML = `

            <tr>

                <td colspan="6">
                    No complaint history found.
                </td>

            </tr>

        `;

        return;
    }

    data.forEach(function(item){

        const complaintNo = item.complaintNo;

        const categoryName = item.categoryName;

        const complaintTitle = item.complaintTitle;

        const status = item.status.toLowerCase();

        const feedbackExists = item.feedbackExists.toLowerCase();

        let feedbackButton = "";

        let updateButton = "";


        // complaint incomplete
        if(status != "complete"){

            feedbackButton = `

                <button class="feedback-btn"
                disabled
                style="opacity:0.5; cursor:not-allowed;">

                Complaint Not Complete

                </button>

            `;

            updateButton = `

                <button class="updateFeedback-btn"
                disabled
                style="opacity:0.5; cursor:not-allowed;">

                Unavailable

                </button>

            `;
        }

        // complaint complete but feedback not submitted
        else if(
            status == "complete" && feedbackExists == "no"
        ){

            feedbackButton = `

                <a href=
                "feedback.html?complaintNo=${complaintNo}"
                class="feedback-btn">

                Give Feedback

                </a>

            `;

            updateButton = `

                <button class="updateFeedback-btn"
                disabled
                style="opacity:0.5; cursor:not-allowed;">

                Submit Feedback First

                </button>

            `;
        }

        // complaint complete and feedback exists
        else{

            feedbackButton = `

                <button class="feedback-btn"
                disabled
                style="opacity:0.5; cursor:not-allowed;">

                Feedback Submitted

                </button>

            `;

            updateButton = `

                <a href=
                "updateFeedback.html?complaintNo=${complaintNo}"
                class="updateFeedback-btn">

                Update Feedback

                </a>

            `;
        }


        const tr = document.createElement("tr");

        tr.innerHTML = `

            <td>${complaintNo}</td>

            <td>${categoryName}</td>

            <td>${complaintTitle}</td>

            <td>${status}</td>

            <td>${feedbackButton}</td>

            <td>${updateButton}</td>

        `;

        table.appendChild(tr);
    });
}


/* fetch complaint history from php backend */
fetch("../php/getComplaintHistory.php")

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

    /* converts php rows into javascript objects */
    complaintData = rows.map(function(row){

        const column = row.split("|");

        return{

            complaintNo: column[0],

            categoryName: column[1],

            complaintTitle: column[2],

            status: column[3],

            feedbackExists: column[4]
        };
    });

    renderTable(complaintData);
});


/* SEARCH FUNCTION */

const historySearch = document.getElementById("historySearch");

historySearch.addEventListener("input",function(e){

        // gets user input
        const val = e.target.value.trim();

        // show all complaints if search empty
        if(val === ""){

            renderTable(complaintData);

            return;
        }

        // filters by exact complaint number
        const filtered = complaintData.filter(function(item){

                return item.complaintNo === val;

            });

        renderTable(filtered);
    }
);
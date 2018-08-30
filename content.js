var placeholder;
$(document).ready(function () {
    createLoginPage();
    $('#date').datepicker({
        format: 'dd/mm/yyyy'
    });

    //adds new record if frmAddSampleRecord is valid, adds record to sample data and refreshs interested areas in screen
    $("#btnAddNewRecord").click(function () {
        if ($("#frmAddSampleRecord").valid()) {
            if ($("#btnAddNewRecord").text() == "Add") {
                var newRow = {
                    type: $("#type").val(),
                    extdesc: $("#extdesc").val(),
                    description: $("#description").val(),
                    amount: $("#amount").val(),
                    differed: $("#differed").val() == 0 ? "false" : "true",
                    date: $("#date").val()
                };
                objs.push(newRow);
                sortIfTableSorted();
                setTableRows();
                createDullDiv();

                $("#addRecordModal").modal("hide");
            }
            else {
                editRecord();
            }
        } else {
            errorCount = 0;
        }
    });

    //When addRecordModal is closing , makes rearrangements in modal
    $('#addRecordModal').on('hidden.bs.modal', function () {
        if ($("#recordId").val() == "-1") {
            $("#btnAddNewRecord").text("Add");
            $("#recordId").val("-1");
        }
        addFormValidation.resetForm();
        clearForm();
    });

    //When addRecordModal is openning, sets date value in the form as today
    $('#addRecordModal').on('show.bs.modal', function () {
        if ($("#recordId").val() == "-1") {
            $('#date').datepicker("setDate", new Date());
        }
    });

    //frmAddSampleRecord validation settings
    var addFormValidation = $("#frmAddSampleRecord").validate({ // validation of new record format
        messages: {
            type: {
                required: 'Enter type'
            },
            extdesc: {
                required: 'Enter Ext Desc'
            },
            description: {
                required: 'Enter Description'
            },
            amount: {
                required: 'Enter Amount'
            },
            differed: {
                required: 'Enter Differed'
            },
            date: {
                required: "Enter Date"
            }

        }
    });
});

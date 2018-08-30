var objs;
function createMainPage() {
    $("#contentDiv").empty();
    addLogoutButton();
    createGridArea();
    createButtonGroups();
    makeDraggable();
    makeResizable();
    addTabs();
}

//This will sort array asc by type attr
function SortByType(a, b) {
    var aType = a.type.toLowerCase();
    var bType = b.type.toLowerCase();
    return ((aType < bType) ? -1 : ((aType > bType) ? 1 : 0));
}

//This will sort array asc by extdesc attr
function SortByExtDesc(a, b) {
    var aExtDesc = a.extdesc.toLowerCase();
    var bExtDesc = b.extdesc.toLowerCase();
    return ((aExtDesc < bExtDesc) ? -1 : ((aExtDesc > bExtDesc) ? 1 : 0));
}

//This will sort array asc by description attr
function SortByDescription(a, b) {
    var aDesc = a.description.toLowerCase();
    var bDesc = b.description.toLowerCase();
    return ((aDesc < bDesc) ? -1 : ((aDesc > bDesc) ? 1 : 0));
}

//This will sort array asc by differed attr
function SortByDiffered(a, b) {
    var aDiffered = String(a.differed);
    var bDiffered = String(b.differed);
    return ((aDiffered < bDiffered) ? -1 : ((aDiffered > bDiffered) ? 1 : 0));
}

//This will sort array asc by amount attr
function SortByAmount(a, b) {
    return a.amount - b.amount;
}

//This will sort array asc by date attr
function SortByDate(a, b) {
    var aDate = a.date.split("/");
    var bDate = b.date.split("/");
    return new Date(aDate[2] + "-" + aDate[1] + "-" + aDate[0]) > new Date(bDate[2] + "-" + bDate[1] + "-" + bDate[0]);
}

//This function creates buttons in main page
function createButtonGroups() {
    $("#contentDiv").append('<div class="col-sm-12"><div class="btn-group" role="group">' +
        '<div class="dropdown">  ' +
        '     <button id="btnRemoveCol" class="btn btn-sm btn-sn dropdown-toggle" type="button" data-toggle="dropdown">Remove Column  ' +
        '     <span class="caret"></span></button>  ' +
        '     <ul class="dropdown-menu">  ' +
        '       <li id="remCol1"><a class="dropdown-item" href="javascript:removeCol(1);">Remove Type</a></li>  ' +
        '       <li id="remCol2"><a class="dropdown-item" href="javascript:removeCol(2);">Remove Ext Desc</a></li>  ' +
        '       <li id="remCol3"><a class="dropdown-item" href="javascript:removeCol(3);">Remove Description</a></li>  ' +
        '       <li id="remCol4"><a class="dropdown-item" href="javascript:removeCol(4);">Remove Amount</a></li>  ' +
        '       <li id="remCol5"><a class="dropdown-item" href="javascript:removeCol(5);">Remove Differed</a></li>  ' +
        '       <li id="remCol6"><a class="dropdown-item" href="javascript:removeCol(6);">Remove Date</a></li>  ' +
        '     </ul>  ' +
        '      <button type="button" class="btn btn-sm btn-sn " data-toggle="modal" data-target="#addRecordModal">New Record</button>' +
        '  </div> </div> </div>');
}

//This function removes column which is selected.
function removeCol(index) {
    $(".column-" + index).remove();
    makeDraggable();
    $("#remCol" + index).remove();
}

//Adds logout button to top right corner
function addLogoutButton() {
    $("#contentDiv").append('<div class="col-sm-12"><a href="javascript:createLoginPage();" class="btn btn-sn btn-sm col-sm-1 pull-right">  ' +
        '               <span class="glyphicon glyphicon-log-out"></span> Log out  ' +
        '           </a></div>');
}

//This function creates grid area in main page
function createGridArea() {
    $("#contentDiv").append('   <div class="col-sm-12">        <div id="sn-table-div">  ' +
        '               <div class="row">  ' +
        '                   <div class="column column-1 notsorted">  ' +
        '                       <div class="sn-table-header col-sm-12">  ' +
        '                           <div class="sn-table-header-cell nowrap">Type</div>  ' +
        '                       </div>  ' +
        '                   </div>  ' +
        '                   <div class="column column-2 notsorted">  ' +
        '                       <div class="sn-table-header col-sm-12">  ' +
        '                           <div class="sn-table-header-cell nowrap">Ext Desc</div>  ' +
        '                       </div>  ' +
        '                   </div>  ' +
        '                   <div class="column column-3 notsorted">  ' +
        '                       <div class="sn-table-header col-sm-12">  ' +
        '                           <div class="sn-table-header-cell nowrap">Description</div>  ' +
        '                       </div>  ' +
        '                   </div>  ' +
        '                   <div class="column column-4 notsorted">  ' +
        '                       <div class="sn-table-header col-sm-12">  ' +
        '                           <div class="sn-table-header-cell nowrap">Amount</div>  ' +
        '                       </div>  ' +
        '                   </div>  ' +
        '                   <div class="column column-5 notsorted">  ' +
        '                       <div class="sn-table-header col-sm-12">  ' +
        '                           <div class="sn-table-header-cell nowrap">Differed</div>  ' +
        '                       </div>  ' +
        '                   </div>  ' +
        '                   <div class="column column-6 notsorted">  ' +
        '                       <div class="sn-table-header col-sm-12">  ' +
        '                           <div class="sn-table-header-cell nowrap">Date</div>  ' +
        '                       </div>  ' +
        '                   </div>  ' +
        '                   <div class="column column-7 notsorted">  ' +
        '                       <div class="sn-table-header col-sm-12">  ' +
        '                           <div class="sn-table-header-cell nowrap">Edit</div>  ' +
        '                       </div>  ' +
        '                   </div>  ' +
        '                   <div class="column column-8 notsorted">  ' +
        '                       <div class="sn-table-header col-sm-12">  ' +
        '                           <div class="sn-table-header-cell nowrap">Delete</div>  ' +
        '                       </div>  ' +
        '                   </div>  ' +
        '               </div>  ' +
        '          </div></div>  ');
    $("#sn-table-div").scroll(fixDiv);
    $(".sn-table-header").click(function () {
        setSortingAbility($(this));
    });
    objs = getObjectsFromJson();
    formatAllDates(objs);
    setTableRows();
}

//Adds sorting ability to column 
function setSortingAbility(elem) {

    if ($(elem).parent().hasClass("column-1")) {
        if ($(elem).parent().hasClass("notsorted") || $(elem).parent().hasClass("sortedDesc")) {
            objs.sort(SortByType);
            addSortSettings("sortedAsc", $(elem));
        } else {
            objs.sort(SortByType).reverse();
            addSortSettings("sortedDesc", $(elem));
        }
        setTableRows();
    }
    else if ($(elem).parent().hasClass("column-2")) {
        if ($(elem).parent().hasClass("notsorted") || $(elem).parent().hasClass("sortedDesc")) {
            objs.sort(SortByExtDesc);
            addSortSettings("sortedAsc", $(elem));
        } else {
            objs.sort(SortByExtDesc).reverse();
            addSortSettings("sortedDesc", $(elem));
        }
        setTableRows();
    }
    else if ($(elem).parent().hasClass("column-3")) {
        if ($(elem).parent().hasClass("notsorted") || $(elem).parent().hasClass("sortedDesc")) {
            objs.sort(SortByDescription);
            addSortSettings("sortedAsc", $(elem));
        } else {
            objs.sort(SortByDescription).reverse();
            addSortSettings("sortedDesc", $(elem));
        }
        setTableRows();
    }
    else if ($(elem).parent().hasClass("column-4")) {
        if ($(elem).parent().hasClass("notsorted") || $(elem).parent().hasClass("sortedDesc")) {
            objs.sort(SortByAmount);
            addSortSettings("sortedAsc", $(elem));
        } else {
            objs.sort(SortByAmount).reverse();
            addSortSettings("sortedDesc", $(elem));
        }
        setTableRows();
    }
    else if ($(elem).parent().hasClass("column-5")) {
        if ($(elem).parent().hasClass("notsorted") || $(elem).parent().hasClass("sortedDesc")) {
            objs.sort(SortByDiffered);
            addSortSettings("sortedAsc", $(elem));
        } else {
            objs.sort(SortByDiffered).reverse();
            addSortSettings("sortedDesc", $(elem));
        }
        setTableRows();
    }
    else if ($(elem).parent().hasClass("column-6")) {
        if ($(elem).parent().hasClass("notsorted") || $(elem).parent().hasClass("sortedDesc")) {
            objs.sort(SortByDate);
            addSortSettings("sortedAsc", $(elem));
        } else {
            objs.sort(SortByDate).reverse();
            addSortSettings("sortedDesc", $(elem));
        }
        setTableRows();
    }
}

//Format all dates read from json array.
function formatAllDates() {
    $(objs).each(function () {
        this.date = formatDate(this.date);
    });
}

//Creates fixed header
function fixDiv() {
     var $cache = $('.column:nth-child(odd) .sn-table-header');
     if ($("#sn-table-div:visible").scrollTop() > $(".sn-table-header:first").height())
         $cache.css({
             'position': 'sticky',
             'background' : '#f8f8f6',
             'top': '0px'
         });
     else
         $cache.css({
             'position': 'relative',
             'background-color' : 'transparent',
             'top': 'auto'
         });
         var $cache2 = $('.column:nth-child(even) .sn-table-header');
         if ($("#sn-table-div:visible").scrollTop() > $(".sn-table-header:first").height())
             $cache2.css({
                 'position': 'sticky',
                 'background' : '#e8e7e2',
                 'top': '0px'
             });
         else
             $cache2.css({
                 'position': 'relative',
                 'background-color' : 'transparent',
                 'top': 'auto'
             });
}

//If table sorted, this function sorts again 
function sortIfTableSorted() {
    isSorted = false;
    if ($(".column").hasClass("sortedAsc")) {
        if ($(".column.sortedAsc:first").hasClass("column-1")) {
            objs.sort(SortByType);
            isSorted = true;
        }
        else if ($(".column.sortedAsc:first").hasClass("column-2")) {
            objs.sort(SortByExtDesc);
            isSorted = true;
        }
        else if ($(".column.sortedAsc:first").hasClass("column-3")) {
            objs.sort(SortByDescription);
            isSorted = true;
        }
        else if ($(".column.sortedAsc:first").hasClass("column-4")) {
            objs.sort(SortByAmount);
            isSorted = true;
        }
        else if ($(".column.sortedAsc:first").hasClass("column-5")) {
            objs.sort(SortByDiffered);
            isSorted = true;
        }
        else if ($(".column.sortedAsc:first").hasClass("column-6")) {
            objs.sort(SortByDate);
            isSorted = true;
        }
    }
    else if ($(".column").hasClass("sortedDesc")) {
        if ($(".column.sortedDesc:first").hasClass("column-1")) {
            objs.sort(SortByType).reverse();
            isSorted = true;
        }
        else if ($(".column.sortedDesc:first").hasClass("column-2")) {
            objs.sort(SortByExtDesc).reverse();
            isSorted = true;
        }
        else if ($(".column.sortedDesc:first").hasClass("column-3")) {
            objs.sort(SortByDescription).reverse();
            isSorted = true;
        }
        else if ($(".column.sortedDesc:first").hasClass("column-4")) {
            objs.sort(SortByAmount).reverse();
            isSorted = true;
        }
        else if ($(".column.sortedDesc:first").hasClass("column-5")) {
            objs.sort(SortByDiffered).reverse();
            isSorted = true;
        }
        else if ($(".column.sortedDesc:first").hasClass("column-6")) {
            objs.sort(SortByDate).reverse();
            isSorted = true;
        }
    }
    return isSorted;
}

//Adds sorting class and sorting icon to sorted column 
function addSortSettings(newSortClass, elem) {
    clearSortSettings();
    $(elem).parent().removeClass("notsorted");
    if (newSortClass == "sortedAsc") {
        $(elem).parent().addClass("sortedAsc");
        $(elem).find(".sn-table-header-cell:first").append("<i class='fa fa-chevron-up'></i>");
    } else {
        $(elem).parent().addClass("sortedDesc");
        $(elem).find(".sn-table-header-cell:first").append("<i class='fa fa-chevron-down'></i>");
    }
}

//if there is a sorting class in the table, removes.
function clearSortSettings() {
    if ($(".column").hasClass("sortedAsc")) {
        $(".column").removeClass("sortedAsc");
    }
    if ($(".column").hasClass("sortedDesc")) {
        $(".column").removeClass("sortedDesc");
    }
    if ($(".column").hasClass("notsorted")) {
        $(".column").removeClass("notsorted");
    }
    $(".column").addClass("notsorted");
    $(".sn-table-header-cell i").remove();
}

//Reset all rows with objs array
function setTableRows() {
    $(".sn-table-body-cell").remove();
    //Set table cell values.
    $(objs).each(function (index) {
        addNewRowToTable(this.type, this.extdesc, this.description, this.amount, this.differed, this.date, index);
    });
}

//Formats date 'yyyy-mm-dd' to 'dd/mm/yyyy' 
function formatDate(date) {
    var datepartArr = date.split("-");
    return datepartArr[2] + "/" + datepartArr[1] + "/" + datepartArr[0];
}

//Deletes Sample Data from table
function deleteRecord(id) {
    var elemIndex = id.split("-")[1];
    objs.splice(elemIndex, 1);
    sortIfTableSorted();
    setTableRows();
    createDullDiv();
}

//Adds new row to grid area
function addNewRowToTable(type, extdesc, description, amount, differed, date, index) {

    $(".column-1").append('<div class="sn-table-body-cell sn-' + index + ' snText col-sm-12 nowrap"> ' + type + '</div>');
    $(".column-2").append('<div class="sn-table-body-cell sn-' + index + ' snText col-sm-12 nowrap">' + extdesc + '</div>');
    $(".column-3").append('<div class="sn-table-body-cell sn-' + index + ' snText col-sm-12 nowrap">' + description + '</div>');
    $(".column-4").append('<div class="sn-table-body-cell sn-' + index + ' snDouble col-sm-12 nowrap">' + parseFloat(amount).toFixed(2) + '</div>');
    $(".column-5").append('<div class="sn-table-body-cell sn-' + index + ' snText col-sm-12 nowrap">' + differed + '</div>');
    $(".column-6").append('<div class="sn-table-body-cell sn-' + index + ' snDate col-sm-12 nowrap">' + date + '</div>');
    $(".column-7").append('<div class="sn-table-body-cell sn-' + index + ' col-sm-12 snButton" ><a href="javascript:editModalOpen(' + "'sn-" + index + "'" + ');">Edit</a></div>');
    $(".column-8").append('<div class="sn-table-body-cell sn-' + index + ' col-sm-12 snButton" ><a href="javascript:deleteRecord(' + "'sn-" + index + "'" + ');">Delete</a></div>');
}

//Set sample data attributes to modal for editing
function editModalOpen(recId) {
    var recordId = recId.split("-")[1];
    $("#recordId").val(recId);
    $("#type").val(objs[recordId].type);
    $("#extdesc").val(objs[recordId].extdesc);
    $("#description").val(objs[recordId].description);
    $("#amount").val(objs[recordId].amount);
    $("#differed").val(objs[recordId].differed == "true" ? "1" : "0");
    var dateArr = objs[recordId].date.split("/");
    $('#date').datepicker("setDate", new Date(dateArr[2],parseInt(dateArr[1])-1,dateArr[0]) );
    $("#btnAddNewRecord").text("Save");
    $("#addRecordModal").modal();
}

//Edits sample data
function editRecord() {
    var ind = $("#recordId").val().split("-")[1];
    objs[ind].type = $("#type").val();
    objs[ind].extdesc = $("#extdesc").val();
    objs[ind].description = $("#description").val();
    objs[ind].amount = $("#amount").val();
    objs[ind].differed = $("#differed").val() == "1" ? true : false;
    objs[ind].date = $("#date").val();
    if (sortIfTableSorted()) {
        setTableRows();
    } else {
        $(".column-1 ." + $("#recordId").val()).text($("#type").val());
        $(".column-2 ." + $("#recordId").val()).text($("#extdesc").val());
        $(".column-3 ." + $("#recordId").val()).text($("#description").val());
        $(".column-4 ." + $("#recordId").val()).text($("#amount").val());
        $(".column-5 ." + $("#recordId").val()).text($("#differed").val() == "1" ? true : false);
        $(".column-6 ." + $("#recordId").val()).text($("#date").val());
    }
    $("#addRecordModal").modal('hide');
    createDullDiv();
}

function clearForm() {
    $("#frmAddSampleRecord input").val("");
    $("#differed").val($("#differed option:first").val());
    $("#recordId").val("-1");
}

//This function makes columns draggable
function makeDraggable() {
    $(".column").draggable({
        helper: "clone",
        create: function () {
        },
        start: function (e) {
            placeholder = e.target;
            $(placeholder).addClass("red");
        },
        stop: function (e) {
            $(placeholder).removeClass("red");
            placeholder = null;
        }
    });
    $(".column").droppable({
        drop: function (e, ui) {
            $(placeholder).removeClass("red");
            placeholder = null;
            var drag = $(ui.draggable).clone();
            $(drag).replaceAll(this);
            $(this).replaceAll(ui.draggable);
            $(this).find(".sn-table-header:first").on("click", function (e) {
                e.preventDefault();
                setSortingAbility($(this));
            });
            $(drag).find(".sn-table-header:first").on("click", function (e) {
                e.preventDefault();
                setSortingAbility($(this));
            });
            $('.column').resizable();
            $('.column').resizable('destroy');
            makeDraggable();
            makeResizable();
        }
    });
}
//This function makes resizable columns
var tot_width;
var min_width = 20;
function makeResizable() {
    $('.column:not(:last-child)').resizable({
        handles: 'e',
        start: function () {
            tot_width = $(this).width() + $(this).next().width();
            $(this).resizable('option', 'maxWidth', (tot_width - min_width));
        },
        resize: function () {
            $(this).next().width(tot_width - $(this).width());
        }
});
}

//Parsing JSON string
function getObjectsFromJson() {
    return JSON.parse('   [{  ' +
        '   	"type": "POS",  ' +
        '   	"extdesc": "ABC VONS Store 1797 SAN DIEGO CAUS",  ' +
        '   	"description": "POS Transaction VONS Store 1797 SAN DIEGO CAUS",  ' +
        '   	"amount": "-4.43",  ' +
        '   	"differed": false,  ' +
        '   	"date": "2016-02-23"  ' +
        '   },   ' +
        '   {  ' +
        '   	"type": "CC",  ' +
        '   	"extdesc": "Amazon.com",  ' +
        '   	"description": "online retailer Amazon.com",  ' +
        '   	"amount": "-76.99",  ' +
        '   	"differed": true,  ' +
        '   	"date": "2016-04-08"  ' +
        '   },  ' +
        '    {  ' +
        '   	"type": "POS",  ' +
        '   	"extdesc": "shop #1",  ' +
        '   	"description": "online retailer #1",  ' +
        '   	"amount": "-100",  ' +
        '   	"differed": false,  ' +
        '   	"date": "2016-05-12"  ' +
        '   },   ' +
        '   {  ' +
        '   	"type": "DDeb",  ' +
        '   	"extdesc": "shop #2",  ' +
        '   	"description": "retailer #2",  ' +
        '   	"amount": "-120",  ' +
        '   	"differed": false,  ' +
        '   	"date": "2016-06-17"  ' +
        '   },  ' +
        '    {  ' +
        '   	"type": "POS",  ' +
        '   	"extdesc": "shop #3",  ' +
        '   	"description": "online retailer #3",  ' +
        '   	"amount": "-130",  ' +
        '   	"differed": false,  ' +
        '   	"date": "2016-08-20"  ' +
        '   },   ' +
        '   {  ' +
        '   	"type": "CC",  ' +
        '   	"extdesc": "shop #4",  ' +
        '   	"description": "retailer #4",  ' +
        '   	"amount": "-320",  ' +
        '   	"differed": true,  ' +
        '   	"date": "2016-10-30"  ' +
        '   },   ' +
        '   {  ' +
        '   	"type": "POS",  ' +
        '   	"extdesc": "shop #5",  ' +
        '   	"description": "online retailer #5",  ' +
        '   	"amount": "-101",  ' +
        '   	"differed": false,  ' +
        '   	"date": "2016-11-01"  ' +
        '   }]  ' +
        '    ');
}

//Checks list if it includes 'type' value as label attribute
function containsType(type, list) {
    var result = false;
    if (list != null && list.length > 0) {
        $(list).each(function (index) {
            if (list[index].label == type) {
                result = true;
            }
        });
    }
    return result;
}

//list : includes occurence of different 'type' values in the table
//if 'type' value in the list ,this function increments every occurence of the 'type' value in the table
function setCountOfType(elem, list) {
    $(list).each(function (index) {
        if (list[index].label == elem.type) {
            list[index].y = parseFloat(list[index].y) + 1;
        }
    });
}

//set y value of list with total occurence of each 'type' value in table 
function setPercentages(list) {
    if (list != null && list.length > 0) {
        $(list).each(function (index) {
            list[index].y = parseFloat(list[index].y) * 100 / objs.length;
        });
    }
    return list;
}

//Tab 1 filled by dull div which includes a pie chart
function createDullDiv() {
    var dataList = [];
    totalCount = 0;
    $("#contentDiv #tabs-1").empty();
    if (objs != null && objs.length > 0) {
        $(objs).each(function (index) {
            if (containsType(objs[index].type, dataList)) {
                setCountOfType(objs[index], dataList);
            } else {
                var exampleData = {
                    label: objs[index].type,
                    legendText: objs[index].type,
                    y: 1
                }
                dataList.push(exampleData);
            }
        });
        dataList = setPercentages(dataList);

        $("#tabs-1").append('<div class="tab" id="chartContainer"></div>');
        $("#chartContainer").CanvasJSChart({
            title: {
                text: "Data Count By Type",
                fontSize: 24
            },
            axisY: {
                title: "Count"
            },
            legend: {
                verticalAlign: "center",
                horizontalAlign: "right"
            },
            data: [
                {
                    type: "pie",
                    showInLegend: true,
                    toolTipContent: "{label} <br/> {y} %",
                    indexLabel: "{y} %",
                    dataPoints: dataList
                }
            ]
        });
    }
}


//Adds 2 tabs to main page
function addTabs() {
    $("#contentDiv").append('   <div id="tabs" class="col-sm-12">  ' +
        '     <ul>  ' +
        '       <li><a href="#tabs-1">Sample Statistics</a></li>  ' +
        '       <li><a href="#tabs-2">Info Tab</a></li>  ' +
        '     </ul>  ' +
        '     <div id="tabs-1">  ' +
        '     </div>  ' +
        '     <div id="tabs-2">Previous tab shows sample data count for each "type" with percentages.' +
        '     </div>  ' +
        '  </div>  ');
    $("#tabs").tabs();
    createDullDiv();
}
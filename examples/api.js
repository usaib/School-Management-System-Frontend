$(document).ready(function() {
function CreateTableFromJSON(jsonObject, element, label) {
    var col = [];
    for (var i = 0; i < jsonObject.length; i++) {
        for (var key in jsonObject[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    var table = document.getElementById("studentTable");
    var tr = table.insertRow(-1);
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    var nth=document.createElement('th');
    nth.innerHTML="Action";
    tr.appendChild(nth)
    for (var i = 0; i < jsonObject.length; i++) {

        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonObject[i][col[j]];

        }
        tr.insertCell(6).innerHTML="<button type='button' class='btn btn-warning md-6 sm-6' data-toggle='modal' data-target='#ModalEditCenter'> Edit </button> <button class='btn btn-danger' id='del' type='button' onclick='myFunction(this)'>Delete</button></td>";


    }



}
$.ajax({
    method: "GET",
    url: "http://192.168.0.113:5000/getstudents",
    data: "",
    dataType: 'json',
    success: function (data) {
        CreateTableFromJSON(data,"studentTableDiv","Student Table")
    },
    error: function (jqXHR, status, error) {
        debugger;
    },
    complete: function (jqXHR, status) {

    }
});
});
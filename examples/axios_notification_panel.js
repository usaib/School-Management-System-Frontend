// const submitButtonforTOS=document.getElementById('submitclassesforTOS');
// console.log(submitButtonforTOS);
$(document).ready(function() {
    $('#buttonshow').on("click", function()
{
    $(".collapsable").slideToggle();
});
});

function toggle(source) {
    checkboxes = document.getElementsByName('checks');
    for(var i=0, n=checkboxes.length;i<n;i++) {
      checkboxes[i].checked = source.checked;
    }
  }
function submitclassesforTOS(){
    $("#class_table").html("");
    var classes_sections= $('#classes_sections').val();
    axios.get(`http://192.168.0.106:5000/getstudentbyclassfornotification/${classes_sections}`)
    .then(function (response) {
      // handle success
      tableforstudents(response.data,"class_table","students");
      table=document.getElementById("class_table");
      for (var i = 1; i < response.data.length+1; i++) {
                tr = table.insertRow(-1);
                console.log(tr);
            table.rows[i].className = "collapsable";
            }
      $('#checkbox').show();
      $('#select').show();
      $('#buttonshow').show();
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
  
    });
    console.log(classes_sections);
}

function Send_Notifications(){
  var months = { 0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December' }
  let time=new Date().getDate() + '-' + months[new Date().getMonth()] + '-' + new Date().getFullYear()
  var title = $('#title').val();
  var description = $('#description').val();
  var checks = [];
          $.each($("input[name='checks']:checked"), function(){
           checks.push($(this).val());
          });
  console.log(time,title,description,checks);
  checks.toString();
  axios.post(`http://192.168.0.106:5000/sendnotification`,{      
    "time":time,
    "title":title,
    "description":description,
    "student_ids":checks,
  })
  .then(function (response) {
    // handle success

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed

  });

}


function Send_Notifications_toAll(){
  var months = { 0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December' }
  let time=new Date().getDate() + '-' + months[new Date().getMonth()] + '-' + new Date().getFullYear()
  var title = $('#title').val();
  var description = $('#description').val();
  axios.post(`http://192.168.0.106:5000/sendnotificationstoall`,{      
    "time":time,
    "title":title,
    "description":description,
  })
  .then(function (response) {
    // handle success

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed

  });


}

function tableforstudents(jsonObject, element, label) {
    var col = [];
    for (var i = 0; i < jsonObject.length; i++) {
        for (var key in jsonObject[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
        }
    var table = document.getElementById(element);
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
        var newCheckBox = document.createElement('input');
        newCheckBox.type = 'checkbox';
        newCheckBox.name='checks';
        newCheckBox.className='checks';
        newCheckBox.value=jsonObject[i][col[0]];
        tr.insertCell(-1).appendChild(newCheckBox);
        

    }
   
   
}
create=(data)=>{
    var col = [];
    debugger;
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }

    }
    var tab=document.getElementById("classes_sections");
    console.log(tab);
    for (var i = 0; i < data.length; i++) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(data[i][col[1]]));
        opt.append('-');
        opt.appendChild(document.createTextNode(data[i][col[0]]));
                opt.value = data[i][col[2]];
                tab.appendChild(opt); 
    }
}

recip=()=> {
    axios.get('http://192.168.0.106:5000/getclassseclabels')
  .then(function (response) {
    // handle success
    console.log(response.data);
    create(response.data);
    $('.selectpicker').selectpicker('refresh');
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

}
recip();






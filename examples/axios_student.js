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
  var nth = document.createElement('th');
  nth.innerHTML = "Action";
  tr.appendChild(nth)
  for (var i = 0; i < jsonObject.length; i++) {

    tr = table.insertRow(-1);
    for (var j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = jsonObject[i][col[j]];

    }
    tr.insertCell(6).innerHTML = "<button type='button' class='btn btn-warning md-6 sm-6' data-toggle='modal' data-target='#ModalEditCenter' onclick='getStudentID(this)'> Edit </button> <button class='btn btn-danger' id='del' type='button' onclick='deleteStudentData(this)'>Delete</button></td>";


  }



}
function getStudentID(element) {
  x= element.closest('tr').rowIndex;
  stid=document.getElementById("studentTable").rows[x].cells[0].innerHTML;
  return stid;
}

axios.get('http://192.168.0.106:5000/getstudents')
  .then(function (response) {
    // handle success
    CreateTableFromJSON(response.data, "studentTableDiv", "Student Table");
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

function addStudentData() {
  let name=document.getElementById('Name').value;
  let fname=document.getElementById('Fname').value;
  let phone=document.getElementById('Phone').value;
  let cnic=document.getElementById('Cnic').value;
  let Class=document.getElementById('Class').value;
  console.log(name,fname,phone,cnic,Class)
  axios.post('http://192.168.0.106:5000/addstudent', {
    name:name,
    fname:fname,
    Phone:phone,
    Class:Class,
    cnic:cnic 
    
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function editStudentData() {
  let name=document.getElementById('EditName').value;
  let fname=document.getElementById('EditFname').value;
  let phone=document.getElementById('EditPhone').value;
  let cnic=document.getElementById('EditCnic').value;
  let Class=document.getElementById('EditClass').value;
  console.log(name,fname,phone,cnic,Class,stid)
  axios.put('http://192.168.0.106:5000/updatestudent/'+stid, {
    name:name,
    fname:fname,
    Phone:phone,
    Class:Class,
    cnic:cnic 
    
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteStudentData(element) {
  x= element.closest('tr').rowIndex;
  stid=document.getElementById("studentTable").rows[x].cells[0].innerHTML;
  console.log(stid);
  let r=confirm("Are you sure you want to delete?");
  if (true){
    axios.delete('http://192.168.0.106:5000/delstudent/'+stid)
    .then(function (response) {
      console.log(response);
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  else{
    window.location.reload();
  }
 
}

create=(data,id)=>{
  var col = [];
  debugger;
  for (var i = 0; i < data.length; i++) {
      for (var key in data[i]) {
          if (col.indexOf(key) === -1) {
              col.push(key);
          }
      }
  }
  var tab=document.getElementById(id);
  console.log(tab);
  for (var i = 0; i < data.length; i++) {
      var opt = document.createElement('option');
      opt.appendChild(document.createTextNode(data[i][col[1]]));
              opt.value = data[i][col[0]];
              tab.appendChild(opt); 
  }
}
function getclasslabelsForCreateClass(){
  axios.get('http://192.168.0.106:5000/getclasslabels')
  .then(function (response) {
    // handle success
    create(response.data,'classespicker');
    $('.selectpicker').selectpicker('refresh');
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });  

}
getclasslabelsForCreateClass();
function getseclablesForCreateClass(){
  axios.get('http://192.168.0.106:5000/getsectionlabels')
  .then(function (response) {
    // handle success
    create(response.data,'sectionspicker');
    $('.selectpicker').selectpicker('refresh');
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });  
}
getseclablesForCreateClass();
function createClassSecpicker(data,id){
  var col = [];
  debugger;
  for (var i = 0; i < data.length; i++) {
      for (var key in data[i]) {
          if (col.indexOf(key) === -1) {
              col.push(key);
          }
      }

  }
  var tab=document.getElementById(id);
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
function getclasssecforEditandAddStudent(id){
axios.get('http://192.168.0.106:5000/getclassseclabels')
  .then(function (response) {
    // handle success
    console.log(response.data);
    createClassSecpicker(response.data,id);
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
getclasssecforEditandAddStudent('editstudentsdataclasspicker'); 
getclasssecforEditandAddStudent('addstudentsdataclasspicker');
function createClassFromClassSecLabels(){
  classlabel=document.getElementById('classespicker').value;
  sectionlabel=document.getElementById('sectionspicker').value;
  room_no=document.getElementById('RoomNum').value;
  strength=document.getElementById('Strength').value
  axios.post('http://192.168.0.106:5000/addcreatedclasslabel', {
    sec_id:sectionlabel,
    class_id:classlabel,
    room_no:room_no,
    strength:strength
    
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
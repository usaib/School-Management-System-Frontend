function addclassnames(){
    let classname=document.getElementById('ClassName').value;
    let romanname=document.getElementById('RomanName').value;
    axios.post('http://192.168.0.106:5000/addclasslabel', {
    class_name:classname,
    roman_name:romanname
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function addsecnames(){
    let secname=document.getElementById('SecName').value;
    axios.post('http://192.168.0.106:5000/addsectionlabel', {
    sec_name:secname,
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
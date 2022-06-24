function EqualsPassword()
{
  var pass = document.getElementById("Pass").value;
  var confirm = document.getElementById("confirm").value;
  var form = document.getElementById("formPASS");

  if(pass == confirm)
  {
   form.submit();
  }
  else {
   console.log("SENHAS DIFERENTES");

    // alert("Senhas Diferentes");
  }
}

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

function confirm(userData){

  let id = userData.UserId;

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/deleteUser?UserId=${id}`;
    }
  })
}

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
    title: 'Você tem certeza que deseja deletar a sua conta?',
    text: "Você não poderá reverter isso!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Apagar!',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/deleteUser?UserId=${id}`;
    }
  })
}

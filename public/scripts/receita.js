// function confirmar(receita){
//     var alert = window.confirm("Tem certeza que deseja Apagar essa Receita?");
//     if(alert){
//         window.location.href = "http://localhost:3000/receitaDEL?ReceitaId="+receita.ReceitaId;
//     }
// }


function confirm(receitaData){

  let id = receitaData.ReceitaId;

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
      window.location.href = `/receitaDEL?ReceitaId=${id}`;
    }
  })
}

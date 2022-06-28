// function confirmar(receita){
//     var alert = window.confirm("Tem certeza que deseja Apagar essa Receita?");
//     if(alert){
//         window.location.href = "http://localhost:3000/receitaDEL?ReceitaId="+receita.ReceitaId;
//     }
// }


function confirm(receitaData){

  let id = receitaData.ReceitaId;

  Swal.fire({
    title: 'Você tem certeza que deseja apagar essa Receita?',
    text: "Você não poderá reverter isso!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Apagar!',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/receitaDEL?ReceitaId=${id}`;
    }
  })
}

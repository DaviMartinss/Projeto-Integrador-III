// function confirmar(numCC){
//     var alert = window.confirm("Tem certeza que deseja Apagar o Cartão de Crédito de número "+numCC+ " ?");
//     if(alert){
//         window.location.href = "http://localhost:3000/deleteCartao?NumCartao="+numCC+"&Type=CC";
//     }
//
// }

function confirm(cartaoData){

  let numCC = cartaoData.NumCC;

  Swal.fire({
    title: 'Você tem certeza que deseja apagar o Cartão de Crédito ' + numCC +' ?',
    text: "Você não poderá reverter isso!!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Apagar!',
  
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/deleteCartao?NumCartao=${numCC}&&Type=CC`;
    }
  })
}

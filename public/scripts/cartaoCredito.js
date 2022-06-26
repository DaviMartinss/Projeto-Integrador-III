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
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/deleteCartao?NumCartao=${numCC}&&Type=CC`;
    }
  })
}

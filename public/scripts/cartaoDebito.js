// function confirmar(numCD){
//     var alert = window.confirm("Tem certeza que deseja Apagar o Cartão de Débito de número "+numCD+ " ?");
//     if(alert){
//         window.location.href = "http://localhost:3000/deleteCartao?NumCartao="+numCD+"&Type=CD";
//     }
// }


function confirm(cartaoData){

  let numCD = cartaoData.NumCD;

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
      window.location.href = `/cartaoDEL?NumCartao=${numCD}&&Type=CD`;
    }
  })
}

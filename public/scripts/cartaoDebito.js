function confirm(numCD){

  //let numCD = cartaoData.NumCD;
  console.log("chegou: "+numCD);
  Swal.fire({
    title: 'Você tem certeza que deseja apagar o Cartão de Débito ' + numCD +' ?',
    text: "Você não poderá reverter isso!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, Apagar!'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/deleteCartao?NumCartao=${numCD}&&Type=CD`;
      
    }
  })
}

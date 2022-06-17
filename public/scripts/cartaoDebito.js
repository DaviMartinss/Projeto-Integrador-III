function confirmar(numCD){
    var alert = window.confirm("Tem certeza que deseja Apagar o Cartão de Débito de número "+numCD+ " ?");
    if(alert){
        window.location.href = "http://localhost:3000/deleteCartao?NumCartao="+numCD+"&Type=CD";
    }
  
}
function confirmar(numCC){
    var alert = window.confirm("Tem certeza que deseja Apagar o Cartão de Crédito de número "+numCC+ " ?");
    if(alert){
        window.location.href = "http://localhost:3000/deleteCartao?NumCartao="+numCC+"&Type=CC";
    }

}
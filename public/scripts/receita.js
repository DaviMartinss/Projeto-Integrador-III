function confirmar(receita){
    var alert = window.confirm("Tem certeza que deseja Apagar essa Receita?");
    if(alert){
        window.location.href = "http://localhost:3000/receitaDEL?ReceitaId="+receita.ReceitaId;
    }
}